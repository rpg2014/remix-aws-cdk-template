import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { hash } from "~/utils.server";

export const meta: MetaFunction = () => {
  return [{ title: "In memory Posts demo" }, { name: "description", content: "Test post demo" }];
};
let state: { title: string; slug: string }[] = [
  {
    slug: "my-first-post",
    title: "My First Post",
  },
  {
    slug: "90s-mixtape",
    title: "A Mixtape I Made Just For You",
  },
];
export const loader = async () => {
  return json({
    posts: state,
  });
};
function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Posts</h1>
      {posts?.map(post => <p key={post.title}>{post.title}</p>)}
    </main>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const title = formData.get("test");

  if (title) {
    state.push({
      title: typeof title === File ? title.toString() : title.toString(),
      slug: hash(title.toString()).toString(),
    });
  }

  return json({ ok: true });
};
export default function Layout() {
  const nav = useNavigation();
  return (
    <div className={"remix__page"}>
      <Posts />
      <Form reloadDocument className={"remix__form"} method="POST">
        <label>Create a new post</label>
        <input type={"text"} name={"test"}></input>
        <button disabled={nav.state === "submitting"}>Create post!</button>
      </Form>
    </div>
  );
}
