import { useEffect, useState } from "react";
import { DateFn, getDate } from "./demo.rendering";
import { CodeBlock } from "~/components/CodeBlock";

//Notice the lack of a loader function! That makes it all client side rendered?
export default function Index() {
  const [date, setDate] = useState("Initial state");
  useEffect(() => {
    setDate("Fetching on the Client");

    getDate().then(date => setDate(date));
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h2>Client Side Rendered Demo</h2>
      <p>This page is loaded asynchronously. The server returns a js bundle that fetches the data on the client side once it's hydrated</p>

      <DateFn date={date} />
      <p>This is done via standard React data fetching, using useEffect hooks to fetch the data:</p>
      <CodeBlock>{`const Component = () => {
    const [state, setState] = useState({ results: undefined });
    useEffect(() => setState(await fetchData()), []);
    return <Component data={state.results}/>
}`}</CodeBlock>
    </div>
  );
}
