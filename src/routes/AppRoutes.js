import React from "react";
import Forgot from "../pages/Forgot";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reset from "../pages/Reset";
import VerifyReset from "../pages/VerifyReset";
import ResendVerification from "../pages/ResendVerification";
import VerifyUser from "../pages/verifyUser";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/AuthServices";
import UrlShortener from "../pages/UrlShortener";
import UrlProvider from "../context/UrlShortenerContext";
import RedirectUrl from "../pages/RedirectUrl";

const PrivateOutlet = () => {
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   setToken(getToken());
  // }, []);
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/:shortUrl" element={<RedirectUrl />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/resend-verification"
        element={<ResendVerification />}
      ></Route>
      <Route path="/forgot" element={<Forgot />}></Route>
      <Route path="/reset/:userId/:token" element={<Reset />}></Route>
      <Route path="/verify-reset/:token" element={<VerifyReset />}></Route>
      <Route path="/verify-user/:token" element={<VerifyUser />}></Route>
      <Route path="/app/url-shortener" element={<PrivateOutlet />}>
        <Route
          path=""
          element={
            <UrlProvider>
              <UrlShortener />
            </UrlProvider>
          }
        />
      </Route>
      <Route path="/" element={<Navigate to="/app/url-shortener" />} />
    </Routes>
  );
}

export default AppRoutes;
