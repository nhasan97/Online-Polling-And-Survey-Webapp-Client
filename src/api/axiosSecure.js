import axios from "axios";
import useAuth from "../hooks/useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { logoutUser } = useAuth();

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await logoutUser();
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
