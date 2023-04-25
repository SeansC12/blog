import React from 'react'

function EditBlogCard({ blogTitle, blogDescription, blogID }) {
  return (
    <div class="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
      <a href={`/edit/${blogID}`}>
        <div class="p-8">
          {/* <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Company retreats</div> */}
          <div href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline cursor-pointer">{blogTitle}</div>
          <p class="mt-2 text-slate-500">{blogDescription}</p>
        </div>
      </a>
    </div>
  )
}

export default EditBlogCard