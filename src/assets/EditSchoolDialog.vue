<template>
          <v-dialog @click:outside="clearEdit()" height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon @click="setDefaultName"  v-bind="props" icon="fa fa-edit pr-5 mt-2"/>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Edytuj nazwę szkoły" >
      <v-card-text >
        <v-text-field v-model="schoolName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Edytuj"
          @click="editSchool(), isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script>
  export default{
    props:["deafualtSchoolName"],
    data(){
      return{
        schoolName: ''
      }
    },
    methods:{
      editSchool(){
      console.log('halo');
      this.$emit('EditSchool', this.schoolName, true)
    },
    clearEdit(){   
        this.schoolName = ''
    },
    setDefaultName(){
     this.schoolName = this.deafualtSchoolName
     this.$emit('OpenedDialog')
    },
    setSchoolNumber(index){
      this.schoolNumber = index
    },
  }
}

</script>




