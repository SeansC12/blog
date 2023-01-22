import React from "react";
import BlogCard from "../../components/BlogCard";

export default function Home({ data, person }) {
  // return (
  //   <div className="bg-[#0e141b]">
  //     {data.blogs.map((blog, key) => {
  //       return (
  //         <div key={key}>
  //           <BlogCard
  //             title={blog.blog_title}
  //             content={blog.blog}
  //             personName={blog.name}
  //             url={`http://localhost:3000/${person}/${blog.url_name}`}
  //           />
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}

export async function getServerSideProps(context) {
  const { person } = context.params;
  // Fetch API blogs
  const urlEndpoint = `http://localhost:3000/api/${person}`;
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
      person: person,
    },
  };
}
