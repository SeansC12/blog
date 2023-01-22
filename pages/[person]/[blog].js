import React from "react";
import BlogCard from "../../components/BlogCard";
import { query } from "../../lib/db";

export default function Home({ data }) {
  console.log(data);
  return (
    <div className="bg-[#0e141b]">
      {data && data.map((blog, key) => {
        return (
          <div key={key}>
            <BlogCard title={blog.blog_title} content={blog.blog} />
          </div>);
      })}
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
        data: data,
      },
    };

  } catch (error) {
    throw Error(error.message);
  }
}
