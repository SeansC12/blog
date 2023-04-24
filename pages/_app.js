import { useState } from "react";
import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';


function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <>
      <div className="bg-[#0e141b] h-[100vh] text-white">
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
