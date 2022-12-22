import React from "react";
import EventItem from "./EventItem";

const EventList = ({ events }) => {
  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {events.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;
