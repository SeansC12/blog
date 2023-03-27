import React from 'react'

function Create() {
  return (
    <div className="px-72 flex flex-col">
      <input className="w-full bg-transparent h-16 focus:outline-none text-5xl font-lato p-2 break-words" placeholder="Title..." />
      <input className="w-full bg-transparent h-10 focus:outline-none text-xl font-lato pt-4 p-2 break-words" placeholder="Tell your story" />
    </div>
  )
}

export default Create