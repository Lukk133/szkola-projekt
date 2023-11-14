<template>
  <v-dialog height="450" width="500" v-model="dialog">
  <template v-slot:activator="{ }">
    <v-btn @click="open" class="mt-4" size="x-large" text="Dodaj Instruktora"  style="left: 60%; transform: translateX(-60%)"> </v-btn>
  </template>
  <template v-slot:default="{ }">
    <v-card title="Wpisz imię i nazwisko instruktora" >
      <v-card-text >
        <v-text-field v-model="teacher.name"></v-text-field>
      </v-card-text>
      <v-card-actions>
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
export default{
  data(){
    return{
      dialog: false
    }
  },
  computed: {
    teacher(){
     return this.$store.getters.getTeacher
    }
  },
  methods:{
    open(){
      this.dialog = true
      this.$store.commit("initTeacher")
    },
    save(){
      this.$store.dispatch("addTeacher")
      this.close()
    },
    close(){
      this.dialog = false
    }
    }
  } 

</script>