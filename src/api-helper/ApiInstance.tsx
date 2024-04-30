import axios from "axios";

const createApiInstance = (token: any) => {
  return axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

export default createApiInstance;
