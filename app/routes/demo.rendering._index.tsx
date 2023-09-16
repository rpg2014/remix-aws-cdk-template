export default function Index() {
  return (
    <div>
      <h1>Which should I choose?</h1>
      <p> The main idea for choosing SSR vs CSR vs Server or Client side data fetching is to pick the pattern that works the best for your usecase. </p>
      <p>Either way you go, Server side or Client side, as long as you cache the data correctly you should end up with a fast app.</p>
      <p>
        If you can use HTTP Streaming, server side data fetchs seem to be the way to go, with some client side fetching and caching to speed up some common page
        transitions.
      </p>
      <p>
        Without http streaming, it makes more sense to fetch all the quick stuff on the server, then save any long poll / below the fold content for client side
        fetching once the page renders. You'll have to take it on a case by case basis when designing the app.
      </p>
    </div>
  );
}
