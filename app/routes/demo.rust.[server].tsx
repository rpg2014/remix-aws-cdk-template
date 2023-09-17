import { Form, useActionData } from "@remix-run/react";
import { json, type ActionFunctionArgs } from "@remix-run/server-runtime";
import { add } from "~/rust.server";
import * as EB from "~/components/ErrorBoundary";

export const meta = () => [{ title: "Server Side Rust" }];

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = await request.formData();
  // check for null a and b url search params
  const a = data.get("a") as string;
  const b = data.get("b") as string;
  if (a == null || b == null) {
    throw new Response("Please enter a and b url search params", { status: 400 });
  }
  try {
    const num_a = Number.parseFloat(a);
    const num_b = Number.parseFloat(b);
    if (isNaN(num_a) || isNaN(num_b)) {
      throw new Response("Please enter a and b url search params", { status: 400 });
    }

    return json({
      result: add(num_a, num_b),
    });
  } catch (e) {
    throw new Response("One of the inputs isn't a number", { status: 400 });
  }
};
export default function Index() {
  const data = useActionData<typeof action>();
  return (
    <div>
      <Form method="POST" className="additionForm">
        <div className="additionDiv">
          <label>
            <span>Number 1</span>
            <input name="a"></input>
          </label>
          <div style={{ textAlign: "center" }}>+</div>
          <label>
            <span>Number 2</span>
            <input name="b"></input>
          </label>
        </div>
        <button type="submit">Add</button>
        <p>Result: {data?.result}</p>
      </Form>
    </div>
  );
}

export const ErrorBoundary = EB.ErrorBoundary;
