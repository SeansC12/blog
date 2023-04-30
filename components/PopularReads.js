import React from "react";
import Link from "next/link";
import Image from "next/image";

function PopularReads({ title, url, personName, personImage }) {
  return (
    <div className="w-full">
      <Link className="flex flex-row items-center justify-start gap-2 mb-3" href={`/${personName}`}>
        <Image src={personImage} alt="profile picture" className="w-7 aspect-square rounded-full" />
        <div className="text-black font-lato text-sm transition-all hover:text-[#617bff]">
          {personName}
        </div>
      </Link>
      <Link href={url}>
        <div className="font-bold text-black font-lato text-xl transition-all hover:text-[#617bff]">
          {/* Title */}
          {title}
        </div>
      </Link>
    </div>
  )
}

export default PopularReads