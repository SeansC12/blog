import React from 'react'

function Tag({ tagName, key, activeTags, setActiveTags }) {
  return (
    <div
      key={key}
      onClick={() => {
        if (activeTags.includes(tagName)) {
          setActiveTags((curr) =>
            curr.filter((name) => name !== tagName)
          );
        } else {
          setActiveTags((curr) => [...curr, tagName]);
        }
      }}
      className={`select-none transition-all ease-in hover:scale-105 rounded-md h-fit w-fit inline-block text-sm px-3 py-[0.375rem] cursor-pointer font-medium ${activeTags.includes(tagName)
        ? "bg-[#ffd037] text-black shadow-md"
        : "bg-[#63bce9]"
        }`}
    >
      {tagName}
    </div>
  )
}

export default Tag