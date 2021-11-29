import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router";
import IconInput from "../components/Input";
import AuthServices from "../services/AuthServices";
import { Toastify } from "../services/ToastServices";

function Reset() {
  const navigate = useNavigate();
  const auth_token = useParams().token;
  const handleSubmit = (values) => {
    Toastify(AuthServices.reset(values, auth_token), {
      pending: "Processing Reset Password Request",
      onSuccess: () => `Password is changed successfully`,
      onError: (data) => data?.response?.data?.message || "An Unexpected Error",
    });
  };
  const formik = useFormik({
    initialValues: { password: "", repeatPassword: "" },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) errors.password = "Password is required";
      if (!values.repeatPassword)
        errors.repeatPassword = "Confirm Password is required";
      return errors;
    },
  });
  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="m-5 relative shadow-lg p-5 rounded-lg w-10/12 sm:max-w-md">
        <p
          className="text-2xl text-center uppercase 
              mb-5 p-6 shadow-lg rounded-xl 
              bg-blue-700 text-white 
               absolute -top-5 left-10 right-10"
        >
          Reset
        </p>
        <form className="mt-20 space-y-5">
          <IconInput
            icon={"fas fa-lock"}
            placeholder="Enter New password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
          <IconInput
            label={formik.values.repeatPassword && "Repeat"}
            icon={"fas fa-lock"}
            placeholder="Repeat password"
            type="password"
            name="repeatPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.repeatPassword}
            error={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
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
              Reset
            </button>
            <button
              type="submit"
              onClick={formik.handleReset}
              className={classNames(
                "bg-red-500 text-white w-full p-2 rounded-lg focus:bg-red-700 hover:bg-red-700"
              )}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <div className="text-center">
        <button
          onClick={navigateToLogin}
          className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
        >
          Login ?
        </button>
      </div>
    </div>
  );
}

export default Reset;
