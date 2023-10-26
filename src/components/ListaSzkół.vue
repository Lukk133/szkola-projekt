<template>
  <v-btn @click="dodajSzkołę()" size="x-large" class="mt-4" style="left: 50%; transform: translateX(-50%)">Dodaj
    Szkołę</v-btn>
  <v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Nazwa szkoły
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in szkoły" :key="item.name">

        <td @click="goToSchoolPage()">{{ item.id }}</td>
        <td>
          <RouterLink :to="{ name: 'JobDetails', params: { id: item.nazwa } }">
            <h2>{{ item.nazwa }}</h2>
          </RouterLink>
        </td>
      </tr>
    </tbody>

  </v-table>
</template>

<script>
export default {
  data() {
    return {
      numerSzkoly: 5,
      szkoły: [
        {
          id: 1,
          nazwa: 'XIV LO im. Stanisława Staszica',
        },
        {
          id: 2,
          nazwa: '	V LO im. Augusta Witkowskiego',
        },
        {
          id: 3,
          nazwa: 'XIII LO',

        },
        {
          id: 4,
          nazwa: 'Uniwersyteckie LO',

        },
        {
          id: 5,
          nazwa: 'III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP',

        }
      ]
    }
  },
  methods: {
    goToSchoolPage() {
      this.$router.push(`/${this.szkoły.id}`);
    },
    dodajSzkołę(){
      this.numerSzkoly += 1
      this.szkoły.push({
        id: this.numerSzkoly,
        nazwa: 'kolejna szkoła'
        })
    }
  }
}


</script>

<style>
.linki {
  font-weight: bold;
  text-decoration: none;
}
</style>