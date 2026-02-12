import axios from "axios";

/**
 * Attach auth token to every request so protected API calls succeed.
 * On 401, clear stale token and redirect to login (fixes "Request failed with status code 401" after backend auth changes).
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.token = token;
      if (!config.headers.api_key) config.headers.api_key = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      const isLoginPage = window.location.pathname === "/login" || window.location.pathname === "/";
      if (!isLoginPage) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default axios;
