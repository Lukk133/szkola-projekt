<template>
  <h1 class="text-center">Strona szkoły {{ $route.params.id }}</h1>
  <v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Ucznia"  style="left: 25%; transform: translateX(-25%)"> </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz nazwę szkoły" >
      <v-card-text >
        <v-text-field v-model="imieUcznia"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false,  dodajUcznia(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
<v-dialog height="450" width="500">
  <template v-slot:activator="{ props }">
    <v-btn class="mt-4" size="x-large" v-bind="props" text="Dodaj Instruktora"  style="left: 60%; transform: translateX(-60%)"> </v-btn>
  </template>
  <template v-slot:default="{ isActive }">
    <v-card title="Wpisz nazwę szkoły" >
      <v-card-text >
        <v-text-field v-model="imieInstruktora"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        size="large"
        class="ma-3 ml-4 mb-10"
          text="Dodaj"
          @click="isActive.value = false, dodajInstruktora(index)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </template>
</v-dialog>

  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
        <div>
<v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Imię i nazwisko ucznia
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="uczen in uczniowie" :key="uczen.name">

        <td>{{ uczen.id}}</td>
        <td>
          <h3 ><div class="links">{{ uczen.name }}</div></h3>
         
        </td>
      </tr>
    </tbody>
  </v-table> </div>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <div>
            <v-table class="mx-4">
    <thead>
      <tr>
        <th class="text-left">
          #
        </th>
        <th class="text-left">
          Imię i nazwisko instruktora
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="instruktor in instruktorzy" :key="instruktor.name">

        <td>{{ instruktor.id}}</td>
        <td>
         <h3 ><div class="links">{{ instruktor.name }}</div></h3>
        </td>
      </tr>
    </tbody>
  </v-table> 
          </div>
        </v-sheet>
      </v-col>
      <v-responsive width="100%"></v-responsive>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data(){
    return{
      numerUcznia: 0,
      numerInstruktora: 0,
      imieUcznia: '',
      imieInstruktora: '',
      uczniowie:[{
   
      }],
      instruktorzy:[{

      }]

    }
  },
  props: ['id'],
  methods: {
    dodajUcznia(){
      if(this.imieUcznia.length === 0) return;
      this.numerUcznia += 1
      this.uczniowie.push({
        id: this.numerUcznia,
        name: this.imieUcznia
        })
      this.imieUcznia = ''
    },
    dodajInstruktora(){
      if(this.imieInstruktora.length === 0) return;
      this.numerInstruktora += 1
      this.instruktorzy.push({
        id: this.numerInstruktora,
        name: this.imieInstruktora
        })
      this.imieInstruktora = ''
    
    }
  }
}

</script>
