export default {
  state: {
    showAlert: false,
    visible: false,
    isLogged: true,
    alertMessage: "",
  },
  getters: {
    getShowAlert: (state) => state.showAlert,
    getVisible: (state) => state.visible,
    getIsLogged: (state) => state.isLogged,
    getAlertMessage: (state) => state.alertMessage,
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
  },
  actions: {
    showAlert(state, message) {
      state.commit("setAlertMessage", message);
      state.commit("setShowAlert", true);
    },
  },
};
