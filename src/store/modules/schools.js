import axios from "axios";
export default {
  state: {
    alertMessageName: "",
    showAlertName: false,
    school: {
      name: "",
      city: "",
    },
    schools: [],
  },
  getters: {
    getShowAlertName: (state) => state.showAlertName,
    getAlertMessageName: (state) => state.alertMessageName,
    getSchools: (state) => state.schools,
    getSchool: (state) => state.school,
  },
  mutations: {
    setSchools(state, data) {
      state.schools = data;
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
    setAlertMessageName(state, data) {
      state.alertMessageName = data;
    },
    setShowAlertName(state, data) {
      state.showAlertName = data;
    },
  },
  actions: {
    listAllSchools({ commit }, selectedCity) {
      axios
        .get("http://api.oskmanager.pl/api/schools")
        .then((response) => {
          const listSchools = response.data.map((school) => {
            console.log(selectedCity);
            //            console.log(school.location.city.name);
            return {
              id: school.location.id,
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
        .post("http://api.oskmanager.pl/api/schools", schoolData)
        .then((response) => {
          dispatch("listAllSchools", selectedCity);
        })
        .catch((error) => {
          {
            dispatch("showAlertName", error.response.data.message);
          }
          console.log(error);
        });
    },
    deleteSchool({ dispatch }, schoolId) {
      axios
        .delete(`http://api.oskmanager.pl/api/schools/${schoolId - 2}`)
        .then((response) => {
          dispatch("listAllSchools");
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
