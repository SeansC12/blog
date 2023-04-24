import React, { useRef, useState } from 'react'
import logo from "./../public/logo.png";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const router = useRouter();
  const [error, setError] = useState();
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

    console.log(user)

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

    router.push("/");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        {error ?
          <div className="text-red-500">{error}</div>
          : null}
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-black">
          <Image className="w-8 h-8 mr-2" src={logo} alt="logo" />
          yoooo
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Create your account
            </h1>
            {/* <form className="space-y-4 md:space-y-6"> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
              <input ref={usernameRef} autoComplete="on" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
              <input ref={passwordRef} autoComplete="on" type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Confirm your password</label>
              <input ref={passwordConfirmRef} autoComplete="on" type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <button onClick={() => signUpHandler(usernameRef.current.value, passwordRef.current.value, passwordConfirmRef.current.value)} type="submit" className="w-full text-black bg-[#2563eb] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login