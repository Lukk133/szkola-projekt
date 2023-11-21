import axios from "axios";
//to do wywalenia =><
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
      shcoolId: 0,
    },
  },
  getters: {
    getStudent: (state) => state.student,
    getStudents: (state) => state.students,
    getStudentNumber: (state) => state.studentNumber + 1,
    getStudentsParams: (state) => state.params,
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
    setStudentParams(state, data) {
      state.params = data;
    },
  },
  actions: {
    listAllStudents({ commit, getters }) {
      const params = getters.getStudentsParams;
      params.size = 5;
      params.page = 0;
      let query = "";
      for (let index in Object.keys(params)) {
        let key = Object.keys(params)[index];
        query += `${key}=${params[key]}&`;
      }
      console.log(params);
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
        name: student.name,
        lastName: "",
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        phoneNumber: "+48123456789",
      };
      axios
        .post(`${STUDENT_URL}`, studentData)
        .then((response) => {
          dispatch("listAllStudents");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteStudent({ dispatch }, studentId) {
      axios
        .delete(`${STUDENT_URL}/${studentId}`)
        .then((response) => {
          dispatch("listAllStudents");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
