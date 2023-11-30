const INSTRUCTOR_URL = "instructors";
import axios from "axios";
import router from "@/router";

export default {
    state: {
        showAlert: false,
        visible: false,
        alertMessage: "",
    },
    getters: {
        getShowAlert: (state) => state.showAlert,
        getVisible: (state) => state.visible,
        getAlertMessage: (state) => state.alertMessage,
    },
    mutations: {
        setShowAlert(state, data) {
            state.showAlert = data;
        },
        setVisible(state, data) {
            state.visible = data;
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
