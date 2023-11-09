<template>
<v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Szkołę"  style="left: 50%; transform: translateX(-50%)" @click="schoolNameReset">
    </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz nazwę szkoły" >
      <v-card-text >
        <v-text-field  v-model="schoolName" @input="updateSchoolName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false, $store.dispatch('addSchool', this.schoolName)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
 </template>
 
 <script>
export default{
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