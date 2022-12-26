import ReactPlaceholder from "react-placeholder/lib";
import Placeholder from "../components/PlaceHolder";
import SingleEvent from "../components/SingleEvent";
import { getEventById } from "../utils/dummy-data";

const SingleEventPage = ({ event }) => {
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={event}
      customPlaceholder={<Placeholder />}
    >
      <SingleEvent event={event} />
    </ReactPlaceholder>
  );
};

export const getServerSideProps = async (context) => {
  const eventId = context.params.eventId;

  const event = getEventById(eventId);

  return {
    props: { event },
    notFound: event ? false : true,
  };
};

export default SingleEventPage;
