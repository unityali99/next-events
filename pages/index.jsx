import Head from "next/head";
import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFeaturesEvents } from "../utils/api";

const EventsHomePage = (props) => {
  return (
    <React.Fragment>
      <Filter />
      <Head>
        <meta name="description" content="Ongoing and future events by next." />
        <title>{"Next Events"}</title>
      </Head>
      <EventList events={props.events} />
    </React.Fragment>
  );
};

export default EventsHomePage;

export const getStaticProps = async () => {
  const events = await getFeaturesEvents();
  return {
    props: { events: events },
    revalidate: 1800,
  };
};
