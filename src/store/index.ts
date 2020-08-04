import Vue from 'vue'
import Vuex from 'vuex'
import { FuserState } from './modules/pageCashe'
import { FApp } from './modules/app'
Vue.use(Vuex)

export interface NRootState {
  user: FuserState
  app: FApp
}
export default new Vuex.Store<NRootState>({})
