import Head from "next/head";
import React from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/filter.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="Nextjs events for you." />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <React.StrictMode>
          <Component {...pageProps} />
        </React.StrictMode>
      </Layout>
    </SessionProvider>
  );
}
