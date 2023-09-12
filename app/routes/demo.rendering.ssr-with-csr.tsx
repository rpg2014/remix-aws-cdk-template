import { useLoaderData } from "@remix-run/react";
import { defer } from "@remix-run/server-runtime";
import { useEffect, useState } from "react";

import { DateFn, getDate } from "./demo.rendering";
import { useStreams } from "./demo.rendering.ssr";

export async function loader() {
  return defer({
    date: getDate(),
  });
}

/**
 * This currently doens't work.
 * @returns
 */
export default function Index() {
  const data = useLoaderData<typeof loader>();

  const [ld, setLd] = useState<string>("Initial component state ");

  useEffect(() => {
    setLd("Resolving promise from loader data");
    const resolveDate = async () => {
      //throw if not on the client
      if (typeof window === "undefined") {
        throw Error("Chat should only render on the client.");
      }
      setLd(await data.date);
    };
    resolveDate();
  }, [data.date]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Defer Without streaming demo</h2>
      <p>{useStreams ? "Using Streaming" : "Not using Streaming"}</p>
      <p>Renders on the server, then awaits the returned promise on the client side. Throws an error when rendered on the server side without streaming</p>
      <DateFn date={ld} />
      <p>This only seems to work when we do a client side navigation to the page, it throws an error when rendered on the server, without using streams</p>
      <p>With streaming on, this works just like the suspense / await code, and is probably simlar to what the useAsyncValue hook does</p>
      <p style={{ color: "red", backgroundColor: "rgb(62, 30, 30)", borderRadius: "5px", padding: "15px" }}>
        This seems to be a bad pattern, and I wouldn't use it. Either go full CSR, or find a compute platform that supports streaming (ie, not Lambda)
      </p>
    </div>
  );
}

//   export const ErrorBoundary = EB.ErrorBoundary;
