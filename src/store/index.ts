import Vue from 'vue'
import Vuex from 'vuex'
import { FuserState } from './modules/pageCashe'
Vue.use(Vuex)

export interface NRootState {
  user: FuserState
}
export default new Vuex.Store<NRootState>({})
