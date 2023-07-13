import '../styles/global.css';
import { CookiesProvider } from 'react-cookie';
import './logindesign.css'; 

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}