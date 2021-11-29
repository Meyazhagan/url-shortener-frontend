import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import IconInput from "../components/Input";
import AuthServices from "../services/AuthServices";
import { Toastify } from "../services/ToastServices";

function Forgot() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    Toastify(AuthServices.forgot(values.email), {
      pending: "Processing Forgot Password Request",
      onSuccess: () => `Email is sent successfully`,
      onError: (data) => data?.response?.data?.message || "An Unexpected Error",
    });
  };
  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      return errors;
    },
  });

  const handleToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-5 relative shadow-lg p-5 rounded-lg w-10/12 sm:max-w-md">
        <p
          className="text-xl text-center uppercase 
                    mb-5 p-6 shadow-lg rounded-2xl 
                    bg-red-500 text-white 
                     absolute -top-5 left-10 right-10"
        >
          Forgot Password
        </p>
        <form className="mt-20 space-y-5">
          <IconInput
            icon={"fas fa-envelope"}
            placeholder="Enter your email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />

          <div className="flex gap-2 sm:flex-row-reverse flex-col">
            <button
              type="submit"
              onClick={formik.handleSubmit}
              disabled={!formik.isValid}
              className={classNames(
                "bg-blue-500 text-white w-full p-2 rounded-lg focus:bg-blue-700 hover:bg-blue-700",
                { "cursor-not-allowed": !formik.isValid }
              )}
            >
              Forgot
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
        </form>
      </div>
      <div className="text-center">
        <button
          onClick={handleToLogin}
          className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
        >
          Did you remember the password?
        </button>
      </div>
    </div>
  );
}

export default Forgot;
