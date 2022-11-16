import React from "react";
import BlogCard from "../../components/BlogCard";

export default function Home({ data, person }) {
  console.log(data);
  return (
    <div>
      {data.blogs.map((blog) => {
        return (
          <BlogCard
            title={blog.blog_title}
            content={blog.blog}
            personName={blog.name}
            url={`http://localhost:3000/${person}/${blog.url_name}`}
          />
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { person } = context.params;
  const urlEndpoint = `http://localhost:3000/api/${person}`;
  const res = await fetch(urlEndpoint);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
      person: person,
    },
  };
}
