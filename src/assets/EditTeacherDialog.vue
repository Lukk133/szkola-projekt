<template>
 <v-dialog @click:outside="closeDialog, clearEdit()" height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-icon  v-bind="props" @click="setDefaultName" icon="fa fa-edit pr-5 mt-2"/>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Edytuj dane instruktora" >
      <v-card-text >
        <v-text-field v-model="teacherName"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Edytuj"
          @click="editTeacher(), isActive.value = false"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

</template>

<script>
export default{
  props:["deafualtTeacherName"],
    data(){
      return{
        teacherName: ''
      }
    },
    methods:{
      editTeacher(){
      this.$emit('EditTeacher', this.teacherName, true)
    },
    clearEdit(){   
        this.teacherName = ''
    },
    setDefaultName(){
     this.teacherName = this.deafualtTeacherName
     this.$emit('OpenedDialog')
    },
    setTeacherNumber(index){
      this.indexTeacherNumber = index
    },
  }

}
</script>