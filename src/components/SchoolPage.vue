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
      <tr v-for="student in students" :key="student.name">

        <td>{{ student.id}}</td>
        <td>
          <h3 ><div class="links">{{ student.name }}</div></h3>
         
        </td>
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
      <tr v-for="teacher in teachers" :key="teacher.name">

        <td>{{ teacher.id}}</td>
        <td>
         <h3 ><div class="links">{{ teacher.name }}</div></h3>
        </td>
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
      this.studentNumber += 1
      this.students.push({
        id: this.studentNumber,
        name: this.studentName
        })
      this.studentName = ''
    },
    addTeacher(){
      if(this.teacherName.length === 0) return;
      this.teacherNumber += 1
      this.teachers.push({
        id: this.teacherNumber,
        name: this.teacherName
        })
      this.teacherName = ''
    
    }
  }
}

</script>

<style>
a {
  text-decoration:none;
}
</style>