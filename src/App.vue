<template>
  <nav>
    <router-link :to="{name: 'SchoolList'}">Lista szkół</router-link>
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