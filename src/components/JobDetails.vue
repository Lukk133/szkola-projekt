<template>
  <h1>Strona szkoły</h1>
  <p> Nazwa szkoły to  {{ $route.params.id }}</p>
</template>

<script>
export default {
  props: ['id'],
 /* data() { kazdy parametr teraz ma props: id (props: true)
    return {
      id: this.$route.params.id
    }
  }*/
}
</script>