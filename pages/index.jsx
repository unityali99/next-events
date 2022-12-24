import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFeaturedEvents } from "../utils/dummy-data";

const EventsHomePage = (props) => {
  return (
    <React.Fragment>
      <Filter />
      <EventList events={props.events} />
    </React.Fragment>
  );
};

export default EventsHomePage;

export const getStaticProps = () => {
  console.log("revalidate");
  return {
    props: { events: getFeaturedEvents() },
    revalidate: 10,
  };
};
