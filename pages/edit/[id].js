import React, { useState, useEffect, useRef } from 'react'
import Editor from '../../components/Editor';
import EditorRenderer from '../../components/EditorRenderer';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { query } from '../../lib/db';
import { LayoutGroup } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

function ID({ data }) {
  const supabaseClient = useSupabaseClient();

  const [blogData, setBlogData] = useState(data.blog);
  const [tempBlogData, setTempBlogData] = useState();
  const [blogTitle, setBlogTitle] = useState(data.blog_title);
  const [blogDescription, setBlogDescription] = useState(data.description);
  const [isEditingMode, setIsEditingMode] = useState(true);

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const [isThereUnsavedChanges, setIsThereUnsavedChanges] = useState(false)

  const router = useRouter();

  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (blogTitle !== data.blog_title || blogDescription !== data.description || blogData !== data.blog) {
      setIsThereUnsavedChanges(true);
    } else {
      setIsThereUnsavedChanges(false);
    }
  })

  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    const warningText =
      'You may have unsaved changes. Changes will be lost.';
    const handleWindowClose = (e) => {
      if (!isThereUnsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!isThereUnsavedChanges) return;
      if (window.confirm(warningText)) return;
      router.events.emit('routeChangeError');
      throw 'routeChange aborted.';
    };
    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, []);

  async function update(title, description, blog, blogID) {
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

    await fetch("/api/updateBlogPost", {
      method: "PATCH",
      body: JSON.stringify({
        blog_title: title,
        blog: blog,
        url_name: finalURLName,
        description: description,
        blog_id: blogID,
      })
    });

    setIsThereUnsavedChanges(false);
    router.push("/")
  }

  async function deleteBlog(blogID) {
    await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        blog_id: blogID
      })
    })

    router.push("/")
  }

  useEffect(() => {
    setTempBlogData(blogData)
  }, [isEditingMode])

  return (
    <div>
      {isDeleteMode ?
        <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete blog</h3>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">Are you sure you want to delete this blog? The blog will be permanently removed. This action cannot be undone.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={() => deleteBlog(data.blog_id)} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                  <button onClick={() => setIsDeleteMode(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div> : null
      }
      <div className="flex justify-end items-center w-full sticky top-0">
        <div onClick={() => update(blogTitle, blogDescription, blogData, data.blog_id)} className="rounded-md bg-[#20ff63] py-[0.35rem] px-4 text-black font-lato w-max mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
          Update
        </div>
        <div onClick={() => setIsDeleteMode(true)} className="rounded-md bg-[#fc4e4e] py-[0.35rem] px-4 text-black font-lato w-max mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
          Delete
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
    </div >
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id)

  const sqlQuery = "SELECT blog_id, blog_title, blog, description FROM blogs WHERE blog_id = ?";
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

export default ID