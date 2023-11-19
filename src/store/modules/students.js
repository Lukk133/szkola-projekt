import axios from "axios";

export default {
  state: {
    indexStudentNumber: "",
    students: [],
    student: {
      name: "",
    },
    selectedSchoolId: 279,
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
        email: "",
      };
    },
    setSelectedSchool(state, schoolId) {
      state.selectedSchoolId = schoolId - 1;
    },
    updateStudentName(state, { index, name }) {
      state.students[index].name = name;
    },
    editStudent(index) {
      this.state.indexStudentNumber = index;
    },
  },
  actions: {
    editStudent({ commit }, index) {
      commit("editStudent", index);
    },
    updateStudentName({ commit }, { index, name }) {
      commit("updateStudentName", { index, name });
    },
    listAllStudents({ commit }) {
      axios
        .get("http://api.oskmanager.pl/api/students?size=20")
        .then((response) => {
          const listStudents = response.data.content.map((student) => {
            return {
              id: student.id,
              name: student.name,
              email: student.email,
            };
          });
          commit("setStudents", listStudents);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addStudent({ dispatch, getters, state }) {
      //  console.log(state.selectedSchoolId);
      const studentData = {
        email: getters.getStudent.email,
        schoolId: state.selectedSchoolId - 1,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        name: getters.getStudent.name,
        lastName: "",
        phoneNumber: "+48123456789",
      };
      axios
        .post("http://api.oskmanager.pl/api/students", studentData)
        .then((response) => {
          dispatch("listAllStudents");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteStudent({ dispatch }, studentId) {
      axios
        .delete(`http://api.oskmanager.pl/api/students/${studentId}`)
        .then((response) => {
          dispatch("listAllStudents");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
