import React from "react";
import BlogCard from "../../components/BlogCard";
import { query } from "../../lib/db";

export default function Home({ data, person }) {
  return (
    <div className="bg-[#0e141b]">
      {data.blogs && data.blogs.map((blog, key) => {
        return (
          <div key={key}>
            <BlogCard
              title={blog.blog_title}
              content={blog.blog}
              personName={blog.name}
              url={`http://localhost:3000/${person}/${blog.url_name}`}
            />
          </div>
        );
      })}
    </div>
  );
}

// Runs on the server
export async function getServerSideProps(context) {
  const { person: personName } = context.params;

  try {
    // Fetch the blogs
    const sqlQuery =
      "SELECT blogs.blog, blogs.blog_title, blogs.url_name, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ?;";
    const valueParams = [personName];

    const data = await query({ query: sqlQuery, values: valueParams });

    // Going to check if the user actually exists
    if (data.length < 1) {
      const personWithThisName = await query({ query: "SELECT person_id FROM users WHERE name = ?", values: [personName] });

      if (personWithThisName.length < 1) {
        // This person does not exist
        return {
          notFound: true,
        };
      }
    }

  } catch (error) {
    throw Error(error.message)
  }


  return {
    props: {
      data: data,
      person: personName,
    },
  };
}
