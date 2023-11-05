import { createStore } from 'vuex'

import system from './modules/system'
import cities from './modules/cities'

export default createStore({
  modules: {
    system,
    cities
  }
})
