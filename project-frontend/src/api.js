import axios from "axios";
import { logout } from "./utils/auth";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//public routes

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const signup = async (data) => {
  try {
    return await apiClient.post("/auth/signup", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

//private routes

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation-list/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    throw exception;
  }
};

export const acceptInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation-list/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation-list/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
