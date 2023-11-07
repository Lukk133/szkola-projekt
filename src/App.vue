<template>
  <nav>
   <!-- <router-link :to="{name: 'SchoolList'}">Lista szkół</router-link>-->
<router-link :to="{name: 'LoginPage'}"></router-link>

  </nav>
  <router-view/>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>


<!--logowanie dane-->