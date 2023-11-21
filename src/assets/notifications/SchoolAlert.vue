<template>
  <v-snackbar v-model="showSchoolAlert" class="text-center" timeout="3000" color="red" top>
    {{ schoolAlert }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    showSchoolAlert() {
      return this.$store.getters.getShowSchoolAlert;
    },
    schoolAlert() {
      return this.$store.getters.getSchoolAlert;
    },
  },
};
</script>
