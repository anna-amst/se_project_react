export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.spacetechnology.net"
    : "http://localhost:3001";
import { request } from "./api";

export const register = (name, password, email, avatar) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};
