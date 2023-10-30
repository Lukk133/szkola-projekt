<template>
  <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Szkołę"  style="left: 50%; transform: translateX(-50%)"> </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz nazwę szkoły" >
      <v-card-text >
        <v-text-field v-model="schoolName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false, addSchool(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
  <v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Nazwa szkoły
        </th>
      </tr>
    </thead>
 
  <tbody>
  
      <tr v-for=" (school, index) in schools" :key="school.name">
        <td>{{ school.id }}</td>
        <td>
      <RouterLink  :to="{ name: 'SchoolPage', params: { id:school.name } }">
            <h2><div type="input" @click="goToSchoolPage()" class="links">{{ school.name }}</div>
            </h2>
            <!--textArea-->
          </RouterLink>
        </td>
        <v-dialog @click:outside="closeDialog, clearEdit()" height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon  v-bind="props" @click="editSchoolName(index)" icon="fa fa-edit pr-5 mt-2"/>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Edytuj nazwę szkoły" >
      <v-card-text >
        <v-text-field v-model="schoolName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Edytuj"
          @click="isActive.value = false, addSchool(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
        <v-icon @click="deleteSchool(index)" icon="fa fa-trash pl-5 mt-2"/>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      schoolName: '',
      schoolNumber: 5,
      editedTask: null,
      editedSchoolName: '',
      schools: [
          {
            id: 1,
            name: 'XIV LO im. Stanisława Staszica',
          },
          {
            id: 2,
            name: '	V LO im. Augusta Witkowskiego',
          },
          {
            id: 3,
            name: 'XIII LO',
    
          },
          {
            id: 4,
            name: 'Uniwersyteckie LO',
    
          },
          {
            id: 5,
            name: 'III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP',
          }
        ]
    }
  },
  
  methods:{
    goToSchoolPage() {
        this.$router.push(`/${this.schools.name}`);
      },
      addSchool(){
        if(this.editedTask === null){
          this.schoolNumber += 1
        this.schools.push({
          id: this.schoolNumber,
          name: this.schoolName
          }) 
        } else {
          this.schools[this.editedTask].name = this.schoolName
        this.editedTask = null
        }
        this.schoolName = ''
      },
      deleteSchool(index){
      this.schools.splice(index, 1)
    },
    editSchoolName(index){
      this.schoolName = this.schools[index].name
      this.editedTask = index
    },
    clearEdit(){   
        this.schoolName = '',
        this.editedTask = null
    }
    }
  }



</script>

<style>
.links{
  color: black;
}
</style>