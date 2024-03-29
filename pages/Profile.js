import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

function Profile() {
  const [changesMade, setChangesMade] = useState(false);
  const nameRef = useRef();
  const [user, setUser] = useState();
  const [supabaseUser, setSupabaseUser] = useState();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      // Supabase user
      const { data: { user } } = await supabaseClient.auth.getUser();
      setSupabaseUser(user);

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

  const handleNameChange = () => {
    if (nameRef.current.value === user.name) {
      // No change
      setChangesMade(false);
      return
    }

    setChangesMade(true);
  }

  const handleSubmit = () => {
    // Update SQL database
    (async () => {
      await fetch("/api/patchName", {
        method: "PATCH",
        body: JSON.stringify({
          name: nameRef.current.value,
          userID: user.person_id
        })
      })
    })()

    router.push("/")
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="px-10 flex justify-center items-center text-black">
        <div className="flex gap-5 items-center justify-center">
          <Image width={96} height={96} src={`https://ui-avatars.com/api/?name=${user && user.name}`} alt="profile picture" className="rounded-full w-24 aspect-square" />
          <div className="flex flex-col">
            <div className="font-lato">Name</div>
            <input onChange={handleNameChange} ref={nameRef} type="text" defaultValue={user ? user.name : ""} className="text-black w-full rounded-md border-2 px-2 py-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"></input>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className={`mt-10 py-2 px-3 ${changesMade ? "bg-red-500 hover:bg-red-400" : "bg-slate-400"} text-black w-fit text-sm font-semibold rounded-md shadow focus:outline-none`}>Save changes</button>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/Login',
        permanent: false,
      },
    }
  }

  return { props: {} }
}

export default Profile;