import axios from "axios";

const STUDENT_URL = "students";

const defaultStudentsPagination = {
  page: 1,
  size: 5,
};

export default {
  state: {
    students: [],
    student: {
      name: "",
    },
    selectedSchoolId: "",
    params: {
      schoolId: 0,
    },
    studentsPagination: { ...defaultStudentsPagination },
    studentId: "",
  },
  getters: {
    getStudent: (state) => state.student,
    getStudents: (state) => state.students,
    getStudentsParams: (state) => state.params,
    getStudentsPagination: (state) => state.studentsPagination,
    getTotalStudents: (state) => state.totalStudents,
    getStudentId: (state) => state.studentId,
  },
  mutations: {
    setStudent(state, data) {
      state.student = data;
    },
    setStudents(state, data) {
      state.students = data;
    },
    setTotalStudents(state, data) {
      state.totalStudents = data;
    },
    initStudent(state) {
      state.student = {
        name: "",
        email: "",
      };
    },
    initStudentsPagination(state) {
      state.studentsPagination = { ...defaultStudentsPagination };
    },
    setSelectedSchool(state, schoolId) {
      state.selectedSchoolId = schoolId;
    },
    setStudentsParams(state, data) {
      state.params = data;
    },
    setStudentsPagination(state, data) {
      state.studentsPagination = data;
    },
    setStudentId(state, data) {
      state.studentId = data;
    },
  },
  actions: {
    listStudents({ commit, getters }, searchStudent) {
      var params = getters.getStudentsParams;
      let pagination = { ...getters.getStudentsPagination, searchStudent };
      pagination.page = pagination.page - 1;
      pagination.schoolId = params.schoolId;
      axios
        .get(`${STUDENT_URL}`, { params: pagination })
        .then((response) => {
          const listStudents = response.data.content.map((student) => {
            return {
              id: student.id,
              name: student.name,
              email: student.email,
            };
          });

          commit("setStudents", listStudents);
          commit("setTotalStudents", response.data.totalElements);
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
        name: student.name,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
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
          console.log(response);
          dispatch("listStudents");
          dispatch("showAlert", "Usunięto pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addStudentLogin({ dispatch, getters }) {
      const studentLogin = {
        email: "qwert@y",
        password: "Password123!",
        code: "XXXXXX",
      };
      axios
        .post(`${STUDENT_URL}/login`, studentLogin)
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
