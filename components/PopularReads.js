import React from "react";

function PopularReads({ title, url, personName, personImage }) {
  return (
    <div className="w-full">
      <a className="flex flex-row items-center justify-start gap-2 mb-3" href={`/${personName}`}>
        <img src={personImage} className="w-7 aspect-square rounded-full" />
        <div className="text-black font-lato text-sm transition-all hover:text-[#617bff]">
          {personName}
        </div>
      </a>
      <a href={url}>
        <div className="font-bold text-black font-lato text-xl transition-all hover:text-[#617bff]">
          {/* Title */}
          {title}
        </div>
      </a>
    </div>
  )
}

export default PopularReads