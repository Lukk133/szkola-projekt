export default {
  state: {
    indexStudentNumber: "",
    studentNumber: 0,
    studentName: "",
    students: [],
    student: {
      name: "",
    },
  },
  getters: {
    getStudent: (state) => state.student,
    getStudents: (state) => state.students,
    getStudentNumber: (state) => state.studentNumber + 1,
  },
  mutations: {
    setStudent(state, data) {
      state.student = data;
    },
    setStudents(state, data) {
      state.students = data;
    },
    initStudent(state) {
      state.student = {
        name: "",
      };
    },
    updateStudentName(state, { index, name }) {
      state.students[index].name = name;
    },
    editStudent(index) {
      this.state.indexStudentNumber = index;
    },
  },
  actions: {
    addStudent({ state, commit }) {
      commit("setStudents", [...state.students, state.student]);
      //alblo jak nie bedzie działać powyższe  commit("setStudent", [...state.students, state.student]);
    },
    editStudent({ commit }, index) {
      commit("editStudent", index);
    },
    updateStudentName({ commit }, { index, name }) {
      commit("updateStudentName", { index, name });
    },
  },
};
