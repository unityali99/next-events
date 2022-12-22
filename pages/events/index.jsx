import EventList from "../../components/EventList";
import { getAllEvents } from "../../utils/dummy-data";

const allEventsPage = () => {
  const events = getAllEvents();
  return <EventList events={events} />;
};

export default allEventsPage;
