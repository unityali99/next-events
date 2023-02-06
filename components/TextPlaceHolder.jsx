import React from "react";
import { TextRow } from "react-placeholder/lib/placeholders";

const TextPlaceHolder = () => (
  <React.Fragment>
    <div className="py-3 w-75 mx-auto">
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
    </div>
    <div className="py-3 w-75 mx-auto">
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
    </div>
    <div className="py-3 w-75 mx-auto">
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
      <TextRow color="gray" className="w-75 mx-auto " />
    </div>
  </React.Fragment>
);

export default TextPlaceHolder;
