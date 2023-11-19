import axios from "axios";
export default {
  state: {
    indexTeacherNumber: "",
    // teacherName: "",
    teachers: [],
    teacher: {
      name: "",
    },
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
    updateTeacherName(state, { index, name }) {
      state.teachers[index].name = name;
    },
    editTeacher(index) {
      this.state.indexTeacherNumber = index;
    },
  },
  actions: {
    editTeacher({ commit }, index) {
      commit("editTeacher", index);
    },
    updateTeacherName({ commit }, { index, name }) {
      commit("updateTeacherName", { index, name });
    },
    listAllTeachers({ commit }) {
      axios
        .get("http://api.oskmanager.pl/api/instructors?size=20")
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
    addTeacherPost({ dispatch, getters }) {
      const teacherData = {
        email: getters.getTeacher.email,
        password: "Password123!",
        pesel: "12345678901",
        pkk: "PKK12345",
        name: getters.getTeacher.name,
        lastName: "",
        phoneNumber: "+48123456789",
        schoolId: 272, //to do zmiany
        course: {
          id: 0,
        },
        courseTypeId: 1,
      };
      axios
        .post("http://api.oskmanager.pl/api/instructors", teacherData)
        .then((response) => {
          dispatch("listAllTeachers");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTeacher({ dispatch }, teacherId) {
      axios
        .delete(`http://api.oskmanager.pl/api/instructors/${teacherId}`)
        .then((response) => {
          dispatch("listAllTeachers");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
