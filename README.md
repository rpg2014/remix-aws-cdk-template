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
