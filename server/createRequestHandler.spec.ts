import { createCloudFrontHeaders, createRemixHeaders } from "./createRequestHandler";

describe("Lambda@Edge Server Adapter", () => {
  it("should map headers to cloudfront headers correctly", () => {
    const inputHeaders = new Headers();
    inputHeaders.set("test", "1");
    inputHeaders.append("test", "2");
    const result = createCloudFrontHeaders(inputHeaders);

    expect(result["test"]).toEqual([
      { key: "test", value: "1" },
      { key: "test", value: "2" },
    ]);
  });

  it("should map cloudfront headers to headers correctly", () => {
    const inputHeaders = {
      test: [
        { key: "test", value: "1" },
        { key: "test", value: "2" },
      ],
    };
    const result = createRemixHeaders(inputHeaders);
    expect(result.get("test")).toEqual("1, 2");
  });
});
