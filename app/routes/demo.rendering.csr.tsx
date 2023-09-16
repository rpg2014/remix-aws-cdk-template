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
      <h2>Client Side Fetching Demo</h2>
      <p>This page's data is fetched on the client side. The server returns html and JS that hydrates the component and runs the effects that fetch the data</p>
      <DateFn text={"Client side loaded"} date={date} />
      <p>The data is fetched via standard React data fetching, using useEffect hooks to call async functions to fetch the data</p>

      <CodeBlock>{`const Component = () => {
    const [state, setState] = useState({ results: undefined });
    useEffect(() => setState(await fetchData()), []);
    return <Component data={state.results}/>
}`}</CodeBlock>
    </div>
  );
}
