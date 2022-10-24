import { axiosClient } from "./axiosClient";
interface RegisterPayload {
  email: string;
  password: string;
}
export const registerFetcher = (data: RegisterPayload) => {
  return axiosClient.post("/auth/register", data);
};

export const loginFetcher = (data: RegisterPayload) => {
  return axiosClient.post("/auth/login", data);
};
