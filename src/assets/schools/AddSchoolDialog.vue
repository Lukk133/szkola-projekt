<template>
<v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn @click="open" class="mt-4" size="x-large" v-bind="props" text="Dodaj Szkołę"  style="left: 50%; transform: translateX(-50%)" >
    </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
  
    <v-card title="Wpisz nazwę szkoły" >
      <v-card-text >
        <input class="mt-5 ml-1" v-model="schoolName" placeholder="nazwa szkoły"/>
      </v-card-text>
      <v-card-actions>
        <v-select
        class="ml-4 mt-5 mb-9 w-50 h-50"
  label="Wybierz miasto"
  :items="cities"
  v-model="selectedCity"
></v-select ><!--cities-->
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false, $store.dispatch('addSchool', {
  schoolName: this.schoolName,
  selectedCity: this.selectedCity
    })"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
 </template>
 
 <script>

export default{
  data() {
  return {
    selectedCity: null,
  }
},
  computed:{
    cities(){
      return this.$store.getters.getCities
    }
  },
  methods:{
    schoolNameReset(){
      this.schoolName = ''
    },
    open(){
     this.schoolNameReset()
      this.listCities()
    },
    listCities(){
      this.$store.dispatch("listCities")
    },
    updateMessage(event) {
      this.$store.commit('updateMessage', event.target.value)
    }
    
  }
}

 </script>