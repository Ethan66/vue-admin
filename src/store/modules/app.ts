import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

export interface FApp {
  sidebar: {
    opened: boolean
  }
  mainTabs: (FTab | undefined)[]
  mainActivedTab: FTab
}

export interface FTab {
  name: string
  url: string
  [key: string]: string | number
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements FApp {
  sidebar = { opened: true }
  mainTabs = []
  mainActivedTab = { name: '', url: '' }

  @Mutation
  TOGGLE_SIDEBAR(boolean: boolean): void {
    this.sidebar.opened = boolean
  }

  @Mutation
  UPDATETABS(val: (FTab | undefined)[]): void {
    this.mainTabs = val
  }

  @Mutation
  UPDATEMAINACTIVEDTAB(val: FTab | undefined): void {
    this.mainActivedTab = JSON.parse(JSON.stringify(val))
    sessionStorage.setItem('mainActivedTab', JSON.stringify(val))
  }
}

export const AppModule = getModule(App)
