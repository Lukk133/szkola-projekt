<template>
  <v-snackbar
    v-model="showAlertName"
    class="text-center"
    timeout="3000"
    color="red"
    top
  >
    {{ alertMessage }}
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    showAlertName() {
      return this.$store.getters.getShowAlertName;
    },
    alertMessage() {
      return this.$store.getters.getAlertMessageName;
    },
  },
};
</script>
