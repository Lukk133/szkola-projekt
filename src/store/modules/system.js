const STUDENT_URL = "students";
const INSTRUCTOR_URL = "instructors";
import axios from "axios";

export default {
  state: {
    showAlert: false,
    visible: false,
    isLogged: false,
    alertMessage: "",
    loggedUser: {
      email: "",
      password: "",
    },
    authToken: "",
  },
  getters: {
    getShowAlert: (state) => state.showAlert,
    getVisible: (state) => state.visible,
    getIsLogged: (state) => state.isLogged,
    getAlertMessage: (state) => state.alertMessage,
    getLoggedUser: (state) => state.loggedUser,
  },
  mutations: {
    setShowAlert(state, data) {
      state.showAlert = data;
    },
    setVisible(state, data) {
      state.visible = data;
    },
    setIsLogged(state, data) {
      state.isLogged = data;
    },
    setAlertMessage(state, data) {
      state.alertMessage = data;
    },
    setAuthToken(state, data) {
      state.authToken = data;
      localStorage.setItem("authToken", data);
    },
    setLoggedUser(state, data) {
      state.loggedUser.email = data.email;
      state.loggedUser.password = data.password;
    },
    initLogout(state) {
      state.loggedUser = {
        email: "",
        password: "",
      };
    },
  },
  actions: {
    showAlert(state, message) {
      state.commit("setAlertMessage", message);
      state.commit("setShowAlert", true);
    },
    loginUser({ commit, getters, dispatch }, { router, route }) {
      const userData = {
        email: getters.getLoggedUser.email,
        password: getters.getLoggedUser.password,
        code: "XXXXXX",
      };
      axios
        .post(`${STUDENT_URL}/login`, userData)
        .then((response) => {
          const authToken = response.data.token;
          router.push(route);
          commit("setIsLogged", true);
          commit("setAuthToken", authToken);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(`${INSTRUCTOR_URL}/login`, userData)
        .then((response) => {
          const authToken = response.data.token;
          router.push(route);
          commit("setIsLogged", true);
          commit("setAuthToken", authToken);
        })
        .catch((error) => {
          console.log(error);
          dispatch("showAlert", error.response.data.message);
        });
    },
    logoutUser({ dispatch }) {
      axios
        .post(`${STUDENT_URL}/logout`)
        .then((response) => {
          dispatch("showAlert", "Wylogowano pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post(`${INSTRUCTOR_URL}/logout`)
        .then((response) => {
          dispatch("showAlert", "Wylogowano pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
