export default {
  state: {
    indexTeacherNumber: "",
    teacherNumber: 0,
    teacherName: "",
    teachers: [],
  },
  getters: {
    getTeachers: (state) => state.teachers,
    getTeacherNumber: (state) => state.teacherNumber + 1,
  },
  mutations: {
    setTeacher(state, data) {
      state.teachers = data;
    },
    updateTeacherName(state, { index, name }) {
      state.teachers[index].name = name;
    },
    editTeacher(index) {
      this.state.indexTeacherNumber = index;
    },
  },
  actions: {
    addTeacher({ state, commit }, teacherName) {
      state.teacherNumber++;
      const newTeacher = {
        id: state.teacherNumber,
        name: teacherName,
      };
      commit("setTeacher", [...state.teachers, newTeacher]);
    },
    editTeacher({ commit }, index) {
      commit("editTeacher", index);
    },
    updateTeacherName({ commit }, { index, name }) {
      commit("updateTeacherName", { index, name });
    },
  },
};
