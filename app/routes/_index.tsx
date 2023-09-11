import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { Form, Link, Links, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className={"remix__page"} style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <main>
        <h1>Remix App CDK demo template</h1>
      </main>
      <aside>
        <h1>Welcome to Remix</h1>
        <ul>
          <li>
            <Link prefetch={'intent'} to="/demo">demo page</Link>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
              Deep Dive Jokes App Tutorial
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
