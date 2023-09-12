import { defer } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import * as EB from "~/components/ErrorBoundary";
import { DateFn, getDate } from "./demo.rendering";
import { CodeBlock } from "~/components/CodeBlock";

//This variable controls using HTTP streaming, using React 18's new streaming apis.
// This is not supported on all hosting platforms, mainly Lambda, but works on most bare metal hosting servers
//TODO: get from env var.
export const useStreams = false;

export const meta: V2_MetaFunction = () => {
  return [{ title: "Server Side Rendering Streaming demo" }];
};

export async function loader() {
  if (useStreams) {
    return defer({
      date: getDate(),
    });
  } else {
    return defer({
      date: await getDate(),
    });
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
          This page is loaded asynchronously. The data below will be populated once the defered promise is resolved, and will then be streamed from the server{" "}
        </p>
      ) : (
        <p>The page is loaded synchronously on the server. The loader promise is resolved before any HTML is returned.</p>
      )}

      {useStreams ? (
        <Suspense fallback={<h3>Loading Deferred Data...</h3>}>
          <Await resolve={data.date}>{date => <DateFn date={date} />}</Await>
        </Suspense>
      ) : (
        <DateFn date={data.date} />
      )}
      <p>This uses the loader syntax from remix, with the useLoaderData hook {useStreams ? "and Suspense + Await" : ""}</p>
      <CodeBlock>{`export async function loader() {
  return defer | json | redirect({
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
