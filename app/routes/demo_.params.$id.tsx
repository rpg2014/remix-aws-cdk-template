import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import * as EB from "../components/ErrorBoundary";
import type { V2_MetaArgs } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

// The `$` in route filenames becomes a pattern that's parsed from the URL and
// passed to your loaders so you can look up data.
// - https://remix.run/api/conventions#loader-params

export let loader: LoaderFunction = async ({ params }) => {
  // pretend like we're using params.id to look something up in the db

  if (params.id === "this-record-does-not-exist") {
    // If the record doesn't exist we can't render the route normally, so
    // instead we throw a 404 reponse to stop running code here and show the
    // user the catch boundary.
    throw new Response("Not Found", { status: 404 });
  }

  // now pretend like the record exists but the user just isn't authorized to
  // see it.
  if (params.id === "shh-its-a-secret") {
    // Again, we can't render the component if the user isn't authorized. You
    // can even put data in the response that might help the user rectify the
    // issue! Like emailing the webmaster for access to the page. (Oh, right,
    // `json` is just a Response helper that makes it easier to send JSON
    // responses).
    throw json({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }

  // Sometimes your code just blows up and you never anticipated it. Remix will
  // automatically catch it and send the UI to the error boundary.
  if (params.id === "kaboom") {
    //@ts-ignore
    // lol();
    throw new Error("wtf");
  }

  // but otherwise the record was found, user has access, so we can do whatever
  // else we needed to in the loader and return the data. (This is boring, we're
  // just gonna return the params.id).
  return { param: params.id };
};

export default function ParamDemo() {
  let data = useLoaderData();
  return (
    <h1>
      The param is <i style={{ color: "red" }}>{data.param}</i>
    </h1>
  );
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found

// https://remix.run/api/conventions#errorboundar
// https://remix.run/api/guides/not-found
export const ErrorBoundary = EB.ErrorBoundary;

export let meta: V2_MetaFunction = ({ data }: V2_MetaArgs) => {
  return [
    {
      title: data ? `Param: ${data.param}` : "Oops...",
    },
  ];
};
