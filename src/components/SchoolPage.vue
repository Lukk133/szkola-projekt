<template>
  <h1 class="text-center">Strona szkoły {{ $route.params.id }}</h1>
  <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Ucznia"  style="left: 25%; transform: translateX(-25%)"> </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz imię i nazwisko ucznia" >
      <v-card-text >
        <v-text-field v-model="studentName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false,  addStudent(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
<v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Instruktora"  style="left: 60%; transform: translateX(-60%)"> </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz imię i nazwisko instruktora" >
      <v-card-text >
        <v-text-field v-model="teacherName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false, addTeacher(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

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
        <v-dialog @click:outside="closeDialog, clearEdit()" height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon  v-bind="props" @click="editStudentName(index)" icon="fa fa-edit pr-5 mt-2"/>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Edytuj dane ucznia" >
      <v-card-text >
        <v-text-field v-model="studentName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Edytuj"
          @click="isActive.value = false, addStudent(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
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
        <v-dialog @click:outside="closeDialog, clearEdit()" height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon  v-bind="props" @click="editTeacherName(index)" icon="fa fa-edit pr-5 mt-2"/>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Edytuj dane instruktora" >
      <v-card-text >
        <v-text-field v-model="teacherName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Edytuj"
          @click="isActive.value = false, addTeacher(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
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
export default {
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
    addStudent(){
      if(this.studentName.length === 0) return;
      if(this.editedTask1 === null){
        this.studentNumber += 1
      this.students.push({
        id: this.studentNumber,
        name: this.studentName
        })
      } else {
        this.students[this.editedTask1].name = this.studentName
        this.editedTask1 = null
      }
      this.studentName = ''
    },
    deleteStudent(index){
      this.students.splice(index, 1)
    },
    editStudentName(index){
      this.studentName = this.students[index].name
      this.editedTask1 = index
    },
    clearEdit(){   
        this.studentName = '',
        this.editedTask1 = null
    },
    addTeacher(){
      if(this.teacherName.length === 0) return;
      if(this.editedTask2 === null){
        this.teacherNumber += 1
      this.teachers.push({
        id: this.teacherNumber,
        name: this.teacherName
        })
      } else {
        this.teachers[this.editedTask2].name = this.teacherName
        this.editedTask2 = null
      }
      this.teacherName = ''
    },
    deleteTeacher(index){
      this.teachers.splice(index, 1)
    },
    editTeacherName(index){
      this.teacherName = this.teachers[index].name
      this.editedTask2 = index
    },
    clearEdit(){   
        this.teacherName = '',
        this.editedTask2 = null
    },
    } 
  }

</script>

<style>
a {
  text-decoration:none;
}
</style>