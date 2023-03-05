import { useForm } from "react-hook-form";
import { passwordPattern } from "../utils/pattern";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LogoutFirst from "./LogoutFirst";
import { useRef, useState } from "react";
import Alert from "./Alert";
import { DANGER, SUCCESS } from "../utils/aliases";

const ResetPass = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { status: sessionStatus } = useSession();
  const loginBtnRef = useRef();
  const [status, setStatus] = useState();
  const newPassword = watch("newPassword");

  const alertWidth = { width: "90%" };

  const submitHandler = async ({
    oldPassword,
    newPassword,
    newPasswordRepeat,
  }) => {};
  if (sessionStatus === "unauthenticated") {
    router.push("/");
    return <LogoutFirst page="reset your password" shouldLogin={true} />;
  }
  if (sessionStatus === "authenticated")
    return (
      <form
        className="container my-4 col-lg-4 col-md-6 col-sm-8 col-9 mt-5 bg-primary p-5 rounded-4 bg-opacity-50 border border-2 border-warning border-opacity-50"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Old password:
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            {...register("oldPassword", {
              required: "Password is required.",
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            New password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            {...register("newPassword", {
              required: "Password is required.",
              pattern: {
                value: passwordPattern,
                message:
                  "Password should be at least 8 characters containing a lowercase letter, an uppercase letter and a digit.",
              },
            })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Repeat new password
          </label>
          <input
            type="repeatPassword"
            className="form-control"
            id="exampleInputPassword1"
            {...register("repeatPassword", {
              required: "Password is required.",
              validate: (current) => {
                return current === newPassword || "Passwords does not match";
              },
            })}
          />
        </div>
        <button
          ref={loginBtnRef}
          type="submit"
          className="btn btn-primary col-sm-6 col-8 d-block mx-auto"
        >
          Change password
        </button>
        {status?.error && (
          <Alert
            message={status.message}
            dismissible={true}
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
        {errors?.newPassword && (
          <Alert
            message={errors?.newPassword.message}
            dismissible={false}
            type={DANGER}
            style={alertWidth}
          />
        )}
        {errors?.repeatPassword && (
          <Alert
            message={errors?.repeatPassword.message}
            dismissible={false}
            type={DANGER}
            style={alertWidth}
          />
        )}
      </form>
    );
};

export default ResetPass;
