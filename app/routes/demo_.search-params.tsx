import {  Link, Outlet} from "@remix-run/react";

import * as EB from "~/components/ErrorBoundary";

export default function Index() {
  return (
    <div className="remix__page">
      <main>
        
        <Outlet />
      </main>
      <aside>
        <Link to="/demo">
          <h3>Back To demos</h3>
        </Link>
        <h2>Click these Links</h2>
        <ul>
          <li>
            <Link to=".">Start over</Link>
          </li>
          <li>
            <Link to="?q=one">
              Param: <i>one</i>
            </Link>
          </li>
          <li>
            <Link to="?q=two">
              Param: <i>two</i>
            </Link>
          </li>
          <li>
            <Link to="?q=Something else">Something else</Link>
          </li>
          <li>
            <Link to="shh-its-a-secret">And this will be 404</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export const ErrorBoundary = () => {
  return (
    <div className="remix__page">
      <main>
        <EB.ErrorBoundary />
      </main>
      <aside>
        <Link to="/demo">
          <h3>Back To demos</h3>
        </Link>
        <h2>Click these Links</h2>
        <ul>
          <li>
            <Link to=".">Start over</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};
