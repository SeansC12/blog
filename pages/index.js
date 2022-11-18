import React from "react";
import BlogCard from "../components/BlogCard";

export default function Home({ data }) {
  console.log(data);
  return (
    <div className="pb-[300vh]">
      {data.map((blog) => {
        return (
          <BlogCard
            title={blog.blog_title}
            content={blog.blog}
            personName={blog.name}
            url={`http://localhost:3000/${blog.name}/${blog.url_name}`}
          />
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
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
    },
  };
}
