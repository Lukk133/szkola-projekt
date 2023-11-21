<template>
  <h1 class="text-center">
    Strona szkoły
    {{ school.name }}
  </h1>
  <AddStudentDialog />

  <AddTeacherDialog />

  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <div>
            <v-table class="mx-4">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Imię i nazwisko ucznia</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="student.name">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <h3>
                      <div class="links text-left">{{ student.name }}</div>
                    </h3>
                  </td>

                  <v-icon
                    @click="deleteStudent((studentId = student.id))"
                    icon="fa fa-trash pl-5 mt-2"
                  />
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <div>
            <v-table class="mx-4">
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Imię i nazwisko instruktora</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(teacher, index) in teachers" :key="teacher.name">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <h3>
                      <div class="links text-left">{{ teacher.name }}</div>
                    </h3>
                  </td>

                  <v-icon
                    @click="deleteTeacher((teacherId = teacher.id))"
                    icon="fa fa-trash pl-5 mt-2"
                  />
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-sheet>
      </v-col>
      <v-responsive width="100%"></v-responsive>
    </v-row>
  </v-container>
</template>

<script>
import AddStudentDialog from "../assets/students/AddStudent.vue";
import AddTeacherDialog from "../assets/teachers/AddTeacherDialog.vue";

export default {
  components: {
    AddStudentDialog,
    AddTeacherDialog,
  },
  computed: {
    students() {
      return this.$store.getters.getStudents;
    },
    school() {
      return this.$store.getters.getSchool;
    },
    teachers() {
      return this.$store.getters.getTeachers;
    },
  },
  methods: {
    deleteStudent(studentId) {
      this.$store.dispatch("deleteStudent", studentId);
      this.$store.dispatch("showAlert", "Usunięto pomyślnie");
    },
    clearEdit() {
      this.studentName = "";
    },
    openTeacherEdit(index) {
      this.$refs.editTeacherDialog[index].open();
    },
    editTeacherName(index, name) {
      this.$store.dispatch("editTeacherName", { index, name });
    },
    deleteTeacher(teacherId) {
      this.$store.dispatch("deleteTeacher", teacherId);
    },
    clearEdit() {
      this.teacherName = "";
    },
    getSchool() {
      var schoolId = this.$route.params.id;
      this.$store.commit("setSchoolId", schoolId);
      this.$store.dispatch("findSchool", schoolId);
    },
    listStudents() {
      var schoolId = this.$route.params.id;
      var params = { schoolId: schoolId };
      this.$store.commit("setStudentsParams", params);
      this.$store.dispatch("listStudents");
    },
    listTeachers() {
      const schoolId = this.$route.params.id;
      let params = { schoolId: schoolId };
      this.$store.commit("setTeachersParams", params);
      this.$store.dispatch("listTeachers");
      console.log(schoolId);
    },
  },
  created() {
    this.getSchool();
    this.listStudents();
    this.listTeachers();
  },
  /* beforeCreate() {
      if ((this.$store.state.isLogged = false)) {
        this.$router.push("/");
      }
    },*/
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
