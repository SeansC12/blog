import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
});

function Create() {
  const [blogData, setBlogData] = useState();

  return (
    <div>
      <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" />
      <div>Hello</div>
    </div>
  )
}

export default Create