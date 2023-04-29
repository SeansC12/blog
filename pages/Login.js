import React, { useRef, useState } from 'react'
import logo from "./../public/logo.png";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import ErrorBanner from '../components/ErrorBanner';
import Link from "next/link";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const router = useRouter();
  const [error, setError] = useState();
  const supabaseClient = useSupabaseClient();

  async function loginHandler(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.reload();
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="w-full p-10 flex items-center justify-center flex-col">
        {error ?
          <ErrorBanner errorMessage={error} />
          : null}
        <div className="flex items-center mb-6 text-lg md:text-2xl font-semibold text-gray-900 dark:text-black">
          <Image className="w-12 aspect-square rounded-lg mr-2" src={logo} alt="logo" />
          yoooo
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Sign in to your account
            </h1>
            {/* <form className="space-y-4 md:space-y-6"> */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
              <input ref={usernameRef} autoComplete="on" type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
              <input ref={passwordRef} autoComplete="on" type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
              </div>
              <Link href="#" className="text-sm font-medium hover:underline">Forgot password?</Link>
            </div>
            <button onClick={() => loginHandler(usernameRef.current.value, passwordRef.current.value)} type="submit" className="w-full text-white bg-[#2563eb] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            <p className="text-sm font-light text-gray-800">
              Don’t have an account yet? <Link href="/SignUp" className="font-medium hover:underline">Sign up</Link>
            </p>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default Login