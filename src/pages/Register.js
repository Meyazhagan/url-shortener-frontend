import classNames from "classnames";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import IconInput from "../components/Input";
import Auth from "../services/AuthServices";
import { Toastify } from "../services/ToastServices";

function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    Toastify(Auth.register(values), {
      pending: "Processing Registration",
      onSuccess: () => `Registered In Successfully`,
      onError: (data) => data?.response?.data?.message || "An Unexpected Error",
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) errors.firstName = "First Name is required";
      if (!values.lastName) errors.lastName = "Last Name is required";
      if (!values.email) errors.email = "Email is required";
      if (!values.password) errors.password = "Password is required";
      if (!values.repeatPassword)
        errors.repeatPassword = "Repeat Password is required";
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
              mb-5 p-6 shadow-lg rounded-2xl 
              bg-blue-700 text-white 
               absolute -top-5 left-10 right-10"
        >
          Register
        </p>
        <form className="mt-20 space-y-5">
          <IconInput
            label={formik.values.firstName && "First Name"}
            icon={"fas fa-user"}
            placeholder="Enter your First Name"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && formik.errors.firstName}
          />
          <IconInput
            label={formik.values.lastName && "Last Name"}
            icon={"fas fa-user"}
            placeholder="Enter your Last Name"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && formik.errors.lastName}
          />
          <IconInput
            // label={formik.values.email && "Email"}
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
              Register
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
          onClick={navigateToLogin}
          className="text-blue-900 hover:text-blue-500 hover:underline text-sm"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
}

export default Register;
