import React, { useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
});

function Create() {
  const [blogData, setBlogData] = useState();

  return (
    <div>
      <div className="bg-gradient-to-b from-[#0e141b] to-white h-6" />
      <div className="flex items-center justify-center gap-5 bg-white">
        <div className="text-black">Markup</div>
        <div className="text-black">Preview</div>
      </div>
      <div className="bg-white">
        <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" />
      </div>
    </div>
  )
}

export default Create