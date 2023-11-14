export default {
  state: {
    indexSchoolNumber: "",
    schoolNumber: 5,
    school: {
      name: "",
      city: "",
    },
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
      state.student = {
        name: "",
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
  },
};
