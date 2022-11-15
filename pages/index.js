import React from "react";
import BlogCard from "../components/BlogCard";

export default function Home({ data, dictionary }) {
  console.log(data);
  return (
    <div>
      {data.map((blog) => {
        return (
          <a
            href={`http://localhost:3000/${
              dictionary[blog.person_id - 1].name
            }/${blog.url_name}`}
          >
            <BlogCard title={blog.blog_title} content={blog.blog} />
          </a>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const urlEndpoint = `http://localhost:3000/api/get-all-blogs`;
  const res = await fetch(urlEndpoint);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.blogs,
      dictionary: data.dictionary,
    },
  };
}
