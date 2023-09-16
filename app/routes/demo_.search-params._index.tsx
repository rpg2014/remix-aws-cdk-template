import { Form, Link, useFetcher, useLoaderData, useNavigation, useSearchParams, useSubmit } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { useEffect } from "react";
import * as EB from "~/components/ErrorBoundary";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("q") === "400") {
    throw new Response("Bad Request", { status: 400 });
  }
  return { q: url.searchParams.has("q") ? `Received query param: ${url.searchParams.get("q")} on the backend` : "No query param in request" };
};
export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { q } = useLoaderData();
  const nav = useNavigation();

  const searching = nav.location && new URLSearchParams(nav.location.search).has("q");
  let searchParamsEntries = [];
  for (const [key, value] of searchParams.entries()) {
    searchParamsEntries.push(
      <p>
        {key} : {value}
      </p>,
    );
  }
  return (
    <>
      <div>
        <h2>Query Params and Search Forms demo</h2>
        <QueryParamForm />
        <p>Query Params :</p>
        {searchParamsEntries}
        {searching ? (
          <p>Loading backend</p>
        ) : (
          <>
            <p>Backend data from navigation</p>
            <p>{q}</p>
          </>
        )}
      </div>
    </>
  );
}

// In this form, the fetcher is could be used for an autocomplete api, and the navigation / submit would be for the actual searches
const QueryParamForm = () => {
  const [searchParams] = useSearchParams();
  const nav = useNavigation();
  const submit = useSubmit();
  const fetcher = useFetcher();

  // empty value when q is empty\
  const q = searchParams.get("q")
  useEffect(() => {
    if (q !== null && q !== undefined && q !== "") {
      // document.getElementById("q").value = searchParams.get("q");
    } else {
      //@ts-ignore
      document.getElementById("q").value = "";
    }
  }, [searchParams ,]);

  const searching = nav.location && new URLSearchParams(nav.location.search).has("q");
  const fetcherSearching = fetcher.state === "submitting" || fetcher.state === "loading";

  return (
    <Form method="GET" onSubmit={e => submit(e.currentTarget)} action="">
      <label>Custom Query Param</label>
      <div>
        <input
          id="q"
          type="text"
          name="q"
          placeholder={searchParams.get("q") || "Enter query param"}
          onChange={e =>
            fetcher.submit(
              e.currentTarget.form,
              {
                method: "GET",
                replace: !(searchParams.get("q") === null),
              } /* This replace isn't technically needed as this submit doesn't navigate, but if it did, this is needed */,
            )
          }
        />
        <p>From Non Navigation Search: </p>
        <p>{fetcherSearching ? "Loading..." : fetcher.data?.q}</p>
      </div>
      {}
    </Form>
  );
};

export const ErrorBoundary = EB.ErrorBoundary;
