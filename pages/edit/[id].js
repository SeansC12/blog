import React, { useState, useEffect, useRef } from 'react'
import Editor from '../../components/Editor';
import EditorRenderer from '../../components/EditorRenderer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { query } from '../../lib/db';
import { LayoutGroup } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

function id({ data }) {
  const [blogData, setBlogData] = useState(data.blog);
  const [tempBlogData, setTempBlogData] = useState();
  const [blogTitle, setBlogTitle] = useState(data.blog_title);
  const [blogDescription, setBlogDescription] = useState(data.description);
  const [isEditingMode, setIsEditingMode] = useState(true);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const titleRef = useRef();
  const descriptionRef = useRef();

  async function update(title, description, blog) {
    // Get the user
    const { data: { user } } = await supabaseClient.auth.getUser();

    // Recompute new url name
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

    finalURLName = encodeURIComponent(finalURLName);
    console.log(finalURLName);

    await fetch("/api/update", {
      method: "PATCH",
      body: JSON.stringify({
        blog_title: title,
        blog: blog,
        url_name: finalURLName,
        description: description,
        person_id: user.id,
      })
    });

    router.push("/")
  }

  useEffect(() => {
    setTempBlogData(blogData)
  }, [isEditingMode])

  return (
    <div>
      <div className="flex justify-end items-center w-full sticky top-0">
        <div onClick={() => update(blogTitle, blogDescription, blogData)} className="rounded-md bg-green-400 py-[0.35rem] px-4 text-black font-lato w-max mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
          Update
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
              color: isEditingMode ? "black" : "gray",
            }}
          >
            Markup
            {isEditingMode && (
              <motion.div
                className={`h-1 rounded-full w-10/12 m-auto`}
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
              color: !isEditingMode ? "black" : "gray",
            }}
          >
            Preview
            {!isEditingMode && (
              <motion.div
                className={`h-1 rounded-full w-10/12 m-auto`}
                layoutId="underline"
              ></motion.div>
            )}
          </motion.li>
        </ol>
      </LayoutGroup>
      <div className="bg-white h-full pt-10 px-80 text-black flex items-center justify-start flex-col w-full">
        {isEditingMode ?
          <div className="w-full">
            <div>This is the title of your blog</div>
            <input ref={titleRef} onChange={() => { setBlogTitle(titleRef.current.value) }} defaultValue={blogTitle} className="border-2 rounded border-gray-500 w-full mb-10" />

            <div>This is the description of your blog</div>
            <input ref={descriptionRef} onChange={() => { setBlogDescription(titleRef.current.value) }} defaultValue={blogDescription} className="border-2 rounded border-gray-500 w-full mb-10" />
          </div> : <div className="w-full" />}

        {isEditingMode ?
          <div>
            {/* <Editor data={blogData} onChange={setBlogData} holder="editorjs-container" /> */}
            <div className="w-full">
              <Editor setBlogData={setBlogData} blogData={tempBlogData} />
            </div>
          </div>
          :
          <div className="w-full">
            {blogData && <div className="w-full"><EditorRenderer title={blogTitle} blog={blogData} /></div>}
          </div>
        }
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id)

  const sqlQuery = "SELECT blog_title, blog, description FROM blogs WHERE blog_id = ?";
  const valueParams = [id];

  let data;
  try {
    data = await query({ query: sqlQuery, values: valueParams });
  } catch (err) {
    throw Error(err);
  }

  return {
    props: {
      data: data[0],
    },
  };

}

export default id