import { getToken } from "./token";

export const loginUser = async (username, password) => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    method: "POST",
  });
  const data = await res.json();
  return data;
};
// ------------------------------------------------------------*
export const registerUser = async (payload) => {
  const res = await fetch("https://dummyjson.com/auth/login", {
    body: JSON.stringify(payload),
    method: "POST",
  });
  const data = await res.json();
  return data;
};
// ------------------------------------------------------------*
export const whoAmI = async () => {
  const res = await fetch("https://dummyjson.com/auth/me", {
    headers: {
      authorization: getToken(),
    },
    method: "GET",
  });
  const data = await res.json();
  return data;
};
