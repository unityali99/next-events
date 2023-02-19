import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

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
        type="submit"
        className="btn btn-primary col-sm-6 col-8 d-block mx-auto"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
