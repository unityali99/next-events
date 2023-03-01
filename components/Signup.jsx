import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";
import Alert from "../components/Alert";
import { DANGER, SUCCESS } from "../utils/aliases";
import React, { useRef, useState } from "react";
import { registerUser } from "../utils/api";
import { isAxiosError } from "axios";
import Link from "next/link";
import LogoutFirst from "./LogoutFirst";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const btnRef = useRef();
  const { status: sessionStatus } = useSession();
  const [status, setStatus] = useState();
  const router = useRouter();

  const submitHandler = async (data) => {
    try {
      btnRef.current.disabled = true;
      const res = await registerUser(data);
      if (isAxiosError(res)) {
        if (res.response.status == 409)
          setStatus({
            error: true,
            message: res.response.data.message,
          });
        else
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
  };

  const alertWidth = { width: "90%" };

  if (sessionStatus === "authenticated") {
    router.push("/");
    return <LogoutFirst page="signup" />;
  }

  if (sessionStatus === "unauthenticated")
    return (
      <form
        className="container my-4 col-lg-4 col-md-6 col-sm-8 col-9 mt-5 bg-success p-5 rounded-4 bg-opacity-50 border border-2 border-primary border-opacity-25"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputNames1" className="form-label">
            Full Name
          </label>
          <input
            type="fullName"
            className="form-control"
            id="exampleInputFullName1"
            aria-describedby="fullNameHelp"
            {...register("fullName", {
              minLength: {
                value: 3,
                message: "Minimum length for full name is 3 characters.",
              },
              required: "Full name is required.",
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("email", {
              pattern: {
                value: emailPattern,
                message: "Please enter a valid email.",
              },
              required: "Email is required.",
            })}
          />
          <div id="emailHelp" className="form-text fw-bolder">
            Your email will not be shared with anyone.
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              {...register("password", {
                required: "Password is required.",

                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                  message:
                    "Password should be at least 8 characters containing a lowercase letter, an uppercase letter and a digit.",
                },
              })}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Save username and password
            </label>
          </div>
          <button
            ref={btnRef}
            type="submit"
            className="btn btn-primary col-sm-6  col-8 d-block mx-auto"
          >
            Submit
          </button>
          <h6 className="text-dark fw-semibold text-center my-4">
            {`Already a member ? `}
            <Link
              className="fw-bold link-primary text-decoration-none"
              href="/login"
            >
              {"Sign in"}
            </Link>
          </h6>
        </div>
        {errors.fullName && (
          <Alert
            dismissible={false}
            type={DANGER}
            message={errors.fullName.message}
            style={alertWidth}
          />
        )}
        {errors.email && (
          <Alert
            dismissible={false}
            type={DANGER}
            message={errors.email.message}
            style={alertWidth}
          />
        )}
        {errors.password && (
          <Alert
            dismissible={false}
            type={DANGER}
            message={errors.password.message}
            style={alertWidth}
          />
        )}
        {status?.error && (
          <Alert
            dismissible={true}
            type={DANGER}
            message={status.message}
            style={alertWidth}
          />
        )}
        {status && !status?.error && (
          <Alert
            dismissible={true}
            type={SUCCESS}
            message={status.message}
            style={alertWidth}
          />
        )}
      </form>
    );
}

export default Signup;
