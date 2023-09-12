# Remix CDK Template

A Remix project template with AWS CDK for easy deployment.

- [See this template in action](https://remix-template.parkergiven.com)
- [Remix Docs](https://remix.run/docs)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following tools installed

- [Node.js](https://github.com/nvm-sh/nvm)
- [Yarn package manager](https://yarnpkg.com/getting-started/install)
- AWS CDK installed (you can install it globally with `npm install -g aws-cdk`)

### Installation

1. Clone this repository:

   ```sh
   yarn create remix --template rpg2014/remix-aws-cdk-template
   ```

2. Install project dependencies using Yarn:

   ```sh
   yarn install
   ```

### Development

Start the Remix development server with the following command:

```sh
yarn dev
```

This will run your Remix app in development mode and automatically reload when you make changes to the code.

### Deployment

To deploy your Remix app using AWS CDK, follow these steps:

1. Configure your AWS credentials if you haven't already:

   ```sh
   aws configure --profile personal
   ```

2. Deploy the CDK stack:

   ```sh
   yarn deploy
   ```

This will deploy your Remix app to AWS using the AWS CDK.

## Other Yarn Commands

- **Build**: Build your Remix app for production:

  ```sh
  yarn release
  ```

- **Lint**: Run lint checks for your code:

  ```sh
  yarn lint
  ```

- **Test**: Run tests for your Remix app:

  ```sh
  yarn test
  ```

- **Clean**: Remove build artifacts and node modules:

  ```sh
  yarn clean
  ```

## Contributing

Feel free to contribute to this project. Create a pull request or open an issue if you find any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## TODO:

#### Add generic JWT auth using remix auth.

Will look for a cookie on main domain on intial load,
and redirect to auth site if not present.  
auth site will login user, and set cookie for main domain

if cookie present, will validate with well-known file and then create session.
https://github.com/sergiodxa/remix-auth

#### Add support for node js Stream responses + react 18's renderToPipeableStream.

To do this I'll have to change the compute type, as lambda only supports http streaming via function urls, which you can't put behind a cdn, and i dont want to have to figure out how to dynamically map to the function url.

So instead i'll cook up some support via ECS, and hopfully be able to scale down to 0 or something.

- Use an express server to serve the routes, or just remix serve. express would give me more options to configure.
- can use [this](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ecs_patterns.ApplicationLoadBalancedFargateService.html) for the container service.
- Can plug the load balancer directly into the cloudfront distribution instead of the s3 + edge functions.

```typescript
// Create a VPC
const vpc = new ec2.Vpc(this, "FargateVPC", {
  maxAzs: 2, // Specify the number of Availability Zones
});

// Create a Fargate cluster
const cluster = new ecs.Cluster(this, "FargateCluster", {
  vpc,
});

// Create a Fargate service using the ECS patterns module
const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "FargateService", {
  cluster,
  taskImageOptions: {
    image: ecs.ContainerImage.fromRegistry("nginx"), // Replace with your Docker image
  },
});

// Create an Amazon CloudFront distribution
const cloudFrontDistribution = new cloudfront.CloudFrontWebDistribution(this, "CloudFrontDistribution", {
  originConfigs: [
    {
      customOriginSource: {
        domainName: fargateService.loadBalancer.loadBalancerDnsName,
        originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
      },
      behaviors: [{ isDefaultBehavior: true }],
    },
  ],
});
```
