import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, LayoutGroup } from "framer-motion";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
const EditorRenderer = dynamic(() => import("../components/EditorRenderer"), {
  ssr: false
});

const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false
});

function Create() {
  const [blogData, setBlogData] = useState();
  const [isEditingMode, setIsEditingMode] = useState(true);
  const [randomState, setRandomState] = useState(false);
  const router = useRouter();

  if (!randomState) {
    const tryToGetUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/Login");
      }
    }

    tryToGetUser();
  }

  useEffect(() => {
    setRandomState(true);
  }, [])

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
      <div className="bg-white pt-10 px-80 text-black flex items-center justify-center flex-col">
        <div>Give your blog a title</div>
        <input className="border-2 rounded border-gray-500 w-full mb-10" />
        {isEditingMode ?
          <div className="container max-w-4xl">
            <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" />
          </div>
          :
          <EditorRenderer data={blogData} />
        }
      </div>
    </div>
  )
}

export default Create