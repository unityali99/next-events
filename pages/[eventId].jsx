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

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { eventId: "e1" } },
      { params: { eventId: "e2" } },
      { params: { eventId: "e3" } },
    ],
    fallback: false,
  };
};

export const getStaticProps = (context) => {
  const event = getEventById(context.params.eventId);

  return {
    props: { event },
  };
};

export default SingleEventPage;
