import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { useTheme } from "~/hooks/useTheme";
import stylesUrl from "~/styles/demos/about.index.css";

export const links = () => [{ rel: "stylesheet", href: stylesUrl }];
export default function AboutIndex() {

  return (
    <div>
      <p>
        You are looking at the index route for the <code>/about</code> URL segment, but there are nested routes as well!
      </p>
      <p>
        <strong>
          <Link to="whoa">Check out one of them here.</Link>
        </strong>
      </p>
      <p>
        <strong>
          <Link to="scss">Check out one that uses scss</Link>
        </strong>
      </p>
    </div>
  );
}
