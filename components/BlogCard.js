import React from "react";

function BlogCard({ title, content, personName, url, inProfile }) {
  return (
    <div className="mb-5 p-10 border-t-2 border-t-gray-500">
      {/* Author who published article */}
      <a
        href={`http://localhost:3000/${personName}`}
        className="flex flex-row gap-3 w-fit"
      >
        <div className="w-7 aspect-square rounded-full bg-black" />
        <div>{personName}</div>
      </a>
      <a href={url}>
        <h1 className="text-2xl font-bold my-3">{title}</h1>
        <h2 className="text-base text-gray-600">{content}</h2>
      </a>
    </div>
  );
}

export default BlogCard;
