import React from "react";
import BlogCard from "../../components/BlogCard";

export default function Blog({ data }) {
  console.log(data);
  return (
    <div>
      {data.blogs.map((blog) => {
        return (
          <a
            className="my-5"
            href={`http://localhost:3000/blogs/${blog.blog_id}`}
          >
            <BlogCard title={blog.blog_title} content={blog.blog} />
          </a>
        );
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const urlEndpoint = `http://localhost:3000/api/blogs`;
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
