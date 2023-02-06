import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { getFilteredEvents } from "../utils/api";
import PlaceHolder from "../components/PlaceHolder";
import NotFound from "../components/NotFound";
import Head from "next/head";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("./../components/Alert"));

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
          <Alert
            className="alert alert-danger mx-auto col-7 col-sm-5 col-md-4 col-lg-3 text-center mt-5"
            message="There are no events on the specified date"
            dismissible={false}
          />
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
