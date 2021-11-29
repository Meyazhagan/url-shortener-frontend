import { getToken } from "./AuthServices";
import http from "./http";

const endPoint = "/app/url-shortener";

const getHeaders = () => {
  return { headers: { content: "app", auth_token: getToken() } };
};

const getAll = () => {
  return http.get(endPoint, getHeaders());
};

const get = (id) => {
  return http.get(`${endPoint}/${id}`, getHeaders());
};

const create = (urlData) => {
  return http.post(endPoint, urlData, getHeaders());
};

const remove = (id) => {
  return http.delete(`${endPoint}/${id}`, getHeaders());
};

const findUrl = (shortUrl) => {
  const frontend = process.env.REACT_APP_FRONTEND_URL;
  return http.get(`/find-url`, {
    headers: { x_url: `${frontend}/${shortUrl}` },
  });
};

const methods = {
  get,
  getAll,
  create,
  remove,
  findUrl,
};

export default methods;
