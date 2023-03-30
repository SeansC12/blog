import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, LayoutGroup } from "framer-motion";
const EditorRenderer = dynamic(() => import("../components/EditorRenderer"), {
  ssr: false
});

const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
});

function Create() {
  const [blogData, setBlogData] = useState();
  const [isEditingMode, setIsEditingMode] = useState(true);

  return (
    <div>
      <LayoutGroup>
        <ol className="grid grid-cols-2 place-items-center w-full font-lato m-5 my-10">
          <motion.li
            onClick={() => {
              setIsEditingMode(true);
            }}
            className="text-center sm:text-xl w-fit cursor-pointer text-[5vw]"
            animate={{
              color: isEditingMode ? "white" : "gray",
            }}
          >
            Markup
            {isEditingMode && (
              <motion.div
                className={`h-1 rounded-full w-10/12 m-auto`}
                // style={{ backgroundColor: course.color }}
                layoutId="underline"
              ></motion.div>
            )}
          </motion.li>
          <motion.li
            onClick={() => {
              setIsEditingMode(false);
            }}
            className="text-center sm:text-xl w-fit cursor-pointer text-[5vw]"
            animate={{
              color: !isEditingMode ? "white" : "gray",
            }}
          >
            Preview
            {!isEditingMode && (
              <motion.div
                className={`h-1 rounded-full w-10/12 m-auto`}
                // style={{ backgroundColor: course.color }}
                layoutId="underline"
              ></motion.div>
            )}
          </motion.li>
        </ol>
      </LayoutGroup>
      {/* <div className="bg-gradient-to-b from-[#0e141b] to-white h-20" /> */}
      {/* <div className="flex items-center justify-center gap-5 bg-white">
        <div className="text-black">Markup</div>
        <div className="text-black">Preview</div>
      </div> */}
      {isEditingMode ?
        <div className="bg-white pt-10 px-80">
          <div className="container max-w-4xl">
            <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" />
          </div>
        </div>
        :
        <div className="bg-white pt-10 px-80">
          <EditorRenderer data={blogData} />
        </div>
      }
    </div>
  )
}

export default Create