import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useTheme, useThemeOnPage } from "~/hooks/useTheme";
import styles from "~/styles/demo.module.css";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};
// export let links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: stylesUrl }];
// };

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs",
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs",
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d",
      },
    ],
    demos: [
      {
        to: "actions",
        name: "Actions",
      },
      {
        to: "posts",
        name: "Posts",
      },
      {
        to: "about",
        name: "Nested Routes, CSS loading/unloading",
      },
      {
        to: "params",
        name: "URL Params and Error Boundaries",
      },
      {
        to: "rendering",
        name: "Different ways of rendering using react 18",
      },
      {
        to: "search-params",
        name: "URL Search Params",
      },
      {
        to: "rust",
        name: "Rust and WASM demo",
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return [{ title: "Remix Starter" }, { description: "Welcome to remix!" }];
};

// https://remix.run/guides/routing#index-routes
/**
 * Without the demo`_` in the child routes, this would render as a layout for a nested route.
 * @constructor
 */
export default function Demo() {
  let data = useLoaderData<IndexData>();
  useThemeOnPage("image")
  return (
    <div className="remix__page">
      <main>
        {/* <h2>Welcome to Remix!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p>
          Feel free to take a look around the code to see how Remix does things, it might be a bit different than what you’re used to. When you're ready to dive
          deeper, we've got plenty of resources to get you up-and-running quickly.
        </p>
        <p>
          Check out all the demos in this starter, and then just delete the <code>app/routes/demos</code> and <code>app/styles/demos</code> folders when you're
          ready to turn this into your next project.
        </p> */}
        <Outlet />
      </main>
      <aside className={styles.demoAside}>
        <h2>Demos In This App</h2>
        <ul>
          {data.demos.map(demo => (
            <li key={demo.to} className="remix__page__resource">
              <Link to={demo.to} prefetch="viewport">
                {demo.name}
              </Link>
            </li>
          ))}
        </ul>
        <h2>Resources</h2>
        <ul>
          {data.resources.map(resource => (
            <li key={resource.url} className="remix__page__resource">
              <a href={resource.url}>{resource.name}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
