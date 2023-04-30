import React from 'react'
import Link from "next/link";

function EditBlogCard({ blogTitle, blogDescription, blogID }) {
  return (
    <div class="w-full mx-auto bg-[#0be3ff] rounded-xl shadow-md overflow-hidden cursor-pointer">
      <Link href={`/edit/${blogID}`}>
        <div class="p-4 sm:p-8">
          {/* <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div> */}
          <div href="#" class="block mt-1 text-base sm:text-lg leading-tight font-medium text-black hover:underline cursor-pointer">{blogTitle}</div>
          <p class="mt-2 text-xs sm:text-base text-slate-700">{blogDescription}</p>
        </div>
      </Link>
    </div>
  )
}

export default EditBlogCard