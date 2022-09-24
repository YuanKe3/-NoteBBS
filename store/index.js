import {
  createStore
} from 'vuex'
import userModule from './userModule.js'

export default createStore({
  modules: {
    userModule
  }
})
