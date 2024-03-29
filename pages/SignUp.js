import React, { useRef, useState } from 'react'
import logo from "./../public/logo.png";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ErrorBanner from '../components/ErrorBanner';
import SuccessBanner from "../components/SuccessBanner"

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const router = useRouter();
  const [error, setError] = useState();
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const supabaseClient = useSupabaseClient();

  async function signUpHandler(email, password, confirmPassword) {
    // Check if password equals the confirm password
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data: { user }, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error);
      return;
    }

    // Update my MySQL database
    await fetch("/api/signup", {
      method: "PATCH",
      body: JSON.stringify({
        user: user
      })
    })

    setIsAccountCreated(true);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full p-5 sm:p-10 flex items-center justify-center flex-col">

        {error ?
          <ErrorBanner errorMessage={error} />
          : null}

        {isAccountCreated ?
          <SuccessBanner successMessage={"Your account has been successfully created. A verification email has been sent to you."} />
          : null}
        <div className="flex items-center mb-6 text-base sm:text-lg md:text-2xl font-semibold text-gray-900 dark:text-black">
          <Image width={40} height={40} className="w-10 sm:w-12 aspect-square rounded-lg mr-2" src={logo} alt="logo" />
          It is great to meet you!
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create your account
            </h1>
            {/* <form className="space-y-4 md:space-y-6"> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
              <input ref={usernameRef} autoComplete="on" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
              <input ref={passwordRef} autoComplete="on" type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm your password</label>
              <input ref={passwordConfirmRef} autoComplete="on" type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <button onClick={() => signUpHandler(usernameRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value)} type="submit" className="w-full text-white bg-[#2563eb] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login