import { Link } from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import stylesUrl from "~/styles/demos/whoa.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};
export default function AboutWhoa() {
  return (
    <div>
      <p>
        Whoa, this is a nested route! We render the <code>/about</code> layout route component, and its <code>Outlet</code> renders our route component. 🤯
      </p>
      <p>
        <strong>
          <Link to="/demo/about">
            Go back to the <code>/about</code> index.
          </Link>
        </strong>
      </p>
    </div>
  );
}
