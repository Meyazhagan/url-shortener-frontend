import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import urlServices from "../services/UrlServices";

function RedirectUrl() {
  const shortUrl = useParams().shortUrl;
  const [message, setMessage] = useState("");
  const getUrl = async () => {
    try {
      const { data: url } = await urlServices.findUrl(shortUrl);
      window.location = url.url;
      return url;
    } catch (ex) {
      const msg = ex?.response?.data?.message || "An Unexpected Error";
      setMessage(msg);
    }
  };
  useEffect(
    () => {
      getUrl();
    },
    // eslint-disable-next-line
    []
  );
  return <p>Redirecting to {message}</p>;
}

export default RedirectUrl;
