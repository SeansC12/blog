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
        ? "bg-[#d4af37] text-black shadow-md"
        : "bg-slate-700"
        }`}
    >
      {tagName}
    </div>
  )
}

export default Tag