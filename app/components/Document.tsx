import React from "react";
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import { useTheme } from "~/hooks/useTheme";

/**
 * Contains the Various document metadata that you want on every page, Should probably add other manifest meta tags
 * @param children
 * @param title
 * @constructor
 */
export function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  const {theme,setTheme} = useTheme();
  React.useEffect(() => {
    if(!theme){
      setTheme("dark");
    }
  },[])
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body data-theme={theme}>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
