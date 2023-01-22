import React from "react";
import useScroll from "../hooks/useScroll";
import { useUser } from "@auth0/nextjs-auth0/client";
import { isUserInDB } from "../lib/UserInDB";

function NavBar() {
  const isVisible = useScroll();
  const { user, error, isLoading } = useUser();

  // Once user has loaded
  // if (user) {
  //   console.log("hi");
  //   isUserInsideDB = isUserInDB(user);
  // }

  return (
    <div
      className={`sticky bg-red-500 h-16 top-0 flex items-center justify-between ${isVisible ? "top-0" : "-top-16"
        } transition-all duration-500`}
    >
      <div>
        hi
      </div>
      {user ? <a href="/api/auth/logout">Logout</a> : <a href="/api/auth/login">Login</a>}
    </div>
  );
}

export default NavBar;
