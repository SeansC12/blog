import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <div className="bg-[#0e141b]">
          <NavBar />
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </>
  );
}

export default MyApp;
