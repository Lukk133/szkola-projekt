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
          @click="isActive.value = false, dodajSzkołę(index)"
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
  
      <tr v-for=" item in szkoły" :key="item.name">

        <td>{{ item.id }}</td>
        <td>
      <RouterLink  :to="{ name: 'JobDetails', params: { id:item.id } }">
            <h2><div @click="goToSchoolPage()" class="links">{{ item.nazwa }}</div></h2>
          </RouterLink>
        </td>
      </tr>
    </tbody>

  </v-table>
</template>

<script>
export default {
  data(){
    return{
      numerSzkoly: 5,
        szkoły: [
          {
            id: 1,
            nazwa: 'XIV LO im. Stanisława Staszica',
          },
          {
            id: 2,
            nazwa: '	V LO im. Augusta Witkowskiego',
          },
          {
            id: 3,
            nazwa: 'XIII LO',
    
          },
          {
            id: 4,
            nazwa: 'Uniwersyteckie LO',
    
          },
          {
            id: 5,
            nazwa: 'III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP',
    
          }
        ]
    }
  },
  
  methods:{
    goToSchoolPage() {
        this.$router.push(`/${this.szkoły.id}`);
      },
      dodajSzkołę(){
        this.numerSzkoly += 1
        this.szkoły.push({
          id: this.numerSzkoly,
          nazwa: this.schoolName
          })
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