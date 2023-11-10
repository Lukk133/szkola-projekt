export default {
  state: {
    indexSchoolNumber: "",
    schoolNumber: 5,
    schools: [
      {
        id: 1,
        name: "XIV LO im. Stanisława Staszica",
        city: "halo",
      },
      {
        id: 2,
        name: "V LO im. Augusta Witkowskiego",
        city: "halo",
      },
      {
        id: 3,
        name: "XIII LO",
        city: "halo",
      },
      {
        id: 4,
        name: "Uniwersyteckie LO",
        city: "halo2",
      },
      {
        id: 5,
        name: "III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP",
        city: "halo2",
      },
    ],
  },
  getters: {
    getSchools: (state) => state.schools,
    getSchoolNumber: (state) => state.schoolNumber + 1,
    //  getCities: (state) => state.cities,
  },
  mutations: {
    setSchool(state, data) {
      state.schools = data;
    },
    updateSchoolName(state, { index, name }) {
      state.schools[index].name = name;
    },
    editSchool(index) {
      this.state.indexSchoolNumber = index;
    },
  },
  actions: {
    addSchool({ state, commit }, schoolData) {
      state.schoolNumber++;
      const newSchool = {
        id: state.schoolNumber,
        name: schoolData.schoolName,
        city: schoolData.selectedCity,
      };
      console.log(schoolData.selectedCity);
      commit("setSchool", [...state.schools, newSchool]);
    },
    editSchool({ commit }, index) {
      commit("editSchool", index);
    },
    updateSchoolName({ commit }, { index, name }) {
      commit("updateSchoolName", { index, name });
    },
  },
};
