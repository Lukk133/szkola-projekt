import axios from "axios";
export default {
  state: {
    indexSchoolNumber: "",
    schoolNumber: 5,
    school: {
      name: "",
      city: "",
    },
    schools: [],
  },
  getters: {
    getSchools: (state) => state.schools,
    getSchool: (state) => state.school,
    getSchoolNumber: (state) => state.schoolNumber + 1,
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
    updateSchoolName(state, { index, name }) {
      state.schools[index].name = name;
    },
    editSchool(index) {
      this.state.indexSchoolNumber = index;
    },
  },
  actions: {
    addSchool({ state, commit }) {
      commit("setSchools", [...state.schools, state.school]);
    },
    editSchool({ commit }, index) {
      commit("editSchool", index);
    },
    updateSchoolName({ commit }, { index, name }) {
      commit("updateSchoolName", { index, name });
    },
    getAllSchools({ commit }) {
      axios
        .get("http://api.oskmanager.pl/api/schools")
        .then((response) => {
          console.log(response.data);
          const listSchools = response.data.map((school) => {
            return {
              id: school.location.id,
              name: school.name,
            };
          });
          commit("setSchools", listSchools);
          console.log(listSchools);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

//  const cities = response.data.data.map((city) => city);

/*
listCities({ commit }) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: "malta",
        })
        .then((response) => {
          const cities = response.data.data.map((city) => city);
          commit("setCities", cities);
        })
        .catch((error) => {
          console.log(error);
        });
    },


     getAllSchools() {
      axios
        .get("http://api.oskmanager.pl/api/schools")
        .then((response) => {
          const schoolId = response.data.map((school) => {
            return school.location.id;
          });
          console.log(schoolId);
        })
        .catch((error) => {
          console.log(error);
        });
    },

addSchoolPost({ state, commit }) {
      console.log(this.state.school);
      axios
        .post("http://api.oskmanager.pl/api/schools", {
          name: this.state.school,
          location: {
            lat: 35.917973,
            lng: 14.409943,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      commit("setSchools", [...state.schools, state.school]);
    }, */
