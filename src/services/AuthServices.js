import http from "./http";

// login auth
export async function login(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await http.post(`/user/login`, {
        email,
        password,
      });
      setToken(data.token);
      return resolve("Logged in success fully");
    } catch (err) {
      if (err.response && err.response.status >= 400)
        return reject(err?.response?.data?.message);
      return reject("An Unexpected Error");
    }
  });
}
export function register({
  firstName,
  lastName,
  email,
  password,
  repeatPassword,
}) {
  return http.post(`/user/register`, {
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  });
}
export function forgot(email) {
  return http.post(`/user/forgot-password`, { email });
}
export function resendVerification(email) {
  return http.post(`/user/resend-verification`, { email });
}
export function reset({ password, repeatPassword }, auth_token) {
  return http.post(
    `/user/reset-password`,
    { password, repeatPassword },
    { headers: { auth_token } }
  );
}
export function verifyUser(auth_token) {
  return http.get(`/user/verify/${auth_token}`);
}
export function verifyReset(auth_token) {
  return http.get(`/user/verify-reset/${auth_token}`);
}

export function setToken(jwt) {
  localStorage.setItem("token", jwt);
}
export function getToken() {
  return localStorage.getItem("token");
}
export function removeToken() {
  localStorage.removeItem("token");
}

const methods = {
  login,
  register,
  reset,
  forgot,
  verifyReset,
  verifyUser,
  resendVerification,
  setToken,
  getToken,
  removeToken,
};

export default methods;
