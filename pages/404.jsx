import Head from "next/head";
import React from "react";
import NotFound from "../components/NotFound";

const NotFoundPage = () => (
  <React.Fragment>
    <Head>
      <title>{"404"}</title>
    </Head>
    <NotFound />
  </React.Fragment>
);

export default NotFoundPage;
