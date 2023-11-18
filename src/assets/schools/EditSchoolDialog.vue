<template>
  <v-dialog height="450" width="500" v-model="dialog">
    <template v-slot:activator="{}"> </template>
    <template v-slot:default="{}">
      <v-card title="Edytuj nazwę szkoły">
        <v-card-text>
          <v-text-field v-model="school.name"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            size="large"
            class="ma-3 ml-4 mb-10"
            text="Edytuj"
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
    };
  },
  computed: {
    school() {
      return this.$store.getters.getSchool;
    },
  },
  methods: {
    open() {
      this.dialog = true;
    },
    save() {
      this.school = this.newSchool;
      this.close();
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
