import { useForm } from "react-hook-form";
import { passwordPattern } from "../utils/pattern";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LogoutFirst from "./LogoutFirst";
import { useRef, useState } from "react";
import Alert from "./Alert";
import { DANGER, SUCCESS } from "../utils/aliases";
import { resetPass } from "../utils/api";
import { isAxiosError } from "axios";

const ResetPass = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { data: session, status: sessionStatus } = useSession();
  const [status, setStatus] = useState();
  const btnRef = useRef();
  const newPassword = watch("newPassword");

  const alertWidth = { width: "90%" };

  const submitHandler = async ({ oldPassword, newPassword }) => {
    try {
      btnRef.current.disabled = true;
      const res = await resetPass(session.user.email, oldPassword, newPassword);
      if (isAxiosError(res)) {
        if (res.response.status == 401) {
          setStatus({ error: true, message: res.response.data.message });
        } else
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
        <div className="display-6 text-center my-4 text-nowrap">
          Reset Password
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Current password:
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
            type="password"
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
          ref={btnRef}
          type="submit"
          className="btn btn-primary col-9 col-sm-7 col-lg-8 col-xl-6 d-block mx-auto text-nowrap"
        >
          Change password
        </button>
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
