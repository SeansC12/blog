import React from "react";
import BlogCard from "../../components/BlogCard";
import { query } from "../../lib/db";
import Image from "next/image";

export default function Home({ data, person }) {
  return (
    <div className="px-96">
      <div className="w-full flex items-center justify-center flex-col gap-5">
        <Image src={`https://ui-avatars.com/api/?name=${person && person}`} alt="profile picture" width={150} height={150} className="aspect-square rounded-full" />
        <h1 className="font-bold text-3xl">{person}</h1>
      </div>
      {data && data.map((blog, key) => {
        return (
          <div key={key}>
            <BlogCard
              title={blog.blog_title}
              description={blog.description}
              personName={person}
              personImage={`https://ui-avatars.com/api/?name=${person && person}`}
              url={`/${person}/${blog.url_name}`}
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
      "SELECT blogs.blog, blogs.blog_title, blogs.url_name, blogs.description, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id WHERE users.name = ?;";
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

    return {
      props: {
        data: data,
        person: personName,
      },
    };

  } catch (error) {
    throw Error(error.message)
  }
}
