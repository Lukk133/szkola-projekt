<template>
  <v-snackbar v-model="showAlert" :color="getColor()" top>
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
  methods: {
    getColor() {
      if (this.alertMessage.includes("pomyślnie")) {
        return "green";
      } else {
        return "red";
      }
    },
    hideAlert() {
      this.$store.commit("setShowAlert", false);
    },
  },
  watch: {
    showAlert(newVal) {
      if (newVal) {
        setTimeout(this.hideAlert, 3000);
      }
    },
  },
};
</script>
