import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFeaturesEventsApi } from "../utils/dummy-data";

const EventsHomePage = (props) => {
  return (
    <React.Fragment>
      <Filter />
      <EventList events={props.events} />
    </React.Fragment>
  );
};

export default EventsHomePage;

export const getStaticProps = async () => {
  const events = await getFeaturesEventsApi();
  return {
    props: { events: events },
    revalidate: 10,
  };
};
