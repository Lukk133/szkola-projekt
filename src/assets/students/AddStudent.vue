<template>
  <v-dialog height="450" width="500" v-model="dialog">
    <template v-slot:activator="{}">
      <v-btn
        @click="open"
        class="mt-4"
        size="x-large"
        text="Dodaj Ucznia"
        style="left: 25%; transform: translateX(-25%)"
      >
      </v-btn>
    </template>
    <template v-slot:default="{}">
      <v-card title="Wpisz imię i nazwisko ucznia">
        <v-card-text>
          <v-text-field v-model="student.name"></v-text-field>
          <v-card title="Wpisz email ucznia"></v-card>
          <v-text-field v-model="student.email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <p
            class="ma-3 ml-4 mb-10 font-weight-black"
            style="color: red"
            v-if="checkEmail"
          >
            Nieprawidłowe dane lub email
          </p>
          <v-spacer></v-spacer>
          <v-btn
            size="large"
            class="ma-3 ml-4 mb-10"
            text="Dodaj"
            @click="save"
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
      dialog: false,
      checkEmail: false,
    };
  },
  computed: {
    student() {
      return this.$store.getters.getStudent;
    },
  },
  methods: {
    open() {
      this.dialog = true;
      this.$store.commit("initStudent");
    },
    save() {
      const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
      if (!emailRegex.test(this.student.email) || this.student.name === "") {
        this.checkEmail = true;
      } else {
        this.$store.dispatch("addStudentPost");
        this.checkEmail = false;
        this.close();
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
