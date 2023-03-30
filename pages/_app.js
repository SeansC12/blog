import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [callbackFunctionForBlog, setCallbackFunctionForBlog] = useState(() => () => { });
  return (
    <>
      {/* <UserProvider> */}
      <div className="bg-[#0e141b] text-white">
        <NavBar />
        <Component {...pageProps} />
      </div>
      {/* </UserProvider> */}
    </>
  );
}

export default MyApp;
