import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase';
import { query } from '../lib/db';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext)
}

function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user.id);

      const res = await fetch("/api/getUserObject", {
        method: "PATCH",
        body: JSON.stringify({
          id: user.id
        })
      })
      const userObject = res.json();
      console.log(userObject);
      setUser(userObject);
    }

    fetchUser();
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default UserProvider