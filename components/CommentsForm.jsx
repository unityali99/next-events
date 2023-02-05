import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { saveComment } from "../utils/api";
import { emailPattern } from "../utils/pattern";
import Alert from "./Alert";

function CommentsForm({ eventId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const btnRef = useRef();

  const [status, setStatus] = useState();

  async function onSubmit(data) {
    try {
      const response = await saveComment(
        eventId,
        data.fullName,
        data.email,
        data.comment
      );
      btnRef.current.disabled = true;
      setStatus({ error: false, message: response.data.message });
    } catch (err) {
      setStatus({ error: true, message: err.message });
    }
  }

  return (
    <div style={{ backgroundColor: "#9FE2BF" }}>
      <div className="col-8 col-sm-7 col-md-6 col-lg-5 mx-auto row justify-content-center py-4">
        <div className="col-12 col-sm-6 mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Full Name:
          </label>
          <input
            type="name"
            className="form-control"
            {...register("fullName", {
              required: "Full Name is required",
              minLength: { value: 3, message: "Please enter your full name" },
            })}
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-12 col-sm-6 mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: emailPattern,
                message: "Please provide a valid email",
              },
            })}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div className="col-12 col-sm-10 col-md-9 mb-3">
          <label for="exampleFormControlTextarea1" className="form-label">
            Comment:
          </label>
          <textarea
            {...register("comment", {
              required: "Comment section is required",
              minLength: {
                value: 3,
                message: "Minimum character for comments is 3",
              },
              maxLength: {
                value: 50,
                message: "Maximum characters for comments is 50",
              },
            })}
            style={{ resize: "none" }}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          />
        </div>
        <div className="row">
          <button
            ref={btnRef}
            className="col-6 col-sm-5 col-md-4 col-lg-3 btn btn-primary border border-info mx-auto"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </div>
      {errors.fullName && (
        <Alert
          message={errors.fullName.message}
          className="col-10 col-sm-7 m-0 mt-3 col-md-6 col-lg-3 alert alert-danger mx-auto text-center"
          dismissible={false}
        />
      )}
      {errors.email && (
        <Alert
          message={errors.email.message}
          className="col-10 col-sm-7 m-0 mt-3 col-md-6 col-lg-3 alert alert-danger col-3 mx-auto text-center"
          dismissible={false}
        />
      )}
      {errors.comment && (
        <Alert
          message={errors.comment.message}
          className="col-10 col-sm-7 m-0 mt-3 col-md-6 col-lg-3 alert alert-danger col-3 mx-auto text-center"
          dismissible={false}
        />
      )}
      {status && !status?.error && (
        <Alert
          style={{ backgroundColor: "rgba(0,252,25,.6)" }}
          message="Comment submitted successfully"
          className="col-10 col-sm-7 col-md-6 col-lg-3 alert alert-success alert-dismissible fade show col-3 mx-auto text-center m-0"
          dismissible={true}
        />
      )}
      {status && status?.error && (
        <Alert
          message="Comment submission failed"
          className="col-10 col-sm-7 col-md-6 col-lg-3 alert alert-danger alert-dismissible fade show col-3 mx-auto text-center"
          dismissible={true}
        />
      )}
    </div>
  );
}

export default CommentsForm;
