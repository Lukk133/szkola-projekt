<template>
  <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon @click=" $store.dispatch('editStudent', index)" v-bind="props" icon="fa fa-edit pr-5 mt-2"/>
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
        @click="updateStudentName(index, studentName), isActive = false"
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
      studentName: this.defaultStudentName,
    };
  },
  props:
   ["defaultStudentName", "index"],

  computed: {
    schools() {
      return this.$store.getters.getStudents;
    },
  },
  methods: {
    updateStudentName(index, studentName) {
    this.$store.dispatch('updateStudentName', { index, name: studentName });
  }
  },
};

</script>