import {
  createStore
} from 'vuex'
import userModule from './userModule.js'
import confModule from './confModule.js'

export default createStore({
  modules: {
    userModule,
    confModule
  }
})
