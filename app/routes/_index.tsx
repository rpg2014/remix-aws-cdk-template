import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/index.css";
import { CodeBlock } from "~/components/CodeBlock";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
      <div className={"remix__page indexContainer"} style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <main className={"indexMain"}>
          <h1>Remix CDK template</h1>
          <p>
            Turbocharge your web app with the CDK Remix Project Template. Experience lightning-fast server-side rendering using{" "}
            <a href={"https://aws.amazon.com/lambda/edge/"}>Lambda@Edge</a>, with the developer experience of <a href={"https://remix.run"}>Remix</a>
          </p>
          <ul>
            <li>🚀 Instant Rendering: Say goodbye to slow loading times and hello to lightning-fast edge rendering.</li>
            <li>🛠️ Pure CDK Flexibility: Customize and scale your infrastructure entirely with the AWS CDK—no third-party libraries required.</li>
            <li>📈 Scalable and Cost-Efficient: Embrace the power of serverless computing for unmatched scalability and cost efficiency.</li>
            <li>🌐 Easy Deployment: Simplify deployment to AWS for a hassle-free experience.</li>
          </ul>
          <h2>Template usage:</h2>
          <ol>
            <li>
              Use this template by running
              <CodeBlock>yarn create remix --template rpg2014/remix-aws-cdk-template</CodeBlock>
            </li>
            <li>
              Set up a "personal" profile in the <a href={"https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html"}>AWS CLI config</a>
              <CodeBlock>aws configure --profile personal</CodeBlock>
            </li>
            <li>
              Run <CodeBlock inline>yarn deploy</CodeBlock>
            </li>
          </ol>
        </main>
        {/*<aside style={{ height: "auto" }}>*/}
        {/*  <h1>Welcome to Remix</h1>*/}
        {/*  <ul>*/}
        {/*    <li>*/}
        {/*      <Link prefetch={"intent"} to="/demo">*/}
        {/*        Remix Demos*/}
        {/*      </Link>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a target="_blank" href="https://github.com/rpg2014" rel="noreferrer">*/}
        {/*        My Github*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <a target="_blank" href="https://remix.run/docs" rel="noreferrer">*/}
        {/*        Remix Docs*/}
        {/*      </a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</aside>*/}
      </div>
  );
}
