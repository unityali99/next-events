import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutFirst from "./LogoutFirst";
import { useRef, useState } from "react";
import Alert from "../components/Alert";
import { DANGER, SUCCESS } from "../utils/aliases";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { status: sessionStatus } = useSession();
  const loginBtnRef = useRef();
  const [signingIn, setSigningIn] = useState(false);
  const [status, setStatus] = useState();
  const alertWidth = { width: "90%" };

  const submitHandler = async ({ email, password }) => {
    loginBtnRef.current.disabled = true;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result.error) {
      if (result.status === 401)
        setStatus({ message: "Incorrect username or password.", error: true });
      else setStatus({ message: "An unexpected error occured.", error: true });
      loginBtnRef.current.disabled = false;
      return;
    }
    setSigningIn(true);
    setStatus({
      message:
        "Successfully logged in. Redirecting to you to the home page ....",
      error: false,
    });
    router.replace("/");
  };
  if (sessionStatus === "authenticated" && !signingIn) {
    router.push("/");
    return <LogoutFirst shouldLogin={false} page="login" />;
  }
  if (sessionStatus === "unauthenticated" || signingIn)
    return (
      <form
        className="container my-4 col-lg-4 col-md-6 col-sm-8 col-9 mt-5 bg-primary p-5 rounded-4 bg-opacity-50 border border-2 border-warning border-opacity-50"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="display-5 text-center p-3">Login</div>
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
            Remember username and password
          </label>
        </div>
        <button
          ref={loginBtnRef}
          type="submit"
          className="btn btn-primary col-sm-6 col-8 d-block mx-auto"
        >
          Login
        </button>
        <h6 className="text-dark fw-semibold text-center my-4">
          {`Don't have an account ? `}
          <Link
            className="fw-bold link-primary text-decoration-none"
            href="/signup"
          >
            {"Register "}
          </Link>
          now !
        </h6>
        {status?.error && (
          <Alert
            message={status.message}
            dismissible={false}
            type={DANGER}
            style={alertWidth}
          />
        )}
        {status && !status?.error && (
          <Alert
            message={status.message}
            dismissible={false}
            type={SUCCESS}
            style={alertWidth}
          />
        )}
        {errors?.email && (
          <Alert
            message={errors?.email.message}
            dismissible={false}
            type={DANGER}
            style={alertWidth}
          />
        )}
        {errors?.password && (
          <Alert
            message={errors?.password.message}
            dismissible={false}
            type={DANGER}
            style={alertWidth}
          />
        )}
      </form>
    );
};

export default Login;
