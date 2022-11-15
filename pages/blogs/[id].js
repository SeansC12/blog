import React from "react";
import BlogCard from "../../components/BlogCard";

export default function BlogID({ data }) {
  console.log(data);
  return (
    <div>
      {data.blogs.map((blog) => {
        return <BlogCard title={blog.blog_title} content={blog.blog} />;
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const urlEndpoint = `http://localhost:3000/api/blogs/${id}`;
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
    },
  };
}
