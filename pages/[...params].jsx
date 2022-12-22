import { useRouter } from "next/router";
import React from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import NotFound from "../components/NotFound";
import { getFilteredEvents } from "../utils/dummy-data";
import PlaceHolder from "../components/PlaceHolder";

const FilteredEventsPage = () => {
  const router = useRouter();
  if (router.query.params) {
    const params = router.query.params;
    const year = Number(params[0]);
    const month = Number(params[1]);
    if (isNaN(year) || isNaN(month)) return <NotFound />;
    const filteredEvents = getFilteredEvents({ year, month });

    if (filteredEvents.length === 0 || !filteredEvents)
      return (
        <React.Fragment>
          <Filter />
          <div className="text-center mt-5 mx-auto alert alert-danger w-25">
            <h5>There are no events specified date</h5>
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Filter />
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
