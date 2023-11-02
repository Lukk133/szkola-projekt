<template>
    <DialogSchool @addSchool = "addSchool"/>
   
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
  
      <tr v-for="(school, index) in schools" :key="school.name">
        <td>{{ school.id }}</td>
        <td>
      <RouterLink  :to="{ name: 'SchoolPage', params: { id:school.name } }">
            <h2><div type="input" @click="goToSchoolPage()" class="links">{{ school.name }}</div>
            </h2>
          </RouterLink>
        </td>

<EditSchool @EditSchool = "addSchool" @OpenedDialog = "setSchoolNumber(index)" :deafualtSchoolName="school.name"/>

        <v-icon @click="deleteSchool(index)" icon="fa fa-trash pl-5 mt-2"/>
      </tr>
    </tbody>
  </v-table>

</template>

<script>
import DialogSchool from "../assets/AddSchoolDialog.vue"
import EditSchool from "../assets/EditSchoolDialog.vue"

export default {
  components:{
    DialogSchool,
    EditSchool
  },
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
      addSchool(schoolName, editedTask){
        if(!editedTask){
          this.schoolNumber += 1
        this.schools.push({
          id: this.schoolNumber,
          name: schoolName
          }) 
        } else {
          this.schools[this.schoolNumber].name = schoolName
        }
        
      },
      deleteSchool(index){
      this.schools.splice(index, 1)
    },
    setSchoolNumber(index){
      this.schoolNumber = index
    },
    clearEdit(){   
        this.schoolName = ''
    }
    }
  }



</script>

<style>
.links{
  color: black;
}
</style>