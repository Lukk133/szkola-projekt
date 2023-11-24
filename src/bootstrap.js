import axios from "axios";

const authToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYXJhdGVAbWlzdHJ6IiwiaWF0IjoxNzAwNzU2ODA4LCJleHAiOjE3MDA3NjI4MDh9.OWenjEdCifR5XpQN6KbJkcVgrCx1zWJZCmfwrumpVGs";

localStorage.setItem("token", authToken);

// Creating a global request interceptor
axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axios.defaults.baseURL = "http://api.oskmanager.pl/api/";
