import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import IconInput from "../components/Input";
import Auth from "../services/AuthServices";
import { Toastify } from "../services/ToastServices";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    Toastify(Auth.login(values.email, values.password), {
      pending: "Processing Loging",
      onSuccess: () => {
        navigate("/app/url-shortener");
        return `Logged In Successfully`;
      },
      onError: (data) => data,
    });
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      return errors;
    },
  });

  const navigateToForgot = (e) => {
    e.preventDefault();
    navigate("/forgot");
  };
  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const navigateToResendVerification = (e) => {
    e.preventDefault();
    navigate("/resend-verification");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-5 relative shadow-lg p-5 rounded-lg w-10/12 sm:max-w-md">
        <p
          className="text-2xl text-center uppercase 
        mb-5 py-6 shadow-lg rounded-2xl 
        bg-green-400 text-white 
         absolute -top-5 left-10 right-10"
        >
          Login
        </p>
        <form className="mt-20 space-y-5" onSubmit={formik.handleSubmit}>
          <IconInput
            icon={"fas fa-envelope"}
            placeholder="Enter your email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
          <IconInput
            icon={"fas fa-lock"}
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
          {/* <div className="text-right">
          
          </div> */}
          <div className="flex gap-2 sm:flex-row-reverse flex-col">
            <button
              type="submit"
              disabled={!formik.isValid}
              className={classNames(
                "bg-blue-500 text-white w-full p-2 rounded-lg focus:bg-blue-700 hover:bg-blue-700",
                { "cursor-not-allowed": !formik.isValid }
              )}
            >
              Login
            </button>
            <button
              type="submit"
              onClick={formik.handleReset}
              className={classNames(
                "bg-red-500 text-white w-full p-2 rounded-lg focus:bg-red-700 hover:bg-red-700"
              )}
            >
              Reset
            </button>
          </div>
          <div className="flex justify-between flex-col sm:flex-row gap-4">
            <button
              onClick={navigateToForgot}
              className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
            >
              Forgot Password?
            </button>
            <button
              onClick={navigateToRegister}
              className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
            >
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
      <button
        onClick={navigateToResendVerification}
        className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
      >
        Not Yet Verified?
      </button>
    </div>
  );
}

export default Login;
