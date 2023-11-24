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

                    <v-table class="mx-4">
                        <thead>
                            <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">Imię i nazwisko ucznia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) in students" :key="student.name">
                                <td v-if="$store.getters.getStudentsDisplayed === 'Wszystkich'">
                                    {{
                                        index + 1
                                    }}
                                </td>
                                <td v-if="$store.getters.getStudentsDisplayed != 'Wszystkich'">
                                    {{
                                        index + 1 + (studentsDisplayed * (studentPagination - 1))
                                    }}
                                </td>
                                <td>
                                    <h3>
                                        <div @click="goToProfile" class="links text-left">{{ student.name }}</div>
                                    </h3>
                                </td>

                                <v-icon @click="deleteStudent((studentId = student.id))" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>
                    </v-table>
                    <v-pagination v-model="studentPagination" :length="studentPaginationNumber"></v-pagination>
                    <v-select label="Ile uczniów chcesz wyświetlać na stronie" v-model="studentsDisplayed"
                        :items="['5', '10', '20', 'Wszystkich']"></v-select>
                </v-sheet>

            </v-col>
            <v-col>
                <v-sheet class=" pa-2 ma-2">
                    <v-table class="mx-4">
                        <thead>
                            <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">Imię i nazwisko instruktora</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="( teacher, index ) in  teachers " :key="teacher.name">
                                <td v-if="$store.getters.getTeachersDisplayed === 'Wszystkich'">
                                    {{
                                        index + 1
                                    }}
                                </td>
                                <td v-if="$store.getters.getTeachersDisplayed != 'Wszystkich'">
                                    {{
                                        index + 1 + (teachersDisplayed * (teacherPagination - 1))
                                    }}
                                </td>
                                <td>
                                    <h3>
                                        <div class="links text-left">{{ teacher.name }}</div>
                                    </h3>
                                </td>
                                <v-icon @click="deleteTeacher((teacherId = teacher.id))" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>
                    </v-table>
                    <v-pagination @click="listTeachers()" v-model="teacherPagination"
                        :length="teacherPaginationNumber"></v-pagination>
                    <v-select label="Ile instruktorów chcesz wyświetlać na stronie" v-model="teachersDisplayed"
                        :items="['5', '10', '20', 'Wszystkich']"></v-select>
                </v-sheet>
            </v-col>
            <v-responsive width="100%"></v-responsive>
        </v-row>
    </v-container>
    <v-btn @click="setUrlParams">Add params to url</v-btn>
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
        studentPaginationNumber() {
            const totalStudents = this.$store.getters.getTotalStudents;
            const studentsDisplayed = this.$store.getters.getStudentsDisplayed;
            return Math.ceil(totalStudents / studentsDisplayed);
        },
        teacherPaginationNumber() {
            const totalTeachers = this.$store.getters.getTotalTeachers;
            const teachersDisplayed = this.$store.getters.getTeachersDisplayed;
            return Math.ceil(totalTeachers / teachersDisplayed);
        }
    },
    data() {
        return {
            studentPagination: parseInt(localStorage.getItem("studentPage")) || 1,
            teacherPagination: parseInt(localStorage.getItem("teacherPage")) || 1,
            studentsDisplayed: parseInt(localStorage.getItem("studentSize")) || 5,
            teachersDisplayed: parseInt(localStorage.getItem("teacherSize")) || 5,
        };
    },
    methods: {
        goToProfile() {
            this.$router.push("profile")
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
        getSchool() {
            var schoolId = this.$route.params.id;
            this.$store.commit("setSchoolId", schoolId);
            this.$store.dispatch("findSchool", schoolId);
        },
        listStudents() {
            var schoolId = this.$route.params.id;
            var params = { schoolId: schoolId };
            this.$store.commit("setStudentsParams", params);
            this.$store.commit("setStudentPagination", this.studentPagination);
            this.$store.commit("setStudentsDisplayed", this.studentsDisplayed);
            this.$store.dispatch("listStudents");
            this.setUrlParams()
        },
        listTeachers() {
            const schoolId = this.$route.params.id;
            let params = { schoolId: schoolId };
            this.$store.commit("setTeachersParams", params);
            this.$store.commit("setTeachersPagination", this.teacherPagination);
            this.$store.commit("setTeachersDisplayed", this.teachersDisplayed);
            this.$store.dispatch("listTeachers");
            this.setUrlParams()
        },
        setUrlParams() {
            const studentPage = this.$store.getters.getStudentsPagination;
            const studentSize = this.$store.getters.getStudentsDisplayed;
            const teacherPage = this.$store.getters.getTeachersPagination;
            const teacherSize = this.$store.getters.getTeachersDisplayed;

            localStorage.setItem('studentPage', studentPage)
            localStorage.setItem('studentSize', studentSize)
            localStorage.setItem('teacherPage', teacherPage)
            localStorage.setItem('teacherSize', teacherSize)
            console.log(localStorage);

            this.$router.replace({ query: { studentPage, studentSize, teacherPage, teacherSize } });
            console.log("studentParams");
        },

    },
    watch: {
        studentsDisplayed: 'listStudents',
        studentPagination: 'listStudents',
        teachersDisplayed: 'listTeachers',
        teacherPagination: 'listTeachers',
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
