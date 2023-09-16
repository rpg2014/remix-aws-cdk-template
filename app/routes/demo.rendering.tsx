import { NavLink, Outlet, useNavigation, useOutletContext } from "@remix-run/react";
import { Suspense, useState } from "react";

import styles from "~/styles/demos/rendering.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const getDate = async () => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(1000);

  return new Date().toUTCString();
};
export const DateFn = ({ date, text }: { date: string; text: string }) => {
  return (
    <>
      <h4 style={{ marginBottom: "0", paddingBottom: "0" }}>The date is: {date} </h4>
      <p style={{ marginTop: "0" }}>{text}</p>
    </>
  );
};

export type RenderingDemoContext = { useCache: boolean };

export const useCacheValue = () => {
  return useOutletContext<RenderingDemoContext>();
};

export default function RenderingLayout() {
  const [useCache, setUseCache] = useState(false);
  const nav = useNavigation();
  return (
    <>
      <div className="renderingNav">
        <h1>Data Fetching + React 18 Streaming Demos</h1>
        {/* TODO: put divider */}
        <nav className="renderingTabs">
          <NavLink prefetch="intent" className="renderingTab" to="ssr">
            Server-side
          </NavLink>
          <NavLink prefetch="intent" className="renderingTab" to="csr">
            Client-side Effect
          </NavLink>
          <NavLink prefetch="intent" className={"renderingTab "} to={"ssr-with-cs-fetch"}>
            Client with Suspense
          </NavLink>
        </nav>
        <div className="optionsContainer">
          <p style={{ marginBottom: "0" }}>Page State: {nav.state}</p>
          <div>
            <label htmlFor="useCache">Use SWR Cache</label>
            <input type="checkbox" checked={useCache} onChange={e => setUseCache(e.target.checked)}></input>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet context={{ useCache }} />
      </Suspense>
    </>
  );
}
