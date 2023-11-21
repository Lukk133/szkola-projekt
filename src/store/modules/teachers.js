import axios from "axios";

const INSTRUCTOR_URL = "instructors";

export default {
  state: {
    indexTeacherNumber: "",
    teachers: [],
    teacher: {
      name: "",
    },
    selectedSchoolId: 279,
  },
  getters: {
    getTeachers: (state) => state.teachers,
    getTeacher: (state) => state.teacher,
    getTeacherNumber: (state) => state.teacherNumber + 1,
  },
  mutations: {
    setTeacher(state, data) {
      state.teacher = data;
    },
    setTeachers(state, data) {
      state.teachers = data;
    },
    initTeacher(state) {
      state.teacher = {
        name: "",
        email: "",
      };
    },
    setSelectedSchool(state, schoolId) {
      state.selectedSchoolId = schoolId - 1;
    },
  },
  actions: {
    listAllTeachers({ commit }) {
      axios
        .get(`${INSTRUCTOR_URL}?size=20`)
        .then((response) => {
          const listTeachers = response.data.content.map((teacher) => {
            return {
              id: teacher.id,
              name: teacher.name,
              email: teacher.email,
            };
          });
          commit("setTeachers", listTeachers);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addTeacher({ dispatch, getters, state }) {
      const teacherData = {
        name: getters.getTeacher.name,
        email: getters.getTeacher.email,
        schoolId: state.selectedSchoolId - 1,
        lastName: "",
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        phoneNumber: "+48123456789",
        courseTypeId: 1,
      };
      axios
        .post(`${INSTRUCTOR_URL}`, teacherData)
        .then((response) => {
          dispatch("listAllTeachers");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTeacher({ dispatch }, teacherId) {
      axios
        .delete(`${INSTRUCTOR_URL}/${teacherId}`)
        .then((response) => {
          dispatch("listAllTeachers");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
