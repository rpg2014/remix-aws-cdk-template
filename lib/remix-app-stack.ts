import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, CacheControl, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";
import type { StackProps } from "aws-cdk-lib";
import { Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { LogLevel, NodejsFunction, OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { HttpOrigin, S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  AllowedMethods,
  CachePolicy,
  Distribution,
  HttpVersion,
  LambdaEdgeEventType,
  OriginAccessIdentity,
  OriginRequestCookieBehavior,
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior,
  PriceClass,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import type { FunctionUrl } from "aws-cdk-lib/aws-lambda";
import { FunctionUrlAuthType, InvokeMode, Runtime } from "aws-cdk-lib/aws-lambda";
import path from "path";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { AaaaRecord, ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

type RemixAppStackProps = {
  env?: any;
  computeType?: "EdgeFunction"; //| "HTTPStreaming",
  certificateArn: string;
  domainName: string;
  subDomain: string;
  hostedZoneId: string;
};
export class RemixAppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps & RemixAppStackProps) {
    super(scope, id, props);

    //Was attempting to support http streams, but AWS only supports them as lambda function URL's
    // which you cannot put behind a CDN or route 53, so it doesn't work currently. (you'll just need to fix the distribution)
    const isStreamingFunction = props.computeType !== "EdgeFunction";

    //
    const assetsBucket = new Bucket(this, "AssetsBucket", {
      autoDeleteObjects: true,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const assetsBucketOriginAccessIdentity = new OriginAccessIdentity(this, "AssetsBucketOriginAccessIdentity");

    const assetsBucketS3Origin = new S3Origin(assetsBucket, {
      originAccessIdentity: assetsBucketOriginAccessIdentity,
    });

    assetsBucket.grantRead(assetsBucketOriginAccessIdentity);

    const fn = new NodejsFunction(this, "RemixServerFn", {
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
      entry: "./server/index.ts",
      handler: isStreamingFunction ? "streamingHandler" : "nonStreamingHandler",
      logRetention: RetentionDays.THREE_DAYS,
      memorySize: 256,
      timeout: Duration.seconds(10),
      runtime: Runtime.NODEJS_18_X,

      bundling: {
        esbuildArgs: {
          "--tree-shaking": true,
        },
        format: OutputFormat.CJS,
        logLevel: LogLevel.INFO,
        minify: true,
        tsconfig: path.join(__dirname, "../tsconfig.json"),
        commandHooks: {
          afterBundling(inputDir, outputDir) {
            return [
              //moving dependencies from the input to the output
              `cp ${inputDir}/rust-functions/pkg/rust-functions_bg.wasm ${outputDir}`,
              `cp ${inputDir}/build/server/*.map ${outputDir}`,
              `cp ${inputDir}/build/server/*.json ${outputDir}`,
            ];
          },
          beforeBundling: (inputDir: string, outputDir: string): string[] => [],
          beforeInstall: (inputDir: string, outputDir: string): string[] => [],
        },
      },
    });

    // The only way to interact with http streams is lambda function urls, which you cannot put behind a CDN, and route 53,
    // so i'm not going to bother right now.
    let url: FunctionUrl | null = null;
    if (isStreamingFunction) {
      url = fn.addFunctionUrl({
        invokeMode: InvokeMode.RESPONSE_STREAM,
        authType: FunctionUrlAuthType.NONE,
      });
    }

    const distribution = new Distribution(this, id + "Distribution", {
      certificate: Certificate.fromCertificateArn(this, "certArn", props.certificateArn),
      enableLogging: false,
      domainNames: [`${props.subDomain}.${props.domainName}`],
      httpVersion: HttpVersion.HTTP2_AND_3,
      priceClass: PriceClass.PRICE_CLASS_100,
      // Default behavior, all requests get handled by edge function, with the fall through origin as s3.
      defaultBehavior: {
        allowedMethods: AllowedMethods.ALLOW_ALL,
        cachePolicy: CachePolicy.CACHING_DISABLED,
        compress: true,
        edgeLambdas: !isStreamingFunction
          ? [
              {
                eventType: LambdaEdgeEventType.ORIGIN_REQUEST,
                functionVersion: fn.currentVersion,
                includeBody: true,
              },
            ]
          : undefined,

        origin:
          isStreamingFunction && url
            ? new HttpOrigin(url.url.replace("https://", ""), {
                originId: "StreamingFnOriginId",
              })
            : assetsBucketS3Origin,
        originRequestPolicy: new OriginRequestPolicy(this, "OriginRequestPolicy", {
          headerBehavior: OriginRequestHeaderBehavior.all(),
          queryStringBehavior: OriginRequestQueryStringBehavior.all(),
          cookieBehavior: OriginRequestCookieBehavior.all(),
        }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      // Static assets are retrieved from the /assets path.
      additionalBehaviors: {
        "assets/*": {
          allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
          cachePolicy: CachePolicy.CACHING_OPTIMIZED,
          compress: true,
          origin: assetsBucketS3Origin,
          viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
      },
    });

    // Deploy the local code to S3
    new BucketDeployment(this, id + "AssetsDeployment", {
      destinationBucket: assetsBucket,
      distribution,
      prune: true,
      sources: [Source.asset("build/public")],
      cacheControl: [CacheControl.maxAge(Duration.days(365)), CacheControl.sMaxAge(Duration.days(365))],
    });

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, "MainHostedZone", {
      zoneName: props.domainName,
      hostedZoneId: props.hostedZoneId,
    });
    new ARecord(this, id + "ARecord", {
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      recordName: `${props.subDomain}.${props.domainName}`,
      // if the deploy fails b/c the record already exists, uncomment the below line
      // deleteExisting: true,
    });
    new AaaaRecord(this, id + "AAAARecord", {
      recordName: `${props.subDomain}.${props.domainName}`,
      zone: hostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      // if the deploy fails b/c the record already exists, uncomment the below line
      // deleteExisting: true,
    });
  }
}
