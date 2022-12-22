import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFeaturedEvents } from "../utils/dummy-data";

const EventsHomePage = () => {
  const events = getFeaturedEvents();
  return (
    <React.Fragment>
      <Filter />
      <EventList events={events} />
    </React.Fragment>
  );
};

export default EventsHomePage;
