import React from "react";
import BlogCard from "../components/BlogCard";

const temporaryTags = ["React", "JavaScript", "Vue", "Java", "DSA", "Web3"];

export default function Home({ data }) {
  console.log(data);
  return (
    <div className="px-40 bg-[#0e141b] text-white">
      <div className="grid grid-cols-[75%_25%] grid-rows-1">
        <div className="col-start-1 col-span-1">
          <div className="ml-2 font-montserrat text-orange-400 font-semibold tracking-widest text-lg">
            TRENDING
          </div>
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
        <div className="col-start-2 col-span-1">
          <div className="flex flex-col items-start justify-center">
            <div className="font-montserrat text-orange-400 font-semibold tracking-widest text-lg">
              FILTER BY TAGS
            </div>
            <div className="overflow-visible">
              {temporaryTags.map((tagName) => {
                return (
                  <div className="rounded-md bg-slate-700 h-fit w-fit inline-block text-sm p-2 m-1">
                    {tagName}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
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
