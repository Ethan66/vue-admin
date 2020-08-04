import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface FApp {
  sidebar: {
    opened: boolean
  }
  mainTabs: string[]
  mainActivedTab: object
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements FApp {
  sidebar = { opened: true }
  mainTabs = []
  mainActivedTab = []

  @Mutation
  TOGGLE_SIDEBAR(boolean: boolean): void {
    this.sidebar.opened = boolean
  }

  @Mutation
  UPDATETABS(val: string[]): void {
    this.mainTabs = val
  }

  @Mutation
  UPDATEMINACTIVEDTAB(val: object): void {
    this.mainActivedTab = JSON.parse(JSON.stringify(val))
  }
}

export const AppModule = getModule(App)
