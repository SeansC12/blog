import React from "react";

function BlogCard({ title, content }) {
  return (
    <div className="bg-green-400 my-5">
      <h1 className="text-xl">{title}</h1>
      <h2 className="text-base">{content}</h2>
    </div>
  );
}

export default BlogCard;
