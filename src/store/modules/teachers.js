export default {
  state: {
    indexTeacherNumber: "",
    teacherNumber: 0,
    teacherName: "",
    teachers: [],
    teacher: {
      name: "",
    },
  },
  getters: {
    getTeachers: (state) => state.teachers,
    getTeacher: (state) => state.teacher,
    getTeacherNumber: (state) => state.teacherNumber + 1,
  },
  mutations: {
    setTeachers(state, data) {
      state.teachers = data;
    },
    setTeacher(state, data) {
      state.teacher = data;
    },
    initTeacher(state) {
      state.teacher = {
        name: "",
      };
    },
    updateTeacherName(state, { index, name }) {
      state.teachers[index].name = name;
    },
    editTeacher(index) {
      this.state.indexTeacherNumber = index;
    },
  },
  actions: {
    addTeacher({ state, commit }) {
      commit("setTeachers", [...state.teachers, state.teacher]);
    },
    editTeacher({ commit }, index) {
      commit("editTeacher", index);
    },
    updateTeacherName({ commit }, { index, name }) {
      commit("updateTeacherName", { index, name });
    },
  },
};
