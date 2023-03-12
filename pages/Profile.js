import React, { useRef, useState } from 'react'
import { useUser } from '../contexts/UserContext';

function Profile() {
  const [user] = useUser();
  const [changesMade, setChangesMade] = useState(false);
  const nameRef = useRef();

  const handleNameChange = () => {
    if (nameRef.current.value === user.name) {
      // No change
      setChangesMade(false);
      return
    }

    setChangesMade(true);
  }

  const handleSubmit = async () => {
    // Update SQL database
    await fetch("/api/patchName", {
      method: "PATCH",
      body: JSON.stringify({
        name: nameRef.current.value,
        userID: user.id
      })
    })
  }

  console.log(user);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="px-10 flex justify-center items-center text-white">
        <div className="flex gap-5 items-center justify-center">
          <img src={user && user.picture} className="rounded-full w-24 aspect-square" />
          <div className="flex flex-col">
            <div className="font-lato">Name</div>
            <input onChange={handleNameChange} ref={nameRef} type="text" defaultValue={user ? user.name : ""} className="text-black w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"></input>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className={`mt-10 py-2 px-3 ${changesMade ? "bg-red-500" : "bg-slate-400"} text-white w-fit text-sm font-semibold rounded-md shadow focus:outline-none`}>Save changes</button>
    </div>
  );
}

export default Profile;