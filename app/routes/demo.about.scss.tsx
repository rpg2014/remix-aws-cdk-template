import { Link } from "@remix-run/react";
import { useThemeOnPage } from "~/hooks/useTheme";
import stylesUrl from "~/styles/demos/about.scss.css";

export const links = () => [{ rel: "stylesheet", href: stylesUrl }];
export const meta = () => [{ title: "SCSS" }];
export default function AboutIndex() {

  return (
    <div>
      <p className="scss-box">
        You are looking at the SCSS route for the <code>/about</code> URL segment. This route uses scss for it's styles!
      </p>
      <p>
        <strong>
          <Link to="../whoa">Check out one of them here.</Link>
        </strong>
      </p>
      <p>
        <strong>
          <Link to="..">Back to the index!</Link>
        </strong>
      </p>
    </div>
  );
}
