import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../Redux/store";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <React.Fragment>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
    </Provider>
  );
}
export default MyApp;
