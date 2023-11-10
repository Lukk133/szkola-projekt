import axios from "axios";

export default {
  state: {
    cities: [],
  },
  getters: {
    getCities: (state) => state.cities,
  },
  mutations: {
    setCities(state, data) {
      state.cities = data;
    },
  },
  actions: {
    listCities({ commit }) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/cities", {
          country: "malta",
        })
        .then((response) => {
          //     console.log(response.data.data.map((city) => city));
          const cities = response.data.data.map((city) => city);
          commit("setCities", cities);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

/*   addCity({ state, commit }, cityName) {
      const newCity = {
        name: cityName,
      };
      commit("setCities", [...state.cities, newCity]);*/
