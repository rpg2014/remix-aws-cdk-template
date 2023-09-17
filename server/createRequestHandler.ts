import { URL } from "url";
import { createRequestHandler as createRemixRequestHandler } from "@remix-run/node";

import type { CloudFrontRequestEvent, CloudFrontRequestHandler, CloudFrontHeaders } from "aws-lambda";
import type { AppLoadContext, ServerBuild } from "@remix-run/server-runtime";

export interface GetLoadContextFunction {
  (event: CloudFrontRequestEvent): AppLoadContext;
}

export type RequestHandler = ReturnType<typeof createRequestHandler>;

/**
 * TODO: Update to use NodeJS streams?
 * @param build
 * @param getLoadContext
 * @param mode
 */
export function createRequestHandler({
  build,
  getLoadContext,
  mode = process.env.NODE_ENV,
}: {
  build: ServerBuild;
  getLoadContext?: GetLoadContextFunction;
  mode?: string;
}): CloudFrontRequestHandler {
  //This gets the server handler from the build files
  let handleRequest = createRemixRequestHandler(build, mode);

  // Return a handler function that wraps the remix created handlers, converting the requests and responses from the
  // ones the env (Lambda@edge) expects, to what Remix expects.  Currently just supports These CloudfrontRequests,
  //TODO: add streaming support
  return (async (event, context) => {
    let request = createRemixRequest(event);

    let loadContext = typeof getLoadContext === "function" ? getLoadContext(event) : undefined;

    let response = (await handleRequest(request as unknown as Request, loadContext)) as unknown as Response;

    return {
      status: String(response.status),
      headers: createCloudFrontHeaders(response.headers),
      bodyEncoding: "text",
      body: await response.text(),
    };
  }) as CloudFrontRequestHandler;
}

/**
 * Converts NodeHeaders to Cloudfront Headers
 * @param responseHeaders
 */
export function createCloudFrontHeaders(responseHeaders: Headers): CloudFrontHeaders {
  let headers: CloudFrontHeaders = {};

  for (const [key, value] of responseHeaders) {
    const values = value.split(", ");
    for (const v of values) {
      headers[key] = [...(headers[key] || []), { key, value: v }];
    }
  }

  return headers;
}

export function createRemixHeaders(requestHeaders: CloudFrontHeaders): Headers {
  let headers = new Headers();

  for (let [key, values] of Object.entries(requestHeaders)) {
    for (let { value } of values) {
      if (value) {
        headers.append(key, value);
      }
    }
  }

  return headers;
}

/**
 * Converts the Cloudfront Request into a NodeRequest for Remix.
 * @param event
 */
export function createRemixRequest(event: CloudFrontRequestEvent): Request {
  let request = event.Records[0].cf.request;

  let host = request.headers["host"] ? request.headers["host"][0].value : undefined;
  let search = request.querystring.length ? `?${request.querystring}` : "";
  let url = new URL(request.uri + search, `https://${host}`);

  return new Request(url.toString(), {
    method: request.method,
    headers: createRemixHeaders(request.headers),
    body: request.body?.data ? (request.body.encoding === "base64" ? Buffer.from(request.body.data, "base64").toString() : request.body.data) : undefined,
  });
}
