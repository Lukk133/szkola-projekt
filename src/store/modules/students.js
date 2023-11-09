export default {
  state: {
    indexStudentNumber: "",
    studentNumber: 0,
    studentName: "",
    students: [],
  },
  getters: {
    getStudents: (state) => state.students,
    getStudentNumber: (state) => state.studentNumber + 1,
  },
  mutations: {
    setStudent(state, data) {
      state.students = data;
    },
    updateStudentName(state, { index, name }) {
      state.students[index].name = name;
    },
    editStudent(index) {
      this.state.indexStudentNumber = index;
    },
  },
  actions: {
    addStudent({ state, commit }, studentName) {
      state.studentNumber++;
      const newStudent = {
        id: state.studentNumber,
        name: studentName,
      };
      commit("setStudent", [...state.students, newStudent]);
    },
    editStudent({ commit }, index) {
      commit("editStudent", index);
    },
    updateStudentName({ commit }, { index, name }) {
      commit("updateStudentName", { index, name });
    },
  },
};
