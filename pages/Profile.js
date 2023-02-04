import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

function Profile() {
  const { user, error, isLoading } = useUser();
  console.log(user + "hi");
  return (
    <div className="px-10 flex justify-center items-center text-white">
      <div className="flex gap-5 items-center justify-center">
        <img src={user && user.picture} className="rounded-full w-24 aspect-square" />
        <input type="text" defaultValue={user && user.nickname} className="text-black w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"></input>
      </div>
    </div>
  );
}

export default Profile;