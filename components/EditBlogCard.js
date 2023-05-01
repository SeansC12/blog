import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';
import useWindowDimensions from "./../hooks/useWindowDimensions";

function EditBlogCard({ blogTitle, blogDescription, blogID }) {
  const [error, setError] = useState("");
  const router = useRouter();

  async function deleteBlog(blogID) {
    await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({
        blog_id: blogID
      })
    })

    router.push("/")
  }

  return (
    <div className="w-full grid grid-cols-[80%_20%] grid-rows-1">
      <div class="w-full mx-auto bg-[#0be3ff] rounded-xl shadow-md overflow-hidden cursor-pointer">
        {useWindowDimensions().width > 640 ?
          <Link href={`/edit/${blogID}`}>
            <div class="p-4 sm:p-8">
              {/* <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div> */}
              <div href="#" class="block mt-1 text-base sm:text-lg leading-tight font-medium text-black hover:underline cursor-pointer">{blogTitle}</div>
              <p class="mt-2 text-xs sm:text-base text-slate-700">{blogDescription}</p>
            </div>
          </Link>
          :
          <div onClick={() => alert("Unable to edit blogs on a mobile device. Sorry for the inconvenience caused.")} class="p-4 sm:p-8">
            {/* <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div> */}
            <div href="#" class="block mt-1 text-base sm:text-lg leading-tight font-medium text-black hover:underline cursor-pointer">{blogTitle}</div>
            <p class="mt-2 text-xs sm:text-base text-slate-700">{blogDescription}</p>
          </div>
        }

      </div>
      <div onClick={() => deleteBlog(blogID)} className="flex items-center justify-center cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
          version="1.1"
          viewBox="0 0 482.428 482.429"
          xmlSpace="preserve"
          className="w-[30px] md:w-[50px] aspect-square"
        >
          <path d="M381.163 57.799h-75.094C302.323 25.316 274.686 0 241.214 0c-33.471 0-61.104 25.315-64.85 57.799h-75.098c-30.39 0-55.111 24.728-55.111 55.117v2.828c0 23.223 14.46 43.1 34.83 51.199v260.369c0 30.39 24.724 55.117 55.112 55.117h210.236c30.389 0 55.111-24.729 55.111-55.117V166.944c20.369-8.1 34.83-27.977 34.83-51.199v-2.828c0-30.39-24.723-55.118-55.111-55.118zm-139.949-31.66c19.037 0 34.927 13.645 38.443 31.66h-76.879c3.515-18.016 19.406-31.66 38.436-31.66zm134.091 401.173c0 15.978-13 28.979-28.973 28.979H136.096c-15.973 0-28.973-13.002-28.973-28.979V170.861h268.182v256.451zm34.83-311.568c0 15.978-13 28.979-28.973 28.979H101.266c-15.973 0-28.973-13.001-28.973-28.979v-2.828c0-15.978 13-28.979 28.973-28.979h279.897c15.973 0 28.973 13.001 28.973 28.979v2.828z"></path>
          <path d="M171.144 422.863c7.218 0 13.069-5.853 13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c-.001 7.217 5.851 13.068 13.069 13.068zM241.214 422.863c7.218 0 13.07-5.853 13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07-7.217 0-13.069 5.854-13.069 13.07v147.154c0 7.217 5.851 13.068 13.069 13.068zM311.284 422.863c7.217 0 13.068-5.853 13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07-7.219 0-13.07 5.854-13.07 13.07v147.154c-.001 7.217 5.853 13.068 13.07 13.068z"></path>
        </svg></div>
    </div>
  )
}

export default EditBlogCard