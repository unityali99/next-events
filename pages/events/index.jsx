import Head from "next/head";
import React from "react";
import EventList from "../../components/EventList";
import { getAllEvents } from "../../utils/api";

const allEventsPage = (props) => {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="All of the events including old ones."
        />
        <title>{"All Events"}</title>
      </Head>
      <EventList events={props.events} />
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: { events: events },
    revalidate: 1800,
  };
};

export default allEventsPage;
