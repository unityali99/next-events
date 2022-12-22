import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { boxShadow } from "../utils/styles";

const Event = ({ event }) => {
  const eventDate = new Date(event.date);
  return (
    <div
      className="card m-3 border-light"
      style={{ ...boxShadow, width: "50rem" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <Image
            src={"/" + event.image}
            alt={event.title}
            width={1000}
            height={1000}
            className="img-fluid rounded-start w-100 h-100"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">{event.location}</p>
            <p className="card-text">
              {`Date: ${eventDate.toLocaleString("en-US")}`}
            </p>
            <div className="text-end">
              <Link
                href={`/${event.id}`}
                className="card-link btn btn-success btn-outline-warning text-light mx-4"
              >
                Explore Event
                <FontAwesomeIcon
                  className="mx-2 align-middle"
                  icon={faArrowRightLong}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
