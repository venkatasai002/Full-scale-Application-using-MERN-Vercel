import { api } from "../../../lib/axios";

export const loginApi = async (data: { username: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerApi = async (data: { username: string; password: string }) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
