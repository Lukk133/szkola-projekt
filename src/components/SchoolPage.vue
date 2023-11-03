<template>
  <h1 class="text-center">Strona szkoły {{ $route.params.id }}</h1>

 <AddStudentDialog @addStudent="addStudent"/>

 <AddTeacherDialog @addTeacher="addTeacher"/>

  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
        <div>
<v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Imię i nazwisko ucznia
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in students" :key="student.name">

        <td>{{ student.id}}</td>
        <td>
          <h3 ><div class="links">{{ student.name }}</div></h3>
        </td>

      <EditStudentDialog @EditStudent = "addStudent" @OpenedDialog = "setStudentNumber(index)" :deafualtStudentName="student.name"/>

        <v-icon @click="deleteStudent(index)" icon="fa fa-trash pl-5 mt-2"/>
      </tr>
    </tbody>
  </v-table> </div>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <div>
            <v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Imię i nazwisko instruktora
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(teacher, index) in teachers" :key="teacher.name">

        <td>{{ teacher.id}}</td>
        <td>
         <h3 ><div class="links">{{ teacher.name }}</div></h3>
        </td>
       
        <EditTeacherDialog @EditTeacher = "addTeacher" @OpenedDialog = "setTeacherNumber(index)" :deafualtTeacherName="teacher.name"/>

        <v-icon @click="deleteTeacher(index)" icon="fa fa-trash pl-5 mt-2"/>
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
import AddStudentDialog from "../assets/AddStudent.vue"
import EditStudentDialog from "../assets/EditStudentDialog.vue"
import AddTeacherDialog from "../assets/AddTeacherDialog.vue"
import EditTeacherDialog from "../assets/EditTeacherDialog.vue"
import { onMounted } from "vue"



export default {
  components:{
    AddStudentDialog,
    EditStudentDialog,
    AddTeacherDialog,
    EditTeacherDialog
  },
  data(){
    return{
      studentNumber: 0,
      teacherNumber: 0,
      studentName: '',
      teacherName: '',
      editedTask1: null,
      editedTask2: null,
      students:[
      ],
      teachers:[
      ]
    }
  },
  props: ['id'],
  methods: {
    addStudent(studentName, editedTask1){
        if(!editedTask1){
          this.studentNumber += 1
        this.students.push({
          id: this.studentNumber,
          name: studentName
          }) 
        } else {
          this.students[this.indexStudentNumber].name = studentName
        }
      },
    deleteStudent(index){
      this.students.splice(index, 1)
    },
    setStudentNumber(index){
      this.indexStudentNumber = index
    },
    clearEdit(){   
        this.studentName = ''
    },
    addTeacher(teacherName, editedTask2){
        if(!editedTask2){
          this.teacherNumber += 1
        this.teachers.push({
          id: this.teacherNumber,
          name: teacherName
          }) 
        } else {
          this.teachers[this.indexTeacherNumber].name = teacherName
        }
      },
    deleteTeacher(index){
      this.teachers.splice(index, 1)
    },
    setTeacherNumber(index){
      this.indexTeacherNumber = index
    },
    clearEdit(){   
        this.teacherName = ''
    },
   
    } ,
    beforeCreate () {
  if (this.$store.state.isLogged === false) {
    this.$router.push('/')
  }
  }
}

</script>

<style>
a {
  text-decoration:none;
}
</style>