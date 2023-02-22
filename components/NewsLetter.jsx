import React from "react";
import { useRef, useState } from "react";
import { saveUser } from "../utils/api";
import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";
import dynamic from "next/dynamic";
import { DANGER, SUCCESS } from "../utils/aliases";
import { isAxiosError } from "axios";

const Alert = dynamic(() => import("./Alert"));

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
      btnRef.current.disabled = true;
      const res = await saveUser(email);
      if (isAxiosError(res)) {
        setStatus({
          error: true,
          message: `Network Error (${res.response.status}). Please Contact administrator`,
        });
        btnRef.current.disabled = false;
        return;
      }

      setStatus({ error: false, message: res.data.message });
    } catch (err) {
      btnRef.current.disabled = false;
      setStatus({ error: true, message: "An unexpected error occured" });
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
          message={status.message}
          type={SUCCESS}
          dismissible={true}
          style={{ backgroundColor: "rgba(0,252,25,.6)" }}
        />
      )}
      {status && status?.error && (
        <Alert message={status.message} type={DANGER} dismissible={true} />
      )}
      {errors.email && (
        <Alert
          message={errors.email.message}
          type={DANGER}
          dismissible={false}
        />
      )}
    </React.Fragment>
  );
}

export default NewsLetter;
