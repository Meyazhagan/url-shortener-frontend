import React from "react";

function IconInput(props) {
  const { icon, name, placeholder, error, id, type, label, ...rest } = props;
  return (
    <div className="relative ">
      <div className="flex mt-10">
        <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
          {icon && <i className={icon}></i>}
          {label && <span className="pl-2">{label}</span>}
        </span>
        <input
          type={type || "text"}
          id={id}
          className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-4 focus:border-transparent"
          name={name}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      <p className="absolute text-sm text-red-500 -top-6">{error}</p>
    </div>
  );
}

export default IconInput;
