<template>
  <div>
    
    <v-card
      class="mx-auto pa-12 pb-8 logo"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Wpisz login</div>
<!-- prepend-inner-icon="mdi-email-outline"-->
      <v-text-field
      v-model="userLogin"
        density="compact"
        placeholder="Login"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Wpisz hasło
      </div>
      <v-text-field
      v-model="userPassword"
      :append-inner-icon="visible ? 'fa-solid fa-eye mb-1' : 'fa-solid fa-eye-low-vision mb-1'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Hasło"
        variant="outlined"
        @click:append-inner="visible = !$store.state.visible"
      ></v-text-field>
      <div :hidden="!$store.state.showAlert" class="ml-7" style="color:red" >Login i hasło musi mieć od 5 do 50 znaków</div>
      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login()"
      >
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const visible = ref(false)
</script>

<script>
  export default {
    data(){
      return{
        userLogin: '',
        userPassword: '',
        
      }
    },
    methods:{
      login(){
        if(this.userLogin.length <=5 || this.userPassword.length <=5
        || this.userLogin.length >=50 || this.userPassword.length >=50){this.$store.state.showAlert = true} 
        else{
          this.$store.state.isLogged = true
          this.$router.push(`/SchoolList`);
          

        }
      }
    }
  }
</script>

<style>
.logo {
  position: relative;
  
  top: 10em;
}
</style>


