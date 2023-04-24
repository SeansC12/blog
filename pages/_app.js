import { useState } from "react";
import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <>
      <div className="bg-white h-[100vh] text-black">
        <SessionContextProvider
          supabaseClient={supabaseClient}
          initialSession={pageProps.initialSession}
        >
          <NavBar />
          <Component {...pageProps} />
        </SessionContextProvider>
      </div>
    </>
  );
}

export default MyApp;
