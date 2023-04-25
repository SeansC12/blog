import React, { useState, useEffect, useRef } from 'react'
import Editor from '../../components/Editor'
import EditorRenderer from '../../components/EditorRenderer';
import { query } from '../../lib/db';
import { LayoutGroup } from 'framer-motion';
import { motion } from 'framer-motion';

function id({ data }) {
  const [blogData, setBlogData] = useState(data.blog);
  const [tempBlogData, setTempBlogData] = useState();
  const [blogTitle, setBlogTitle] = useState();
  const [isEditingMode, setIsEditingMode] = useState(true);
  const titleRef = useRef();

  useEffect(() => {
    setTempBlogData(blogData)
  }, [isEditingMode])

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
            <input ref={titleRef} onChange={() => { setBlogTitle(titleRef.current.value) }} value={blogTitle} className="border-2 rounded border-gray-500 w-full mb-10" />
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

  const sqlQuery = "SELECT blog_title, blog FROM blogs WHERE blog_id = ?";
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