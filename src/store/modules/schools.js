export default {
  state: {
    indexSchoolNumber: '',
    schoolNumber: 5,
    schoolName: '',
    schools: [
      {
        id: 1,
        name: 'XIV LO im. Stanisława Staszica',
      },
      {
        id: 2,
        name: 'V LO im. Augusta Witkowskiego',
      },
      {
        id: 3,
        name: 'XIII LO',
      },
      {
        id: 4,
        name: 'Uniwersyteckie LO',
      },
      {
        id: 5,
        name: 'III LO z Oddz. Dwujęz. im. Marynarki Wojennej RP',
      },
    ],
  },
  getters: {
    getSchools: (state) => state.schools,
    getSchoolNumber: (state) => state.schoolNumber + 1,
  },
  mutations: {
    setSchool(state, data) {
      state.schools = data;
    },
    updateSchoolName(state, { index, name }) {
    //  console.log('halo');
    state.schools[index].name = name;
    },
    editSchool(index){
      //console.log('editSchool');
      this.state.indexSchoolNumber = index
    }
  },
  actions: {
    addSchool({ state, commit }, schoolName){
      state.schoolNumber ++
      const newSchool = {
        id: state.schoolNumber,
        name: schoolName
      }
     commit('setSchool', [...state.schools, newSchool])
  },
  editSchool({ commit },  index ) {
    commit('editSchool',  index );
  },
  updateSchoolName({ commit }, { index, name }) {
    commit('updateSchoolName', { index, name });
  },
  
}
}

/* 
else {
        this.schools[this.indexSchoolNumber].name = schoolName
        }*/
