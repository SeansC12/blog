import React from "react";
import BlogCard from "../../components/BlogCard";
import { query } from "../../lib/db";
import EditorRenderer from "../../components/EditorRenderer";

export default function Home({ blog }) {
  return (
    <div className="bg-white text-black flex items-center justify-center flex-col">
      <div className="w-[80%] flex items-center justify-center mt-10 mb-7">
        <div className="text-5xl font-bold">{blog.blog_title}</div>
      </div>
      <div className="w-[55%] flex items-center justify-center flex-col">
        <EditorRenderer data={blog.blog} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { person, blog } = context.params;

  try {
    // Fetch blog post
    const sqlQuery =
      "SELECT blogs.blog, blogs.blog_title, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ? AND blogs.url_name = ?;";
    const valueParams = [person, blog];

    const data = await query({ query: sqlQuery, values: valueParams });

    // Going to check if this blog post actually exists
    if (data.length < 1) {
      // Invalid blog article
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blog: data[0],
      },
    };

  } catch (error) {
    throw Error(error.message);
  }
}
