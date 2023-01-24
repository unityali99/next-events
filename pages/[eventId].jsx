import Head from "next/head";
import React from "react";
import ReactPlaceholder from "react-placeholder/lib";
import Comments from "../components/Comments";
import Placeholder from "../components/PlaceHolder";
import SingleEvent from "../components/SingleEvent";
import { getEventById } from "../utils/api";

const SingleEventPage = ({ event, comments }) => {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content={`${event.title}: ${event.description}`}
        />
        <title>{event.title}</title>
      </Head>
      <ReactPlaceholder
        showLoadingAnimation={true}
        ready={event}
        customPlaceholder={<Placeholder />}
      >
        <SingleEvent event={event} />
        <Comments comments={comments} />
      </ReactPlaceholder>
    </React.Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: { event },
    notFound: event ? false : true,
  };
};

export default SingleEventPage;
