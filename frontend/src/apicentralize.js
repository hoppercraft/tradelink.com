import { ACCESS_TOKEN } from "./constants";

export const api=async(url,options={})=>{
const token=localStorage.getItem(ACCESS_TOKEN);

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
    credentials: "include",
  };
    let response = await fetch(url, config);

         if (response.status === 401) {
    const refreshRes = await fetch("/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
    });

    if (!refreshRes.ok) {
      localStorage.removeItem(ACCESS_TOKEN);
      throw new Error("Unauthorized");
    }

    const refreshData = await refreshRes.json();
    localStorage.setItem(ACCESS_TOKEN, refreshData.access);

    config.headers.Authorization = `Bearer ${refreshData.access}`;
    response = await fetch(url, config);
  }

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || "Request failed");
  }

  return response.json();
}
