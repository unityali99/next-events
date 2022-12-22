import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { getEventById } from "../utils/dummy-data";
import {
  faCalendarWeek,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import NotFound from "./NotFound";
import { smallText } from "../utils/styles";

const SingleEvent = ({ eventId }) => {
  const event = getEventById(eventId);
  if (event) {
    const date = new Date(event.date);
    return (
      <div className="w-100 h-100 position-absolute" s>
        <div
          className="text-center py-4"
          style={{
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 47%, rgba(83,219,203,1) 71%, rgba(40,222,205,1) 86%)",
          }}
        >
          <h2 className="display-2 text-dark">{event.title}</h2>
        </div>
        <div
          style={{
            background:
              "radial-gradient(circle, rgba(132,166,228,0.5) 0%, rgba(235,126,43,0.9) 93%)  ",
            fontFamily: "sans-serif",
          }}
        >
          <div className="text-center">
            <Image
              width={1000}
              height={500}
              alt={event.title}
              src={"/" + event.image}
              style={{
                width: "45%",
                height: "45%",
                zIndex: "10",
                transform: `translate(0,-1.15rem)`,
                borderRadius: "1rem",
              }}
              className="mx-auto"
            />
          </div>
          <h5 className="py-3 w-50 mx-auto" style={{ textIndent: "20px" }}>
            {event.description}
          </h5>
          <div className="text-center py-3">
            <div className="d-inline-block mx-4">
              <p style={smallText}>
                <FontAwesomeIcon
                  color="#5A5A5A"
                  icon={faCalendarWeek}
                  className="mx-2"
                />
                Date: {date.toLocaleDateString()}
              </p>
            </div>
            <div className="d-inline-block mx-4">
              <p style={smallText}>
                <FontAwesomeIcon
                  color="#5A5A5A"
                  icon={faLocationPin}
                  className="mx-2"
                />
                Address: {event.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <NotFound />;
};

export default SingleEvent;
