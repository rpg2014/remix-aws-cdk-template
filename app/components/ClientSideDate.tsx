import { useAsyncValue } from "@remix-run/react";
import { useState } from "react";
import useSWR from "swr";
import { DateFn, getDate, useCacheValue } from "~/routes/demo.rendering";

export function ClientSideDate({ text }) {
  const value = useAsyncValue();
  const { useCache } = useCacheValue();
  const [state] = useState(Date.now());
  const swrDate = useSWR(
    "date" + (useCache ? "" : state),
    async () => {
      console.log("Fetching from client");
      await fetch("google.com");
      return await getDate();
    },
    { suspense: true, fallbackData: value ? ((value + "ServerLoaded") as string) : "No Server Value" },
  );

  return <DateFn text={text} date={swrDate?.data} />;
}
