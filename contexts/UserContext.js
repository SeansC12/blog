import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase';
import { query } from '../lib/db';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext)
}

export function user() {
  const [user, setUser] = useState();

  useEffect(() => {
    let isSubscribed = true;

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return
      }

      const res = await fetch("/api/getUserObject", {
        method: "PATCH",
        body: JSON.stringify({
          id: user.id
        })
      })
      const userObject = await res.json();

      if (isSubscribed) {
        setUser(userObject);
      }
    }

    fetchUser();

    return () => isSubscribed = false;
  }, [])

  return [user, setUser]
}

function UserProvider({ children }) {
  return (
    <UserContext.Provider value={[...user()]}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider