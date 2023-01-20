import React from "react";

function PopularReads({ title, url, personName }) {
  return (
    <div className="w-full">
      <a className="flex flex-row items-center justify-start gap-2 mb-3" href={`/${personName}`}>
        <div className="bg-pink-400 rounded-full w-5 aspect-square" />
        <div className="text-white font-lato text-sm transition-all hover:text-[#617bff]">
          {personName}
        </div>
      </a>
      <a href={url}>
        <div className="font-bold text-white font-lato text-xl transition-all hover:text-[#617bff]">
          {/* Title */}
          {title}
        </div>
      </a>
    </div>
  )
}

export default PopularReads