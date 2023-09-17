import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export let meta: MetaFunction = () => {
  return [{ title: "About Remix (and CSS)" }];
};

export default function Index() {
  return (
    <div className="about">
      <div className="about__intro">
        <h2>About Us</h2>
        <p>
          Ok, so this page isn't really <em>about us</em>, but we did want to show you a few more things Remix can do.
        </p>
        <p>
          Did you notice that things look a little different on this page? The CSS that we import in the route file and include in its <code>links</code> export
          is only included on this route and its children.
        </p>
        <p>
          Wait a sec...<em>its children</em>? To understand what we mean by this,{" "}
          <a href="https://remix.run/tutorial/4-nested-routes-params">read all about nested routes in the docs</a>.
        </p>
        <p>
          <Link to={"/demo"}>Back to the Demos</Link>
        </p>
        <hr />
        <Outlet />
      </div>
    </div>
  );
}
