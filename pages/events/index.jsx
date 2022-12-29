import EventList from "../../components/EventList";
import { getEventsApi } from "../../utils/dummy-data";

const allEventsPage = (props) => {
  return <EventList events={props.events} />;
};

export const getStaticProps = async () => {
  const events = await getEventsApi();
  return {
    props: { events: events },
    revalidate: 10,
  };
};

export default allEventsPage;
