import React from "react";
import BlogCard from "../../components/BlogCard";

export default function Home({ data }) {
  console.log(data);
  return (
    <div className="bg-[#0e141b]">
      {data.blogs.map((blog, key) => {
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
  const urlEndpoint = `http://localhost:3000/api/${person}/${blog}`;
  const res = await fetch(urlEndpoint);
  const data = await res.json();

  if (res.status !== 200) {
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
