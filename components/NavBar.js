import React from "react";
import useScroll from "../hooks/useScroll";

function NavBar() {
  const isVisible = useScroll();

  return (
    <div
      className={`sticky bg-red-500 h-16 top-0 ${
        isVisible ? "top-0" : "-top-16"
      } transition-all duration-500`}
    ></div>
  );
}

export default NavBar;
