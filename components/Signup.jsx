import { useForm } from "react-hook-form";
import { emailPattern } from "../utils/pattern";

function Signup() {
  const { handleSubmit, register } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <form
      className="container my-5 col-lg-4 bg-success p-5 rounded-4 bg-opacity-50"
      onSubmit={handleSubmit}
    >
      <div class="mb-3">
        <label for="exampleInputNames1" class="form-label">
          Full Name
        </label>
        <input
          type="fullName"
          class="form-control"
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
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          {...register("email", {
            pattern: {
              value: emailPattern,
              message: "Please enter a valid email.",
            },
            required: "Email is required",
          })}
        />
        <div id="emailHelp" class="form-text fw-bolder">
          Your email will not be shared to anyone.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          {...register("password", {
            required: "Password is required",

            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
              message:
                "Password should be at least 8 characters containing a lowercase letter, an uppercase letter and a digit",
            },
          })}
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Save username and password
        </label>
      </div>
      <button type="submit" class="btn btn-primary col-5 d-block mx-auto">
        Submit
      </button>
    </form>
  );
}

export default Signup;
