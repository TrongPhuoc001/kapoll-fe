import axios from "axios";

export const axiosClient = axios.create({
  baseURL:
    process.env.REACT_APP_MODE === "production"
      ? process.env.REACT_APP_API_URL_PROD
      : process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authurization: "Bearer " + localStorage.getItem("token"),
  },
});
