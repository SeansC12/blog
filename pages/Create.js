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
  const [blogTitle, setBlogTitle] = useState();
  const [isEditingMode, setIsEditingMode] = useState(true);
  const [randomState, setRandomState] = useState(false);
  const [isPublishedMode, setIsPublishedMode] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
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
        description: descriptionRef.current.value
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
      {isPublishedMode ?
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    {/* <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div> */}
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left grow">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Adding the finishing touches...</h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Give your blog article a description</p>
                      </div>
                      <input ref={descriptionRef} className="border-2 rounded w-full my-4 text-black" />
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={() => publish(titleRef.current.value, blogData)} type="button" class="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto">Publish</button>
                  <button onClick={() => setIsPublishedMode(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div> : null}

      <div className="flex justify-end items-center">
        <div onClick={() => setIsPublishedMode(true)} className="rounded-md bg-green-400 py-[0.35rem] px-4 text-black font-lato w-max mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
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
      <div className="bg-white pt-10 px-80 text-black flex items-center justify-center flex-col w-full">
        {isEditingMode ?
          <div className="w-full">
            <div>Give your blog a title</div>
            <input ref={titleRef} onChange={() => { setBlogTitle(titleRef.current.value) }} value={blogTitle} className="border-2 rounded border-gray-500 w-full mb-10" />
          </div> : <div className="w-full" />}

        {isEditingMode ?
          <div className="container max-w-4xl">
            <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" />
          </div>
          :
          <div className="w-full">
            <div className="text-5xl font-bold w-full">{titleRef.current.value}</div>
            {blogData && <div className="w-full"><EditorRenderer data={blogData} /></div>}
          </div>
        }
      </div>
    </div>
  )
}

export default Create