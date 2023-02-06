import Head from "next/head";
import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFeaturedEvents } from "../utils/api";
import NewsLetter from "../components/NewsLetter";
import dynamic from "next/dynamic";

const NetworkError = dynamic(() => import("../components/NetworkError"));

const EventsHomePage = ({ events }) => {
  return (
    <React.Fragment>
      <Filter />
      <Head>
        <meta name="description" content="Ongoing and future events by next." />
      </Head>
      <NewsLetter />
      {events ? <EventList events={events} /> : <NetworkError />}
    </React.Fragment>
  );
};

export default EventsHomePage;

export const getStaticProps = async () => {
  const events = await getFeaturedEvents();
  return {
    props: { events: events },
    revalidate: 1800,
  };
};
