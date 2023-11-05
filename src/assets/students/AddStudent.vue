<template>
 <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn @click="studentNameReset" class="mt-4" size="x-large" v-bind="props" text="Dodaj Ucznia"  style="left: 25%; transform: translateX(-25%)"> </v-btn>
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
          @click="isActive.value = false,  addStudent()"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

</template>

<script>
export default{
  data(){
    return{
      studentName: '',
      studentNumber: 0
    }
  },
  methods:{
    addStudent(){
      this.$emit('addStudent', this.studentName, false)
    },
    studentNameReset(){
      this.studentName = ''
    }
  }
}
</script>