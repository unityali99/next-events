import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import LogoutFirst from "./LogoutFirst";
import { useRef, useState } from "react";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { status } = useSession();
  const loginBtnRef = useRef();
  const [signingIn, setSigningIn] = useState(false);

  const submitHandler = async ({ email, password }) => {
    loginBtnRef.current.disabled = true;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setSigningIn(true);
    router.replace("/");
  };
  if (status === "authenticated" && !signingIn) {
    router.push("/");
    return <LogoutFirst page="login" />;
  }
  if (status === "unauthenticated" || signingIn)
    return (
      <form
        className="container my-4 col-lg-4 col-md-6 col-sm-8 col-9 mt-5 bg-primary p-5 rounded-4 bg-opacity-50 border border-2 border-warning border-opacity-50"
        onSubmit={handleSubmit(submitHandler)}
      >
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
      </form>
    );
};

export default Login;
