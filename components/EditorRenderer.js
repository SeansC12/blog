import React from "react";


function EditorRenderer({ title, blog }) {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl md:text-4xl my-5">{title}</h1>
      <div className="no-tailwindcss-base text-sm sm:text-base">
        <div dangerouslySetInnerHTML={{ __html: blog }}></div>
      </div>
    </div>
  );
};

export default EditorRenderer;