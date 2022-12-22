import { useRouter } from "next/router";
import ReactPlaceholder from "react-placeholder/lib";
import Placeholder from "../components/PlaceHolder";
import SingleEvent from "../components/SingleEvent";

const SingleEventPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={eventId}
      customPlaceholder={Placeholder}
    >
      <SingleEvent eventId={eventId} />
    </ReactPlaceholder>
  );
};

export default SingleEventPage;
