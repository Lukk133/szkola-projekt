import axios from "axios";

const INSTRUCTOR_URL = "instructors";

const defaultTeachersPagination = {
  page: 1,
  size: 5,
};

export default {
  state: {
    teachers: [],
    teacher: {
      name: "",
    },
    selectedSchoolId: "",
    params: {
      schoolId: 0,
    },
    teachersPagination: { ...defaultTeachersPagination },
    teacherId: "",
    /*
    teacherPagination: 0,
    totalTeachers: 0,
    teachersDisplayed: 0,
    */
  },
  getters: {
    getTeacher: (state) => state.teacher,
    getTeachers: (state) => state.teachers,
    getTeachersParams: (state) => state.params,
    getTeachersPagination: (state) => state.teachersPagination,
    getTotalTeachers: (state) => state.totalTeachers,
    getSelectedSchool: (state) => state.selectedSchoolId,
    getTeacherId: (state) => state.teacherId,
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
    setTotalTeachers(state, data) {
      state.totalTeachers = data;
    },
    setSelectedSchool(state, schoolId) {
      state.selectedSchoolId = schoolId;
    },
    initTeachersPagination(state) {
      state.teachersPagination = { ...defaultTeachersPagination };
    },
    setTeachersParams(state, data) {
      state.params = data;
    },
    setTeachersPagination(state, data) {
      state.teacherPagination = data;
    },
    setTeachersDisplayed(state, data) {
      state.teachersDisplayed = data;
    },
    setTeacherId(state, data) {
      state.teacherId = data;
    },
  },
  actions: {
    listTeachers({ commit, getters }, searchTeacher) {
      var params = getters.getTeachersParams;
      let pagination = { ...getters.getTeachersPagination, searchTeacher };
      pagination.page = pagination.page - 1;
      pagination.schoolId = params.schoolId;
      axios
        .get(`${INSTRUCTOR_URL}`, { params: pagination })
        .then((response) => {
          const listTeachers = response.data.content.map((teacher) => {
            return {
              id: teacher.id,
              name: teacher.name,
              email: teacher.email,
            };
          });
          commit("setTeachers", listTeachers);
          commit("setTotalTeachers", response.data.totalElements);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addTeacher({ dispatch, getters }) {
      const teacher = getters.getTeacher;
      const teacherData = {
        email: teacher.email,
        schoolId: getters.getTeachersParams.schoolId,
        name: teacher.name,
        courseTypeId: 1,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
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
          .post(`${INSTRUCTOR_URL}`, teacherData)
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
        .delete(`${INSTRUCTOR_URL}/${teacherId}`)
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
