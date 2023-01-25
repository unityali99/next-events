import React from "react";

function Comments({ comments }) {
  return (
    <div style={{ backgroundColor: "#9FE2BF" }}>
      <div className="col-5 mx-auto row justify-content-center py-4">
        <div className="col-5 mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Full Name:
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-5 mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-12  mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Comment:
          </label>
          <textarea
            style={{ resize: "none" }}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button className="col-3 btn btn-primary border border-info">
          Submit
        </button>
      </div>
      <div className="row col-7 mx-auto my-4">
        <div className="bg-gradient rounded-3 border border-success border-opacity-25 border-2 px-4 py-3 my-3 text-wrap ">
          <p className="fw-semibold">
            {"This event is needed for people with thoughts .........."}
          </p>
          <span className="float-end text-muted">
            <i>By Ali Ahmadi</i>
          </span>
        </div>
        <div className="bg-gradient rounded-3 border border-success border-opacity-25 border-2 px-4 py-3 my-3 text-wrap ">
          <p className="fw-semibold">
            {"This event is needed for people with thoughts .........."}
          </p>
          <span className="float-end text-muted">
            <i>By Ali Ahmadi</i>
          </span>
        </div>
        <div className="bg-gradient rounded-3 border border-success border-opacity-25 border-2 px-4 py-3 my-3 text-wrap ">
          <p className="fw-semibold">
            {"This event is needed for people with thoughts .........."}
          </p>
          <span className="float-end text-muted">
            <i>By Ali Ahmadi</i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comments;
