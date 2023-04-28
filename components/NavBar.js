import React, { useRef, useEffect, useState } from "react";
import useScroll from "../hooks/useScroll";
import Image from "next/image";
import logo from "./../public/logo.png";
import useOutsideClickAlerter from "../hooks/useOutsideClickAlerter";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

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

  return (
    <div
      className={`sticky z-50 bg-white text-black border-b-[1px] mb-4 border-b-white shadow-md h-16 top-0 flex items-center justify-between ${isVisible ? "top-0" : "-top-16"
        } transition-all duration-500`}
    >
      <Link href="/">
        <Image src={logo} className="w-12 ml-5 rounded-lg" alt="logo" />
      </Link>
      {user ?
        <div className="hidden md:block mr-5" ref={userSettingsRef}>
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
                  <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user && user.name}`} alt="" />
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
}

export default NavBar;
