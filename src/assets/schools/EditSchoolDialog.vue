<template>
  <v-dialog height="450" width="500">
    <template v-slot:activator="{ props }">
      <v-icon @click=" $store.dispatch('editSchool', index)" v-bind="props" icon="fa fa-edit pr-5 mt-2" />
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Edytuj nazwę szkoły">
        <v-card-text>
          <v-text-field v-model="schoolName"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            size="large"
            class="ma-3 ml-4 mb-10"
            text="Edytuj"
            @click="updateSchoolName(index, schoolName), isActive = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      schoolName: this.defaultSchoolName,
    };
  },
  props:
   ["defaultSchoolName", "index"],
   
  computed: {
    schools() {
      return this.$store.getters.getSchools;
    },
  },
  methods: {
    updateSchoolName(index, schoolName) {
    this.$store.dispatch('updateSchoolName', { index, name: schoolName });
  }
  },
};
</script>
