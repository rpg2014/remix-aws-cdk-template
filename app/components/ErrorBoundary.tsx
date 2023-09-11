import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import * as React from "react";

export const ErrorBoundary = () => {
  const error = useRouteError();
  //Http error branch
  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
        break;
      case 404:
        message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
        break;
      case 500:
        message = <p>Something went wrong, status: {error.status}</p>;
        break;
      default:
        throw new Error(error.data || error.statusText);
    }

    return (
      <>
        <h1>
          {error.status}: {error.statusText}
        </h1>
        {message}
      </>
    );
  }
  //JS error branch
  console.error(error);
  return (
    <div>
      <h1>There was an error</h1>
      <p>{error.message}</p>
      <hr />
      <p>Hey, developer, you should replace this with what you want your users to see.</p>
    </div>
  );
};
