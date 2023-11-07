export default{
  state: {
    schoolNumber: 5,
    editedTask: null,
    schoolName: '',
    schools:
    [
      {
        id: 1,
        name: 'XIV LO im. Stanisława Staszica',
      },
      {
        id: 2,
        name: '	V LO im. Augusta Witkowskiego',
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
      }
    ]
  },
    /*school: {
      name: "",
      city: {}
    },
    */
    getters: {
     getSchools: state => state.schools
  },
    mutations:{
      setSchoolId(state, data){
        state.schools = data
      }      
    },
    actions: {
      //addSchool
    }
  }
