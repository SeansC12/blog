import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <UserProvider> */}
      <div className="bg-[#0e141b] h-[100vh] text-white">
        <NavBar />
        <Component {...pageProps} />
      </div>
      {/* </UserProvider> */}
    </>
  );
}

export default MyApp;
