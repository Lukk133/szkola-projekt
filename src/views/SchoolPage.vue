<template>
  <h1 class="text-center">
    Strona szkoły<!--{{ $store.getters.getSchool }}-->
  </h1>
  <!--{{ $route.params.id }}-->
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
                  <td>{{ student.id }}</td>
                  <td>
                    <h3>
                      <div class="links text-left">{{ student.name }}</div>
                    </h3>
                  </td>
                  <v-icon
                    @click="openStudentEdit(index)"
                    icon="fa fa-edit pl-5 mt-2 mr-4"
                  />

                  <EditStudentDialog ref="editStudentDialog" />

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
                  <td>{{ teacher.id }}</td>
                  <td>
                    <h3>
                      <div class="links text-left">{{ teacher.name }}</div>
                    </h3>
                  </td>
                  <v-icon
                    @click="openTeacherEdit(index)"
                    icon="fa fa-edit pl-5 mt-2 mr-4"
                  />

                  <EditTeacherDialog ref="editTeacherDialog" />

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
import EditStudentDialog from "../assets/students/EditStudentDialog.vue";
import AddTeacherDialog from "../assets/teachers/AddTeacherDialog.vue";
import EditTeacherDialog from "../assets/teachers/EditTeacherDialog.vue";

export default {
  components: {
    AddStudentDialog,
    EditStudentDialog,
    AddTeacherDialog,
    EditTeacherDialog,
  },
  computed: {
    students() {
      return this.$store.getters.getStudents;
    },
    teachers() {
      return this.$store.getters.getTeachers;
    },
  },
  methods: {
    openStudentEdit(index) {
      this.$refs.editStudentDialog[index].open();
    },
    editStudentName(index, name) {
      this.$store.dispatch("editStudentName", { index, name });
    },
    deleteStudent(studentId) {
      this.$store.dispatch("deleteStudent", studentId);
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
  },
  created() {
    //  this.$store.dispatch("addStudentPost");
    this.$store.dispatch("listAllStudents");
    this.$store.dispatch("listAllTeachers");
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
