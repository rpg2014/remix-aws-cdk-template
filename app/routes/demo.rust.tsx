import { Link, Outlet } from "@remix-run/react";
import * as EB from "~/components/ErrorBoundary";
import stylesUrl from "~/styles/demos/rust.css";
export const links = () => [{ rel: "stylesheet", href: stylesUrl }];
export const meta = () => [{ title: "Rust and WASM Demo" }, { name: "description", content: "Rust and WASM Demo" }];

export default function Index() {
  return (
    <div className="">
      <h2>Rust and WASM Demo</h2>
      <p>
        This is a demo of Rust and WASM using Remix. The first demo is server side in the action function, and the second is client side rust with lazy loaded
        components
      </p>
      <p>
        <strong>
          <Link to="server">Click here for the server side demo</Link>
        </strong>
      </p>
      <p>
        <strong>
          <Link to="client">Click here for the client side demo</Link>
        </strong>
      </p>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="">
      <h2>Rust and WASM Demo</h2>
      <p>
        This is a demo of Rust and WASM using Remix. The first demo is server side in the action function, and the second is client side rust with lazy loaded
        components
      </p>
      <p>
        <strong>
          <Link to="server">Click here for the server side demo</Link>
        </strong>
      </p>
      <p>
        <strong>
          <Link to="client">Click here for the client side demo</Link>
        </strong>
      </p>
      <EB.ErrorBoundary />
    </div>
  );
}
