import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Tag from "../components/Tag";
import PopularReads from "../components/PopularReads";
import { query } from "./../lib/db";

const temporaryTags = ["React", "JavaScript", "Vue", "Java", "DSA", "Web3"];

export default function Home({ data }) {
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    // TODO: CHANGE BLOG POSTS BASED ON CURRENTLY ACTIVE TAGS
  }, [activeTags]);

  return (
    <div className="px-40 bg-white text-black">
      <div className="grid grid-cols-[70%_30%] grid-rows-1">
        <div className="col-start-1 col-span-1">
          <div className="ml-2 font-montserrat text-[#e60067] font-semibold tracking-widest text-lg">
            TRENDING
          </div>
          {data.map((blog) => {
            return (
              <BlogCard
                title={blog.blog_title}
                description={blog.description}
                personName={blog.name}
                url={`http://localhost:3000/${blog.name}/${blog.url_name}`}
                personImage={`https://ui-avatars.com/api/?name=${blog.name && blog.name}`}
              />
            );
          })}
        </div>
        <div className="col-start-2 col-span-1">
          <div className="flex flex-col items-start justify-center">
            <div className="font-montserrat text-[#e60067] font-semibold tracking-widest text-lg ml-1 mb-5">
              FILTER BY TAGS
            </div>
            <div className="flex gap-2 flex-wrap">
              {temporaryTags.map((tagName, key) => {
                // Code for each category tag to filter by
                return (
                  <Tag tagName={tagName} key={key} activeTags={activeTags} setActiveTags={setActiveTags} />
                );
              })}
            </div>
            <div className="font-montserrat text-[#e60067] font-semibold tracking-widest text-lg ml-1 mt-24 mb-5">
              POPULAR
            </div>
            <div className="flex flex-col gap-8">
              {data.map((blog) => {
                return (
                  <PopularReads
                    title={blog.blog_title}
                    url={`http://localhost:3000/${blog.name}/${blog.url_name}`}
                    personName={blog.name}
                    personImage={`https://ui-avatars.com/api/?name=${blog.name && blog.name}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const sqlQuery = `SELECT blogs.blog_title, blogs.url_name, blogs.description, users.name FROM blogs INNER JOIN users ON users.person_id = blogs.person_id;`;
  const valueParams = [];
  const data = await query({ query: sqlQuery, values: valueParams });

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
