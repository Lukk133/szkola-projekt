<template>
  <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn @click="teacherNameReset" class="mt-4" size="x-large" v-bind="props" text="Dodaj Instruktora"  style="left: 60%; transform: translateX(-60%)"> </v-btn>
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
          @click="$store.dispatch('addTeacher', this.teacherName), isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script>
export default{
  methods:{
      teacherNameReset(){
      this.teacherName = ''
    }
  } 
}
</script>