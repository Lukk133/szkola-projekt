import axios from "axios";

const SCHOOL_URL = "schools";

export default {
  state: {
    school: {
      id: 0,
      name: "",
      city: "",
    },
    schools: [],
  },
  getters: {
    getSchools: (state) => state.schools,
    getSchool: (state) => state.school,
    getSchoolId: (state) => state.school.id,
  },
  mutations: {
    setSchools(state, data) {
      state.schools = data;
    },
    setSchoolId(state, data) {
      state.school.id = data;
    },
    setSchool(state, data) {
      state.school = data;
    },
    initSchool(state) {
      state.school = {
        name: "",
        city: "",
      };
    },
  },
  actions: {
    findSchool({ commit }, id) {
      axios
        .get(`${SCHOOL_URL}/${id}`)
        .then((response) => {
          const school = response.data;
          commit("setSchool", school);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listAllSchools({ commit }) {
      axios
        .get(`${SCHOOL_URL}`)
        .then((response) => {
          const listSchools = response.data.map((school) => {
            return {
              id: school.id,
              name: school.name,
              city: school.location.city.name,
            };
          });
          commit("setSchools", listSchools);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addSchool({ dispatch, getters }, selectedCity) {
      const schoolData = {
        name: getters.getSchool.name,
        location: {
          lat: 40.7128,
          lng: -74.006,
          city: {
            name: selectedCity,
          },
        },
      };
      axios
        .post(`${SCHOOL_URL}`, schoolData)
        .then((response) => {
          dispatch("listAllSchools");
        })
        .catch((error) => {
          {
            dispatch("showAlert", error.response.data.message);
          }
          console.log(error);
        });
    },
    deleteSchool({ dispatch }, id) {
      axios
        .delete(`${SCHOOL_URL}/${id}`)
        .then((response) => {
          dispatch("listAllSchools");
          dispatch("showAlert", "Usunięto pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAlertName(state, message) {
      state.commit("setAlertMessageName", message);
      state.commit("setShowAlertName", true);
    },
  },
};
