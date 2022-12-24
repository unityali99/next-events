import EventList from "../../components/EventList";
import { getAllEvents } from "../../utils/dummy-data";

const allEventsPage = (props) => {
  return <EventList events={props.events} />;
};

export const getStaticProps = () => {
  return {
    props: { events: getAllEvents() },
    revalidate: 10,
  };
};

export default allEventsPage;
