import React from "react";
import edjsHTML from "editorjs-html";

const edjsParser = edjsHTML();

function EditorRenderer({ data }) {
  const html = edjsParser.parse(data);
  console.log(html)
  return (
    // It's important to add key={data.time} here to re-render based on the latest data.
    <div className="prose max-w-full" key={data.time}>
      {html.map((item, index) => {
        console.log(item);
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorRenderer;