<template>
    <h1 class="text-center">
        Strona szkoły
        {{ school.name }}
    </h1>
    <AddStudentDialog />
    <DeleteStudent ref="deleteStudentDialog" />
    <DeleteTeacher ref="deleteTeacherDialog" />
    <AddTeacherDialog />

    <v-container>
        <v-row no-gutters>
            <v-col>
                <v-sheet class="pa-2 ma-2">
                    <v-text-field v-model="searchStudent" @input="searchStudents"
                        placeholder="Wyszukaj ucznia po imieniu"></v-text-field>
                    <v-table class="mx-4">
                        <thead>
                            <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">Imię i nazwisko ucznia</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) in filteredStudents" :key="student.id">
                                <td>
                                    {{
                                        index + 1 + (studentsPagination.page - 1) * (studentsPagination.size)
                                    }}
                                </td>
                                <td>
                                    <h3>
                                        <div class="links text-left">{{ student.name }}</div>
                                    </h3>
                                </td>
                                <v-icon @click="openDeleteStudentDialog(student.id)" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>

                    </v-table>
                    <v-pagination v-model="studentsPagination.page" :length="studentPaginationNumber"
                        @update:model-value="listStudents"></v-pagination>
                    <v-select label="Ile uczniów chcesz wyświetlać na stronie" v-model="studentsPagination.size"
                        :items="dynamicPerPageStudents" item-title="label" item-value="value"
                        @update:model-value="changedStudentsPaginationSize"></v-select>
                </v-sheet>

            </v-col>
            <v-col>
                <v-sheet class=" pa-2 ma-2">
                    <v-text-field v-model="searchTeacher" @input="searchTeachers"
                        placeholder="Wyszukaj instruktora po imieniu"></v-text-field>
                    <v-table class="mx-4">
                        <thead>
                            <tr>
                                <th class="text-left">#</th>
                                <th class="text-left">Imię i nazwisko instruktora</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="( teacher, index ) in  filteredTeachers " :key="teacher.id">
                                <td>
                                    {{
                                        index + 1 + (teachersPagination.page - 1) * (teachersPagination.size)
                                    }}
                                </td>
                                <td>
                                    <h3>
                                        <div class="links text-left">{{ teacher.name }}
                                        </div>
                                    </h3>
                                </td>
                                <v-icon @click="openDeleteTeacherDialog(teacher.id)" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>
                    </v-table>
                    <v-pagination @update:model-value="listTeachers" v-model="teachersPagination.page"
                        :length="teacherPaginationNumber"></v-pagination>
                    <v-select label="Ile instruktorów chcesz wyświetlać na stronie" v-model="teachersPagination.size"
                        :items="dynamicPerPageTeachers" item-title="label" item-value="value"
                        @update:model-value="changedTeachersPaginationSize"></v-select>
                </v-sheet>
            </v-col>
            <v-responsive width="100%"></v-responsive>
        </v-row>
    </v-container>
</template>

<script>
import AddStudentDialog from "../assets/students/AddStudent.vue";
import AddTeacherDialog from "../assets/teachers/AddTeacherDialog.vue";
import DeleteStudent from "../assets/students/DeleteStudent.vue";
import DeleteTeacher from "../assets/teachers/DeleteTeacher.vue";

