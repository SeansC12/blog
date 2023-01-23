import React, { useRef, useState } from "react";
import useScroll from "../hooks/useScroll";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import logo from "./../public/logo.png";
import useOutsideClickAlerter from "../hooks/useOutsideClickAlerter";

function NavBar() {
  const isVisible = useScroll();
  const { user, error, isLoading } = useUser();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userSettingsRef = useRef();

  useOutsideClickAlerter(() => {
    setIsUserMenuOpen(false)
  }, userSettingsRef);

  return (
    <div
      className={`sticky bg-[#0e141b] text-white border-b-[1px] mb-4 border-b-gray-800 h-16 top-0 flex items-center justify-between ${isVisible ? "top-0" : "-top-16"
        } transition-all duration-500`}
    >
      <Image src={logo} className="w-12 ml-5" />
      {user ?
        <div class="hidden md:block mr-5" ref={userSettingsRef}>
          <div class="ml-4 flex items-center md:ml-6">
            {/* <!-- Profile dropdown --> */}
            <div class="relative ml-3">
              <div onClick={() => setIsUserMenuOpen((curr) => !curr)}>
                <button type="button" class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>
              {isUserMenuOpen ?

                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" class="block px-4 pb-2 pt-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

                  <a href="/api/auth/logout" class="block px-4 pt-2 pb-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</a>
                </div>
                :
                null}

            </div>
          </div>
        </div>
        :
        <div className="rounded-md bg-orange-400 py-[0.35rem] px-4 text-black font-lato mr-5 hover:scale-105 transition-all ease-in cursor-pointer select-none">
          <a href="/api/auth/login">Login</a>
        </div>}
    </div>
  );
}

export default NavBar;
