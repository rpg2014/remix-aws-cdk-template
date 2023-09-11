#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RemixAppStack } from "../lib/remix-app-stack";

const app = new cdk.App();
new RemixAppStack(app, "RemixStack", {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  env: { region: "us-east-1" },
  certificateArn: "arn:aws:acm:us-east-1:593242635608:certificate/e4ad77f4-1e1b-49e4-9afb-ac94e35bc378",
  domainName: "parkergiven.com",
  subDomain: "remix-template",
  computeType: "EdgeFunction",
  hostedZoneId: "ZSXXJQ44AUHG2",
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