export default {
    components: {
        AddStudentDialog,
        AddTeacherDialog,
        DeleteStudent,
        DeleteTeacher,
    },
    data() {
        return {
            searchStudent: "",
            searchTeacher: "",
            studentsPaginationData: 1,
            teacherPagination: 1,
            studentsDisplayed: 5,
            teachersDisplayed: 5,
            perPageOptions: [
                {
                    label: "5",
                    value: 5
                },
                {
                    label: "10",
                    value: 10
                },
                {
                    label: "20",
                    value: 20
                },
                {
                    label: "Wszyscy",
                    value: 100
                },
            ]
        };
    },
    computed: {
        dynamicPerPageStudents() {
            return this.searchStudent ? [{ label: "Wszyscy", value: 100 }] : this.perPageOptions;
        },
        dynamicPerPageTeachers() {
            return this.searchTeacher ? [{ label: "Wszyscy", value: 100 }] : this.perPageOptions;
        },
        filteredStudents() {
            const searchStudent = this.searchStudent.toLowerCase();
            return this.students.filter(student => student.name.toLowerCase().includes(searchStudent));
        },
        filteredTeachers() {
            const searchTeacher = this.searchTeacher.toLowerCase();
            return this.teachers.filter(teacher => teacher.name.toLowerCase().includes(searchTeacher));
        },
        students() {
            return this.$store.getters.getStudents;
        },
        school() {
            return this.$store.getters.getSchool;
        },
        teachers() {
            return this.$store.getters.getTeachers;
        },
        studentsPagination() {
            return this.$store.getters.getStudentsPagination
        },
        studentPaginationNumber() {
            const totalStudents = this.$store.getters.getTotalStudents;
            const studentsDisplayed = this.studentsPagination.size;
            return Math.ceil(totalStudents / studentsDisplayed);
        },
        teachersPagination() {
            return this.$store.getters.getTeachersPagination
        },
        teacherPaginationNumber() {
            const totalTeachers = this.$store.getters.getTotalTeachers;
            const teachersDisplayed = this.teachersPagination.size
            return Math.ceil(totalTeachers / teachersDisplayed);
        },
        studentsOffset() {
            return
        }
    },
    methods: {
        openDeleteStudentDialog(studentId) {
            this.$store.commit("setStudentId", studentId)
            this.$refs.deleteStudentDialog.open(studentId);
        },
        openDeleteTeacherDialog(teacherId) {
            this.$store.commit("setTeacherId", teacherId)
            this.$refs.deleteTeacherDialog.open(teacherId);//teacherId chyba nie potrzebne
        },
        searchStudents() {
            this.listStudents(this.searchStudent)
        },
        searchTeachers() {
            this.listTeachers(this.searchTeacher)
        },
        getSchool() {
            var schoolId = this.$route.params.id;
            this.$store.commit("setSchoolId", schoolId);
            this.$store.dispatch("findSchool", schoolId);
        },
        changedStudentsPaginationSize() {
            this.studentsPagination.page = 1
            this.listStudents()
        },
        changedTeachersPaginationSize() {
            this.teachersPagination.page = 1
            this.listTeachers()
        },
        setSchoolId() {

        },
        listStudents(searchStudent) {
            var schoolId = this.$route.params.id;
            var params = { schoolId: schoolId, search: searchStudent };
            this.$store.commit("setStudentsParams", params);
            this.$store.dispatch("listStudents", searchStudent);
            this.setUrlParams(); //TODO ustawić raz (dodatkowa metoda setSchoolId) 
        },
        listTeachers(searchTeacher) {
            var schoolId = this.$route.params.id;
            var params = { schoolId: schoolId, search: searchTeacher };
            this.$store.commit("setTeachersParams", params);
            this.$store.dispatch("listTeachers", searchTeacher);
            this.setUrlParams();
        },
        setUrlParams() {
            const searchStudent = this.searchStudent;
            const searchTeacher = this.searchTeacher;

            const studentPage = this.studentsPagination.page;
            const studentSize = this.studentsPagination.size;
            const teacherPage = this.teachersPagination.page
            const teacherSize = this.teachersPagination.size

            localStorage.setItem('studentSize', studentSize);
            localStorage.setItem('studentPage', studentPage);
            localStorage.setItem('teacherPage', teacherPage);
            localStorage.setItem('teacherSize', teacherSize);

            this.$router.replace({ query: { studentPage, studentSize, teacherPage, teacherSize, searchStudent, searchTeacher } });
        },


        getUrlParams() {
            const params = this.$route.query
            const studentsParams = { page: params.studentPage, size: params.studentSize }
            const instructorsParams = { page: params.teacherPage, size: params.teacherSize }
            this.$store.commit("setTeachersPagination", instructorsParams);
            this.$store.commit("setStudentsPagination", studentsParams);
        }
    },
    created() {
        this.setUrlParams()
        this.getUrlParams();
        this.getSchool();
        this.listStudents();
        this.listTeachers();

    },
};

</script>

<style>
a {
    text-decoration: none;
}
</style>
