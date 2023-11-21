import axios from "axios";

const STUDENT_URL = "students";

export default {
  state: {
    indexStudentNumber: "",
    students: [],
    student: {
      name: "",
    },
    selectedSchoolId: 279,
    params: {
      schoolId: 0,
    },
    studentPagination: 0,
  },
  getters: {
    getStudent: (state) => state.student,
    getStudents: (state) => state.students,
    getStudentNumber: (state) => state.studentNumber + 1,
    getStudentsParams: (state) => state.params,
    getStudentsPagination: (state) => state.studentPagination,
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
      state.selectedSchoolId = schoolId;
    },
    setStudentsParams(state, data) {
      state.params = data;
    },
    setStudentPagination(state, data) {
      state.studentPagination = data;
    },
  },
  actions: {
    listStudents({ commit, getters }) {
      var params = getters.getStudentsParams;
      params.size = 5;
      params.page = getters.getStudentsPagination - 1;
      let query = "";
      for (let index in Object.keys(params)) {
        let key = Object.keys(params)[index];
        query += `${key}=${params[key]}&`;
      }
      axios
        .get(`${STUDENT_URL}?${query}`)
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
    addStudent({ dispatch, getters }) {
      const student = getters.getStudent;
      const studentData = {
        email: student.email,
        schoolId: student.schoolId,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        name: student.name,
        lastName: "",
        phoneNumber: "+48123456789",
      };
      const existingStudent = getters.getStudents.find(
        (existingStudent) => existingStudent.name === student.name
      );
      if (existingStudent) {
        dispatch("showAlert", "Uczeń o takich danych już istnieje");
      } else {
        axios
          .post(`${STUDENT_URL}`, studentData)
          .then((response) => {
            dispatch("listStudents");
          })
          .catch((error) => {
            console.log(error);
            dispatch("showAlert", error.response.data.message);
          });
      }
    },
    deleteStudent({ dispatch }, studentId) {
      axios
        .delete(`${STUDENT_URL}/${studentId}`)
        .then((response) => {
          dispatch("listStudents");
          dispatch("showAlert", "Usunięto pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
