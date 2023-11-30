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
                            <tr v-for="(student, index) in students" :key="student.id">
                                <td>
                                    {{
                                        index + 1 + (studentsPagination.page - 1) * (studentsPagination.size)
                                    }}
                                </td>
                                <td>
                                    <h3>
                                        <div class="links text-left">{{
                                            student.name }}</div>
                                    </h3>
                                </td>
                                <!-- TODO -->
                                <!-- <DeleteDialog :label="`Studenta o id: ${student.id}`" @deleted="deleteStudent(student.id)" /> -->
                                <v-icon @click="deleteStudent(student.id)" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>
                    </v-table>
                    <v-pagination v-model="studentsPagination.page" :length="studentPaginationNumber"
                        @update:model-value="listStudents"></v-pagination>
                    <v-select label="Ile uczniów chcesz wyświetlać na stronie" v-model="studentsPagination.size"
                        :items="perPageOptions" item-title="label" item-value="value"
                        @update:model-value="changedStudentsPaginationSize"></v-select>
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
                                        <div class="links text-left">{{ teacher.name }}
                                        </div>
                                    </h3>
                                </td>
                                <!-- <DeleteDialog :label="`Instruktora o id: ${instruktor.id}`" @deleted="deleteTeacher(id)" /> -->
                                <v-icon @click="deleteTeacher(teacher.id)" icon="fa fa-trash pl-5 mt-2" />
                            </tr>
                        </tbody>
                    </v-table>
                    <v-pagination @click="listTeachers()" v-model="teacherPagination"
                        :length="teacherPaginationNumber"></v-pagination>
                    <v-select label="Ile instruktorów chcesz wyświetlać na stronie" v-model="teachersDisplayed"
                        :items="perPageOptions" item-title="label" item-value="value"></v-select>
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
    data() {
        return {
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
        students() {
            console.log("Computed students:", this.$store.getters.getStudents);
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
        teacherPaginationNumber() {
            const totalTeachers = this.$store.getters.getTotalTeachers;
            const teachersDisplayed = this.$store.getters.getTeachersDisplayed;
            return Math.ceil(totalTeachers / teachersDisplayed);
        },
        studentsOffset() {
            return
        }
    },
    methods: {
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
        changedStudentsPaginationSize() {
            this.studentsPagination.page = 1
            this.listStudents()
        },
        listStudents() {
            var schoolId = this.$route.params.id;
            var params = { schoolId: schoolId }; //TODO ustawić raz (dodatkowa metoda setSchoolId) 
            this.$store.commit("setStudentsParams", params);
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
            const studentPage = this.studentsPagination.page;
            const studentSize = this.studentsPagination.size;
            const teacherPage = this.$store.getters.getTeachersPagination;
            const teacherSize = this.$store.getters.getTeachersDisplayed;

            localStorage.setItem('studentPage', studentPage)
            localStorage.setItem('studentSize', studentSize)
            localStorage.setItem('teacherPage', teacherPage)
            localStorage.setItem('teacherSize', teacherSize)

            this.$router.replace({ query: { studentPage, studentSize, teacherPage, teacherSize } });
        },
        getUrlParams() {
            const params = this.$route.query
            console.log(params);
            const studentsParams = { page: params.studentPage, size: params.studentSize }
            const instructorsParams = { page: params.teacherPage, size: params.teacherSize }
            this.$store.commit("setTeachersPagination", instructorsParams);
            this.$store.commit("setStudentsPagination", studentsParams);
        }
    },
    watch: {
        teachersDisplayed: 'listTeachers',
        teacherPagination: 'listTeachers',
    },
    created() {
        this.setUrlParams()
        this.getUrlParams();
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
