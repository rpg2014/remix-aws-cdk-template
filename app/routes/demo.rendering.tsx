import { NavLink, Outlet, useNavigation } from "@remix-run/react";
import { Suspense } from "react";
import styles from "~/styles/demos/rendering.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const getDate = async () => {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(3000);

  return new Date().toUTCString();
};
export const DateFn = ({ date }: { date: string }) => {
  return <h3>The date is: {date}</h3>;
};

export default function RenderingLayout() {
  const nav = useNavigation();
  return (
    <>
      <div className="renderingNav">
        <h1>Rendering Demos</h1>
        <nav className="renderingTabs">
          <NavLink className="renderingTab" to="ssr">
            SSR
          </NavLink>
          <NavLink className="renderingTab" to="csr">
            CSR
          </NavLink>
          <NavLink className={"renderingTab bad"} to={"ssr-with-csr"}>
            SSR with CSR
          </NavLink>
        </nav>
        <p style={{ marginBottom: "0" }}>Page State: {nav.state}</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
