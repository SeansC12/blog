import React from "react";


function EditorRenderer({ data }) {
  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: data }}></div>
  );
};

export default EditorRenderer;