import axios from "axios";

export default {
  state: {
    cities: []
  },
  getters: {
    getCities: state => state.cities
  },
  mutations:{
    setCities(state, data){
      state.cities = data
    }
  },
  actions: {
    listCities(state){
      axios.post('https://countriesnow.space/api/v0.1/countries/cities',
      { country: "malta" }).then(response => {
        state.commit("setCities", response.data)
      }).catch(error => {
        console.log(error);
      })
    }
  }
}