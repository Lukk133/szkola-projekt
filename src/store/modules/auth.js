import axios from "axios";
import router from "@/router";
const STUDENT_URL = "students";

export default {
    state: {
        actualUser: {},
        isLogged: false
    },
    getters: {
        getActualUser: state => state.actualUser,
        getIsLogged: state => state.isLogged,
    },
    mutations: {
        setActualUser(state, data) {
            state.actualUser = data
        },
        setIsLogged(state, data) {
            state.isLogged = data
        }
    },
    actions: {
        getActualUser({ commit }) {
            console.log("get actual")
            axios.get(`${STUDENT_URL}/get-actual`)
                .then(response => {
                    commit("setActualUser", response.data)
                })
        },
        login({ commit, }, { auth }) {
            console.log("auth in actions")
            console.log(auth)
            auth.code = "XXXXXX"
            console.log(auth)
            axios
                .post(`${STUDENT_URL}/login`, auth)
                .then((response) => {
                    const authToken = response.data.token;
                    commit("setIsLogged", true);
                    this.dispatch("getActualUser")
                    router.push({ name: "Profile" })
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        logout({ dispatch }) {
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
    }
}