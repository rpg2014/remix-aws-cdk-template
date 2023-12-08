import * as React from "react";

import type { LinksFunction } from "@remix-run/node";

import  "~/styles/global.css";
import "~/styles/dark.css";

import favicon from "~/images/favicon.ico";
import * as EB from "~/components/ErrorBoundary";
import { Layout} from "~/components/Layout";
import { Document } from "~/components/Document";
import { Outlet } from "@remix-run/react";

export let links: LinksFunction = () => {
  return [
    { rel: "icon", href: favicon },
    // { rel: "stylesheet", href: globalStylesUrl },
    // {
    //   rel: "stylesheet",
    //   href: darkStylesUrl,
    //   media: "(prefers-color-scheme: dark)",
    // },
    
  ];
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 *
 * TODO: on initial load, check for any existing auth (SSO, or cookie) and set up session / cookie.
 * https://remix.run/docs/en/main/utils/sessions#createsession
 * if not logged in, redirect to auth flow.
 */
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

/**
 * Error component, will want to extract the logic from this to a external component, as every component / route should
 * export its own error boundary, but we can have a single component that we can reuse.
 * @constructor
 */
export const ErrorBoundary = () => (
  <Document>
    <Layout>
      <EB.ErrorBoundary />
    </Layout>
  </Document>
);
