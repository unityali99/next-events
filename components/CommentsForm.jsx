import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DANGER, SUCCESS } from "../utils/aliases";
import { saveComment } from "../utils/api";
import { emailPattern } from "../utils/pattern";

const Alert = dynamic(() => import("./Alert"));

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
    <React.Fragment>
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
          type={DANGER}
          dismissible={false}
        />
      )}
      {errors.email && (
        <Alert
          message={errors.email.message}
          type={DANGER}
          dismissible={false}
        />
      )}
      {errors.comment && (
        <Alert
          type={DANGER}
          message={errors.comment.message}
          dismissible={false}
        />
      )}
      {status && !status?.error && (
        <Alert
          style={{ backgroundColor: "rgba(0,252,25,.6)" }}
          message="Comment submitted successfully"
          type={SUCCESS}
          dismissible={true}
        />
      )}
      {status && status?.error && (
        <Alert
          type={DANGER}
          message="Comment submission failed"
          dismissible={true}
        />
      )}
    </React.Fragment>
  );
}

export default CommentsForm;
