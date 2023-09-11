import type { V2_MetaFunction, LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/index.css";
import { CodeBlock } from "~/components/CodeBlock";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div className={"remix__page"} style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <main>
        <h1>Remix App CDK demo template</h1>
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
      <aside style={{ height: "auto" }}>
        <h1>Welcome to Remix</h1>
        <ul>
          <li>
            <Link prefetch={"intent"} to="/demo">
              Remix Demos
            </Link>
          </li>
          <li>
            <a target="_blank" href="https://github.com/rpg2014" rel="noreferrer">
              My Github
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
}
