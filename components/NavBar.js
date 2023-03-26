import React, { useRef, useEffect, useState } from "react";
import useScroll from "../hooks/useScroll";
import { useUser } from "../contexts/UserContext";
import Image from "next/image";
import logo from "./../public/logo.png";
import useOutsideClickAlerter from "../hooks/useOutsideClickAlerter";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";

function NavBar() {
  const isVisible = useScroll();
  // const [user] = useUser();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userSettingsRef = useRef();
  const [user, setUser] = useState({});
  const router = useRouter();

  useOutsideClickAlerter(() => {
    setIsUserMenuOpen(false)
  }, userSettingsRef);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error);
    }

    router.push("/")
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      // const user = await res.json();

      setUser(user);
    }

    getUser();
  }, [])

  useEffect(() => {
    console.log(user);
  }, [user])


  return (
    <div
      className={`sticky bg-[#0e141b] text-white border-b-[1px] mb-4 border-b-gray-800 h-16 top-0 flex items-center justify-between ${isVisible ? "top-0" : "-top-16"
        } transition-all duration-500`}
    >
      <a href="/">
        <Image src={logo} className="w-12 ml-5" alt="logo" />
      </a>
      {user ?
        <div className="hidden md:block mr-5" ref={userSettingsRef}>
          <div className="ml-4 flex items-center md:ml-6">
            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3">
              <div onClick={() => setIsUserMenuOpen((curr) => !curr)}>
                <button type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user && user.picture} alt="" />
                </button>
              </div>
              {isUserMenuOpen ?

                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="/Profile" className="block px-4 pb-2 pt-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                  {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a> */}

                  <div onClick={logout} className="block px-4 pt-2 pb-3 text-sm text-red-500 hover:bg-red-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</div>
                </div>
                :
                null}

            </div>
          </div>
        </div>
        :
        <a href="/Login">
          <div className="rounded-md bg-[#43c5f4] py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
            Login
          </div>
        </a>}
    </div>
  );
}

export default NavBar;
