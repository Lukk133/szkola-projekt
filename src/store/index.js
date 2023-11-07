import { createStore } from 'vuex'

import system from './modules/system'
import cities from './modules/cities'
import schools from './modules/schools'


export default createStore({
  modules: {
    system,
    cities,
    schools,

  }
})
