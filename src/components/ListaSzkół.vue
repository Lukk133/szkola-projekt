<template>
  <v-btn @click="goToAboutPage" size="x-large" class="mt-4" style="left: 50%; transform: translateX(-50%)">Dodaj Szkołę</v-btn>
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
      <tr
        v-for="item in szkoły"
        :key="item.name"
      >
      
        <td @click="goToAboutPage">{{ item.id }}</td>
        <td><RouterLink :to=" { name: 'JobDetails', params: {id: item.nazwa}}">
      <h2>{{ item.nazwa }}</h2>
    </RouterLink></td>
      </tr>
    </tbody>
    
  </v-table>

</template>

<script>
export default {
  data(){
    return {
      numerSzkoly: 5,
      szkoły: [
      {
        id: 1,
        nazwa: 'XIV LO im. Stanisława Staszica',
        miejscowość: 'Warszawa'
      },
      {
        id: 2,
        nazwa: '	V LO im. Augusta Witkowskiego',
        miejscowość: 'Kraków'
      },
      {
        id: 3,
        nazwa: 'XIII LO',
        miejscowość: 'Szczecin'
      },
      {
        id: 4,
        nazwa: 'Uniwersyteckie LO',
        miejscowość: 'Toruń'
      },
      {
        id: 5,
        nazwa: 'III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP',
        miejscowość: 'Gdynia'
      }
    ]
    }
  },
  methods: {
    goToAboutPage() {
  this.$router.push("/about");
}
  }
}




</script>

<!--
  ,
      {
        numer: 6,
        name: 'LO nr III im. Adama Mickiewicza',
        miejscowość: 'Wrocław'
      },
      {
        numer: 7,
        name: 'IX LO im. Klementyny Hoffmanowej',
        miejscowość: 'Warszawa'
      },
      {
        numer: 8,
        name: 'Akademickie LO PWr',
        miejscowość: 'Wrocław'
      },
      {
        numer: 9,
        name: 'II LO z Oddz. Dwujęz. im. Stefana Batorego',
        miejscowość: 'Warszawa'
      },
      {
        numer: 10,
        name: 'VIII LO im. Władysława IV',
        miejscowość: 'Warszawa'
      },
      {
        numer: 11,
        name: 'Społeczne LO nr 5 STO',
        miejscowość: 'Milanówek'
      },
      {
        numer: 12,
        name: 'II LO im. Księżnej Anny z Sapiehów Jabłonowskiej',
        miejscowość: 'Białystok'
      },
      {
        numer: 13,
        name: 'Publiczne LO Politechniki Łódzkiej',
        miejscowość: 'Łódź'
      },
      {
        numer: 14,
        name: 'I Społeczne LO im. Hetmana Jana Tarnowskiego',
        miejscowość: 'Tarnobrzeg'
      },
      {
        numer: 15,
        name: 'Społeczne LO nr 4 im. Batalionu AK "Parasol"',
        miejscowość: 'Warszawa'
      }
-->