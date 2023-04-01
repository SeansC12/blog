import React, { useState, useEffect, useRef } from "react";
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
  const titleRef = useRef();
  const router = useRouter();

  async function publish(title, blog) {
    // Get the user
    const { data: { user } } = await supabase.auth.getUser();

    // Compute the url_name
    const titleArray = title.split(" ");
    let slicedTitleArray = [];

    if (titleArray.length < 4) {
      slicedTitleArray = titleArray;
    }
    slicedTitleArray = title.split(" ").slice(0, 4);
    let finalURLName = "";

    for (let i = 0; i < slicedTitleArray.length; i++) {
      finalURLName += slicedTitleArray[i].toLowerCase();
      if (i != slicedTitleArray.length - 1) {
        finalURLName += "-"
      }
    }

    await fetch("/api/publish", {
      method: "POST",
      body: JSON.stringify({
        blog_id: crypto.randomUUID(),
        blog_title: title,
        blog: blog,
        person_id: user.id,
        url_name: finalURLName,
        description: "Test 1"
      })
    })

    router.push("/");
  }

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
      <div className="flex justify-end items-center">
        <div onClick={() => publish(titleRef.current.value, blogData)} className="rounded-md bg-green-400 py-[0.35rem] px-4 text-black font-lato w-max mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
          Publish
        </div>
      </div>
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
        {isEditingMode ?
          <div className="w-full">
            <div>Give your blog a title</div>
            <input ref={titleRef} className="border-2 rounded border-gray-500 w-full mb-10" />
          </div> : <div className="w-full" />}

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