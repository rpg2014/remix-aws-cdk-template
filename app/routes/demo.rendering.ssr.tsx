import { defer, json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/react";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import * as EB from "~/components/ErrorBoundary";
import { DateFn, getDate } from "./demo.rendering";
import { CodeBlock } from "~/components/CodeBlock";
import { ClientSideDate } from "~/components/ClientSideDate";
import { useStreams } from "../../lib/constants";

//This variable controls using HTTP streaming, using React 18's new streaming apis.
// This is not supported on all hosting platforms, mainly Lambda, but works on most bare metal hosting servers
//TODO: get from env var.

export const meta: MetaFunction = () => {
  return [{ title: "Server Side Rendering Streaming demo" }];
};

export async function loader() {
  if (useStreams) {
    return defer(
      {
        f: fetch("https://google.com"),
        date: getDate(),
      },
      { status: 200, headers: { "cache-control": "max-age=29, stale-while-revalidate=119" } },
    );
  } else {
    return json(
      {
        f: await fetch("https://google.com"),
        date: await getDate(),
      },
      {
        status: 200,
        headers: { "cache-control": "max-age=29, stale-while-revalidate=119" },
      },
    );
  }
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Server Side Rendered and React 18 Streaming Demo</h2>

      <p>{useStreams ? "Using Streaming" : "Not using Streaming"}</p>
      {useStreams ? (
        <p>
          This page is loaded asynchronously. The loading request is kicked off, and the component is rendered up to the suspense and then streamed to the
          client. Once the defered promise is resolved, the results are streamed to the server.
        </p>
      ) : (
        <p>The page is loaded synchronously on the server. The loader promise is resolved before any HTML is returned.</p>
      )}

      {useStreams ? (
        <>
          <Suspense fallback={<h3>Waiting for deferred data...</h3>}>
            <Await resolve={data.date}>{date => <DateFn text="Server Loaded" date={date} />}</Await>
          </Suspense>
          <Suspense fallback={<h3>ServerFallback for ClientSideDate</h3>}>
            <Await resolve={data.date}>
              <ClientSideDate text={"Primed Server side, then refreshed on the client"} />
            </Await>
          </Suspense>
        </>
      ) : (
        <>
          <DateFn text={"Fully loaded on the server"} date={data.date} />
          <Suspense fallback={<h3>ServerFallback for ClientSideDate</h3>}>
            <Await resolve={data.date}>
              <ClientSideDate text={"Primed Server side, then refreshed on the client"} />
            </Await>
          </Suspense>
        </>
      )}
      <p>This uses the loader syntax from remix, with the useLoaderData hook {useStreams ? "and Suspense + Await" : ""}</p>
      <CodeBlock>{`export async function loader() {
  return defer({
    results: ${!useStreams ? "await " : ""}getDataFromSomewhere(),
  });
};
  // Within the component
  const data = useLoaderData();
  ${
    useStreams
      ? `
  // Use an Await component or useAsyncValue hook to resolve the promise from the loader
  <Suspense fallback={<p>Loading Deferred Data...</p>}>
    <Await resolve={data.results}>{results => <Component data={results}/>}</Await>
  </Suspense>`
      : "<Component data={data.results}/>"
  }`}</CodeBlock>
    </div>
  );
}

export const ErrorBoundary = EB.ErrorBoundary;
