import { installGlobals } from "@remix-run/node";
import { createRequestHandler } from "./createRequestHandler";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

//Is needed? Not sure when node 18
installGlobals();
declare global {
  let awslambda: {
    streamifyResponse: any;
  };
}

// todo: if on dev, mock streamify response with a full buffer? or just run the other handler?
// if(process.env.)

// set up streaming handler
export const nonStreamingHandler = createRequestHandler({
  build: require("../build/server/"),
});

//TODO: update to use streams,
//https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html
// Lambda streaming handler, but needs work
// export const streamingHandler = awslambda.streamifyResponse(async (event, responseStream, _context) => {
//   // As an example, convert event to a readable stream.
//   const requestStream = Readable.from(Buffer.from(JSON.stringify(event)));

//   await pipeline(requestStream, zlib.createGzip(), responseStream);
// });
