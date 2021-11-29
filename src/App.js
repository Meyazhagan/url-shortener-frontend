import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer newestOnTop toastClassName="rounded-md bg-dark" />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
