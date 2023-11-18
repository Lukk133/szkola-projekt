<template>
  <v-snackbar v-model="showAlert" timeout="3000" color="red" top>
    {{ alertMessage }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    showAlert() {
      return this.$store.getters.getShowAlert;
    },
    alertMessage() {
      return this.$store.getters.getAlertMessage;
    },
  },
};
</script>
