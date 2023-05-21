import React, { useRef, useEffect, useState } from "react";
import useScroll from "../hooks/useScroll";
import Image from "next/image";
import logo from "./../public/logo.png";
import useOutsideClickAlerter from "../hooks/useOutsideClickAlerter";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";
import useWindowDimensions from "../hooks/useWindowDimensions";
import blog_icon from "./../public/blog_icon.png"

function NavBar() {
  const isVisible = useScroll();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userSettingsRef = useRef();
  const [user, setUser] = useState();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabaseClient.auth.getUser();

      console.log(user)

      if (user) {
        // Get user from my own custom MySQL database
        const res = await fetch("/api/getUserObject", {
          method: "PATCH",
          body: JSON.stringify({
            id: user.id
          })
        });

        const { data } = await res.json();
        setUser(data);
      }
    }

    getUser();
  }, [])

  useOutsideClickAlerter(() => {
    setIsUserMenuOpen(false)
  }, userSettingsRef);

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw new Error(error);
    }

    router.reload();
  }
  if (useWindowDimensions().width >= 640) {
    return (
      <div
        className={`sticky z-50 bg-white text-black border-b-[1px] mb-4 border-b-white shadow-md h-16 top-0 flex items-center justify-between ${isVisible ? "top-0" : "-top-16"
          } transition-all duration-500`}
      >
        <Link href="/">
          <Image src={logo} width={48} height={48} className="w-12 ml-5 rounded-lg" alt="logo" />
        </Link>
        {user ?
          <div className="block mr-5" ref={userSettingsRef}>
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Profile dropdown --> */}
              <div className="relative ml-3 flex flex-row">
                {window.location.href !== "http://localhost:3000/Create" ?
                  <Link href="/Create">
                    <div className="rounded-md bg-[#20ff63] py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
                      Create
                    </div>
                  </Link>
                  :
                  null
                }
                <Link href="/edit">
                  <div className="rounded-md bg-[#43c5f4] py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
                    My blogs
                  </div>
                </Link>
                <div onClick={() => setIsUserMenuOpen((curr) => !curr)}>
                  <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <Image width={32} height={32} className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user && user.name}`} alt="" />
                  </button>
                </div>
                {isUserMenuOpen ?

                  <div className="absolute top-8 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                    <Link href="/Profile" className="block px-4 pb-2 pt-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>

                    {/* <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</Link> */}

                    <div onClick={logout} className="cursor-pointer block px-4 pt-2 pb-3 text-sm text-red-500 hover:bg-red-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</div>
                  </div>
                  :
                  null}

              </div>
            </div>
          </div>
          :
          <Link href="/Login">
            <div className="rounded-md bg-[#43c5f4] py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
              Login
            </div>
          </Link>}
      </div>
    );
  } else {
    return (
      <div
        className={`sticky z-50 bg-white text-black border-b-[1px] mb-4 border-b-white shadow-md h-16 w-full`}
      >
        {user ?
          <a href={"/edit"}>
            {/* <Image width={32} height={32} className="absolute top-1/2 -translate-y-1/2 left-5" alt="blog icon" src={blog_icon} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 50 50"
              className="absolute top-1/2 -translate-y-1/2 left-5"
            >
              <path d="M9 4a5 5 0 00-5 5v32a5 5 0 005 5h32a5 5 0 005-5V9a5 5 0 00-5-5H9zm11 8h5c4.42 0 8.033 3.633 8 8.06-.009 1.082.919 1.94 2 1.94h1a2 2 0 012 2v6c0 4.4-3.6 8-8 8H20c-4.4 0-8-3.6-8-8V20c0-4.4 3.6-8 8-8zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2h5c1.1 0 2-.9 2-2s-.9-2-2-2h-5zm0 10c-1.1 0-2 .9-2 2s.9 2 2 2h10c1.1 0 2-.9 2-2s-.9-2-2-2H20z"></path>
            </svg>
          </a>
          :
          null}

        <Link className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" href="/">
          <Image src={logo} width={48} height={48} className="w-12 rounded-lg" alt="logo" />
        </Link>

        {user ?
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-end flex-row">
            <div ref={userSettingsRef}>
              <div onClick={() => setIsUserMenuOpen((curr) => !curr)}>
                <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <Image width={32} height={32} className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user && user.name}`} alt="" />
                </button>
              </div>
              {isUserMenuOpen ?
                <div className="absolute top-8 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <Link href="/Profile" className="block px-4 pb-2 pt-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>

                  {/* <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</Link> */}

                  <div onClick={logout} className="cursor-pointer block px-4 pt-2 pb-3 text-sm text-red-500 hover:bg-red-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</div>
                </div>
                :
                null}
            </div>
          </div>
          :
          <Link className="w-max absolute top-1/2 -translate-y-1/2 right-1" href="/Login">
            <div className="rounded-md bg-[#43c5f4] py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
              Login
            </div>
          </Link>}
      </div>
    )
  }
}

export default NavBar;
