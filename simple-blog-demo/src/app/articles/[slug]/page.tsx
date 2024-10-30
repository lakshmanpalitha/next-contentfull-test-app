import { createClient } from "contentful";

const client = createClient({
  space: "ftkzvu6kei7h",
  accessToken: "dRzKTEsCUo7Nc5NX5MO76eldUsKvTyIiiDrCDy2gsrc",
});

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "blog",
    select: "fields.slug",
  };
  const articles = await client.getEntries(queryOptions)
  return articles.items.map((article) => ({
    slug: article.fields.slug,
  }));
}