import { Suspense } from "react";
import { ClientSideDate } from "~/components/ClientSideDate";
import { CodeBlock } from "~/components/CodeBlock";
import type { V2_MetaFunction } from "@remix-run/node";
import { useStreams } from "../../lib/constants";

export const meta: V2_MetaFunction = () => {
  return [{ title: "CSR Fetching with Suspense Demo" }];
};

/**
 *
 *
 * Update to https://remix.run/docs/en/main/guides/migrating-react-router-app#client-only-components
 * for client side render components.
 * @returns
 */
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Client Side Data Fetching with Suspense Demo</h2>
      <p>{useStreams ? "Using Streaming" : "Not using Streaming"}</p>
      <p>
        Renders on the server up to the suspense boundary, and then the ClientSideDate component handles loading the data via a suspense enabled library (SWR).
      </p>
      {/* Add client side only wrapper around this */}
      <Suspense fallback={<h3>Server Side Fallback</h3>}>
        <ClientSideDate text={"Client Side Loaded"} />
      </Suspense>
      <p>
        The difference between this and the SSR with streaming demo is that in this demo, the request is sent from the browser, and in the SSR demo it's sent
        from t he server
      </p>
      <p>This approach suffers from the same drawbacks as the Client Side effect demo, but also has the same advantages</p>

      <CodeBlock>{`import {ClientSideDate} from 'ClientSideDate.client.tsx';

<Suspense fallback={<h3>Server Side Fallback</h3>}>
      {<ClientSideDate />}
</Suspense>

//ClientSideDate.client.tsx
export function ClientSideDate() {
  const value = useAsyncValue();
  const [date, setDate] = useState<string>("initial data");
  const swrDate = useSWR("date", async ()=> await getDate(), {suspense: true, fallbackData: value})
  return (
    <DateFn date={swrDate?.data} />
  )
}`}</CodeBlock>
    </div>
  );
}

//   export const ErrorBoundary = EB.ErrorBoundary;
