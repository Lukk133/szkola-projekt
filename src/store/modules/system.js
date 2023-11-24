export default {
  state: {
    showAlert: false,
    visible: false,
    isLogged: true,
    alertMessage: "",
    loggedUser: {
      name: "",
      password: "",
    },
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
    setLoggedUser(state, data) {
      state.loggedUser.name = data.name;
      state.loggedUser.password = data.password;
    },
  },
  actions: {
    showAlert(state, message) {
      state.commit("setAlertMessage", message);
      state.commit("setShowAlert", true);
    },
  },
};
