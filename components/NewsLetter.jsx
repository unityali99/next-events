import React from "react";
import { useRef, useState } from "react";
import { saveUser } from "../utils/api";
import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";
import Alert from "./Alert";

function NewsLetter() {
  const btnRef = useRef();
  const [status, setStatus] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitRegistration({ email }) {
    try {
      const response = await saveUser(email);
      btnRef.current.disabled = true;
      setStatus({ error: false, message: response.data.message });
    } catch (err) {
      setStatus({ error: true, message: err.message });
    }
  }
  return (
    <React.Fragment>
      <div className="container text-center flex flex-column my-5">
        <h4 className="col-10 mx-auto my-4 display-4 text-dark">
          Join the newsletter now !
        </h4>
        <div
          onSubmit={handleSubmit(submitRegistration)}
          className="col-10 col-sm-8 col-md-5 col-lg-6 bg-info d-flex flex-row flex-wrap align-items-baseline justify-content-center mx-auto p-4 rounded-2"
        >
          <div className="col-12 col-md-12 col-lg-5">
            <input
              {...register("email", {
                required: "Email is required for registration",
                pattern: {
                  value: emailPattern,
                  message: "Please provide a valid email address",
                },
              })}
              name="email"
              type="email"
              placeholder="Your Email"
              className="form-control mb-1"
              aria-label="Email"
              aria-describedby="inputGroup-sizing-default"
            />
          </div>

          <button
            disabled={errors.email}
            onClick={handleSubmit(submitRegistration)}
            ref={btnRef}
            className="mx-2 mt-1 btn btn-success col-6 col-md-10 col-lg-3"
          >
            {"Register"}
          </button>
        </div>
      </div>
      {status && !status?.error && (
        <Alert
          message="Registration Completed"
          className="col-9 col-sm-6 col-md-5 col-lg-3 alert alert-success alert-dismissible fade show col-3 mx-auto"
          dismissible={true}
          style={{ backgroundColor: "rgba(0,252,25,.6)" }}
        />
      )}
      {status && status?.error && (
        <Alert
          message="Registration Failed"
          className="col-8 col-sm-6 col-md-5 col-lg-3 alert alert-danger alert-dismissible fade show col-3 mx-auto"
          dismissible={true}
        />
      )}
      {errors.email && (
        <Alert
          message={errors.email.message}
          className="col-9 col-sm-6 col-md-5 col-lg-3 alert alert-danger fade show col-3 mx-auto text-center"
          dismissible={false}
        />
      )}
    </React.Fragment>
  );
}

export default NewsLetter;
