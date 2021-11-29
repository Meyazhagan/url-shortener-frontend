import React, { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Toastify } from "../services/ToastServices";
import urlServices from "../services/UrlServices";
import { getToken } from "../services/AuthServices";
import { useNavigate } from "react-router";

export const UrlContext = createContext();

function UrlProvider({ children }) {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  const checkToken = () => {
    if (!getToken()) {
      navigate("/");
      return false;
    }
    return true;
  };
  const getAll = async () => {
    try {
      if (!checkToken()) return;
      const { data: urls } = await urlServices.getAll();
      setUrls(urls);
    } catch (er) {}
  };
  const onCreate = async (newUrl) => {
    const prevUrls = urls;
    if (!checkToken()) return;
    Toastify(urlServices.create(newUrl), {
      pending: "Creating new URL",
      onSuccess: ({ data }) => {
        const newUrls = [...urls, data.url];
        setUrls(newUrls);
        return `Created New URL`;
      },
      onError: (data) => {
        setUrls(prevUrls);
        return data?.response?.data?.message || "An Unexpected Error";
      },
    });
  };
  const onDelete = async (id) => {
    if (!checkToken()) return;
    const prevUrls = urls;
    const newUrls = [...urls];
    const index = urls.findIndex((u) => u._id === id);
    newUrls.splice(index, 1);
    setUrls(newUrls);
    Toastify(urlServices.remove(id), {
      pending: "Deleting the URL",
      onSuccess: () => `Deleted Successfully`,
      onError: (data) => {
        setUrls(prevUrls);
        return data?.response?.data?.message || "An Unexpected Error";
      },
    });
  };
  const onEdit = async (id, url) => {};

  const getUser = () => {
    // jwt. getToken()
    if (!checkToken()) return;
    const payload = jwt_decode(getToken());
    return payload?.username || "";
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <UrlContext.Provider
      value={{ urls, getAll, onCreate, onDelete, onEdit, getUser }}
    >
      {children}
    </UrlContext.Provider>
  );
}

export default UrlProvider;
