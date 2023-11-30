import axios from "axios";

// Creating a global request interceptor
axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

//axios.defaults.baseURL = "http://localhost:8080/api/";
axios.defaults.baseURL = "http://api.oskmanager.pl/api/";
