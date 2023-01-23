import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFilteredEvents } from "../utils/api";
import PlaceHolder from "../components/PlaceHolder";
import NotFound from "../components/NotFound";
import Head from "next/head";

const FilteredEventsPage = () => {
  const [filteredEvents, setFilteredEvents] = useState();
  const router = useRouter();
  const HeadData = () => (
    <Head>
      <title>Filtered Events</title>
    </Head>
  );
  const allEventsBtn = useMemo(
    () => (
      <div className="text-center">
        <button onClick={() => router.replace("/")} className="btn btn-success">
          Show all events
        </button>
      </div>
    ),
    [router]
  );
  useEffect(() => {
    if (router.query.params) {
      const params = router.query.params;
      const year = Number(params[0]);
      const month = Number(params[1]);
      if (isNaN(year) || isNaN(month)) return <NotFound />;
      getFilteredEvents(year, month).then((events) =>
        setFilteredEvents(events)
      );
    }
  }, [router.query.params]);

  if (filteredEvents) {
    if (filteredEvents.length === 0 || !filteredEvents)
      return (
        <React.Fragment>
          <HeadData />
          <Filter />
          {allEventsBtn}
          <div className="text-center mt-5 mx-auto alert alert-danger w-25">
            <h5>There are no events on the specified date</h5>
          </div>
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <HeadData />
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
