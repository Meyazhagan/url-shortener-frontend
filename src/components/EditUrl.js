import { useFormik } from "formik";
import React, { useContext } from "react";
import { UrlContext } from "../context/UrlShortenerContext";

function EditUrl() {
  const { onEdit } = useContext(UrlContext);
  //   const

  const validate = (values) => {
    const errors = {};
    if (!values.url) errors.url = "URL is required";
    return errors;
  };

  const handleSubmit = (values) => {
    onEdit(id, values);
    formik.handleReset();
  };
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validate,
    onSubmit: handleSubmit,
  });
  return (
    <form className="flex justify-center items-center ">
      <div className="flex w-full">
        <span
          className="rounded-l-md 
        inline-flex  items-center 
        px-3 border-t bg-white border-l border-b  
        border-gray-300 text-gray-500 shadow-sm text-sm"
        >
          @
        </span>
        <input
          type="url"
          //   id={id}
          className="flex-1 appearance-none border 
          border-gray-300 w-full py-2 px-4 
          bg-white text-gray-700 placeholder-gray-400 
          shadow-sm text-base focus:outline-none"
          name="url"
          placeholder="Enter Your URL"
          onChange={formik.handleChange}
          value={formik.values.url}
        />
        <span
          className="rounded-r-md 
        inline-flex  items-center px-3 bg-white
        border-t  border-r border-b  
        border-gray-300 text-gray-500 shadow-sm text-sm"
        >
          <button onClick={formik.handleSubmit}>Edit URL</button>
        </span>
      </div>
    </form>
  );
}

export default EditUrl;
