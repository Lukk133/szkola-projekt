import axios from "axios";

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
    addStudentPost({ dispatch, getters }) {
      const studentData = {
        email: "student@example.com",
        password: "Password123!",
        user: {
          id: 5,
          createdAt: "2023-11-18T16:27:15.961Z",
          updatedAt: "2023-11-18T16:27:15.961Z",
          deleted: true,
          name: "string",
          lastName: "string",
          email: "string",
          phoneNumber: "string",
          password: "string",
          avatar: {
            id: 5,
            createdAt: "2023-11-18T16:27:15.961Z",
            updatedAt: "2023-11-18T16:27:15.961Z",
            deleted: true,
            path: "string",
            contentType: "string",
            size: 0,
            name: "string",
          },
          school: {
            id: 5,
            createdAt: "2023-11-18T16:27:15.961Z",
            updatedAt: "2023-11-18T16:27:15.961Z",
            deleted: true,
            code: "string",
            name: "string",
            location: {
              id: 5,
              createdAt: "2023-11-18T16:27:15.961Z",
              updatedAt: "2023-11-18T16:27:15.961Z",
              deleted: true,
              lat: 0,
              lng: 0,
              street: "string",
              city: {
                id: 5,
                createdAt: "2023-11-18T16:27:15.961Z",
                updatedAt: "2023-11-18T16:27:15.961Z",
                deleted: true,
                name: "string",
              },
              name: "string",
            },
            logo: {
              id: 5,
              createdAt: "2023-11-18T16:27:15.961Z",
              updatedAt: "2023-11-18T16:27:15.961Z",
              deleted: true,
              path: "string",
              contentType: "string",
              size: 0,
              name: "string",
            },
          },
          roles: [
            {
              id: 5,
              createdAt: "2023-11-18T16:27:15.961Z",
              updatedAt: "2023-11-18T16:27:15.961Z",
              deleted: true,
              name: "string",
            },
          ],
        },
        pesel: "12345678901",
        pkk: "PKK12345",
        name: "John",
        lastName: "Doe",
        phoneNumber: "+48123456789",
      };
      axios
        .post("http://api.oskmanager.pl/api/students", studentData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
};
