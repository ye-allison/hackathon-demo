import "../styles/style.css";
import { UserProvider } from "../contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
