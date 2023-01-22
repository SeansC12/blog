import "../styles/globals.css";
import NavBar from "../components/NavBar";
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <NavBar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
