import axios from "axios";

const SCHOOL_URL = "schools";

export default {
  state: {
    schoolAlert: "",
    showSchoolAlert: false,
    school: {
      name: "",
      city: "",
    },
    schools: [],
  },
  getters: {
    getShowSchoolAlert: (state) => state.showSchoolAlert,
    getSchoolAlert: (state) => state.schoolAlert,
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
    setSchoolAlert(state, data) {
      state.schoolAlert = data;
    },
    setShowSchoolAlert(state, data) {
      state.showSchoolAlert = data;
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
            dispatch("showSchoolAlert", error.response.data.message);
          }
          console.log(error);
        });
    },
    deleteSchool({ dispatch }, id) {
      axios
        .delete(`${SCHOOL_URL}/${id}`)
        .then((response) => {
          dispatch("listAllSchools");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showSchoolAlert(state, message) {
      state.commit("setSchoolAlert", message);
      state.commit("setShowSchoolAlert", true);
    },
  },
};
