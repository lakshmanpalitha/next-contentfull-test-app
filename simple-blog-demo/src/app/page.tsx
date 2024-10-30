import { createClient } from "contentful";
import Link from 'next/link'; // Import Link from Next.js
import { BlogQueryResult } from "./types";

// const client = createClient({
//   space: 'ftkzvu6kei7h',
//   accessToken: 'dRzKTEsCUo7Nc5NX5MO76eldUsKvTyIiiDrCDy2gsrc'
// });

const client = createClient({
  space: process.env.SPACE_ID!,
  accessToken: process.env.ACCESS_TOKEN!,
});

export default async function Home() {
  const blogEntries = await getBlogEntries();
  console.log("Home -> blogEntries", blogEntries);

  return (
    <div>
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date } = singlePost.fields;

        return (
          <div className="pb-4 mb-4 border-b border-neutral-200" key={slug}>
            <Link className="hover:text-blue-700" href={`/articles/${slug}`}>
              <h2  className="font-extrabold text-xl">{title}</h2>
              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "blog" });
  return entries;
};
