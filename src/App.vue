<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link :to="{name: 'StronaSzkół'}">tam nie</router-link>
    <router-link :to="{name: 'ListaSzkół'}">Lista szkół</router-link>
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
</script><!-- <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>-->
