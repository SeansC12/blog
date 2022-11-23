import React from "react";
import BlogCard from "../components/BlogCard";

export default function Home({ data }) {
  console.log(data);
  return (
    <div className="px-40 bg-[#0e141b] text-white">
      {data.map((blog) => {
        return (
          <BlogCard
            title={blog.blog_title}
            description={blog.description}
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
