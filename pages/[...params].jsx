import { useRouter } from "next/router";
import React, { useState } from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFilteredEvents } from "../utils/api";
import PlaceHolder from "../components/PlaceHolder";

const FilteredEventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState();
  const router = useRouter();

  const year = router.query.params[0];
  const month = router.query.params[1];
  console.log(params);
  setFilteredEvents(getFilteredEvents(year, month));
  const allEventsBtn = (
    <div className="text-center">
      <button onClick={() => router.replace("/")} className="btn btn-success">
        Show all events
      </button>
    </div>
  );
  if (filteredEvents) {
    if (filteredEvents.length === 0 || !filteredEvents)
      return (
        <React.Fragment>
          <Filter />
          {allEventsBtn}
          <div className="text-center mt-5 mx-auto alert alert-danger w-25">
            <h5>There are no events on the specified date</h5>
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Filter />
        {allEventsBtn}
        <EventList events={filteredEvents} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PlaceHolder shaped={true} />
      <PlaceHolder shaped={true} />
    </React.Fragment>
  );
};

export default FilteredEventsPage;
