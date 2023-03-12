import "../styles/globals.css";
import NavBar from "../components/NavBar";
import UserProvider from "../contexts/UserContext";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <div className="bg-[#0e141b] text-white">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}

export default MyApp;
