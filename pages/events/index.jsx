import Head from "next/head";
import React, { useEffect, useState } from "react";
import EventList from "../../components/EventList";
import NetworkError from "../../components/NetworkError";
import { getAllEvents } from "../../utils/api";

const AllEventsPage = (prop) => {
  const [events, setEvent] = useState();

  useEffect(() => setEvent(prop.events), [prop.events]);
  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="All of the events including old ones."
        />
        <title>{"All Events"}</title>
      </Head>
      {events ? <EventList events={events} /> : <NetworkError />}
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const response = await getAllEvents();
  const events = JSON.stringify(response);

  return {
    props: { events: events },
    revalidate: 1800,
  };
};

export default AllEventsPage;
