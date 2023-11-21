import axios from "axios";

const STUDENT_URL = "instructors";

export default {
  state: {
    indexTeacherNumber: "",
    teachers: [],
    teacher: {
      name: "",
    },
    selectedSchoolId: 279,
    params: {
      schoolId: 0,
    },
    teacherPagination: 0,
  },
  getters: {
    getTeacher: (state) => state.teacher,
    getTeachers: (state) => state.teachers,
    getTeacherNumber: (state) => state.teacherNumber + 1,
    getTeachersParams: (state) => state.params,
    getTeachersPagination: (state) => state.teacherPagination,
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
      //   console.log(schoolId);
      state.selectedSchoolId = schoolId;
    },
    setTeachersParams(state, data) {
      state.params = data;
    },
    setTeachersPagination(state, data) {
      state.teacherPagination = data;
    },
  },
  actions: {
    listTeachers({ commit, getters }) {
      var params = getters.getTeachersParams;
      params.size = 5;
      params.page = getters.getTeachersPagination - 1;
      let query = "";
      for (let index in Object.keys(params)) {
        let key = Object.keys(params)[index];
        query += `${key}=${params[key]}&`;
      }
      //  console.log(params);
      axios
        .get(`${STUDENT_URL}?${query}`)
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
    addTeacher({ dispatch, getters }) {
      const teacher = getters.getTeacher;
      //  console.log(teacher.schoolId);
      const teacherData = {
        email: teacher.email,
        schoolId: getters.getTeachersParams.schoolId,
        courseTypeId: 1,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        name: teacher.name,
        lastName: "",
        phoneNumber: "+48123456789",
      };
      const existingTeacher = getters.getTeachers.find(
        (existingTeacher) => existingTeacher.name === teacher.name
      );
      if (existingTeacher) {
        dispatch("showAlert", "Instruktor o takich danych już istnieje");
      } else {
        axios
          .post(`${STUDENT_URL}`, teacherData)
          .then((response) => {
            dispatch("listTeachers");
          })
          .catch((error) => {
            console.log(error);
            dispatch("showAlert", error.response.data.message);
          });
      }
    },
    deleteTeacher({ dispatch }, teacherId) {
      axios
        .delete(`${STUDENT_URL}/${teacherId}`)
        .then((response) => {
          dispatch("listTeachers");
          dispatch("showAlert", "Usunięto pomyślnie");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
