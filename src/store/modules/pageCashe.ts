import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

interface FSearchValues {
  searchValues: object
  [key: string]: object
}
export interface FuserState {
  keepAliveList: string[]
  pageSearchValues: { [key: string]: FSearchValues }
  subTabObj: object
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements FuserState {
  keepAliveList = []
  pageSearchValues = {}
  subTabObj = {}

  @Mutation
  UPDATE_KEEP_ALIVE_LIST(payload: { type: string; name?: string }): void {
    const { type, name } = payload
    const i = this.keepAliveList.indexOf(name)
    if (type === 'deleteAll') {
      this.keepAliveList = []
      return
    }
    if (type === 'delete') {
      i >= 0 && this.keepAliveList.splice(i, 1)
      return
    }
    i === -1 && this.keepAliveList.push(name)
  }

  @Mutation
  UPDATE_PAGE_SEARCH_VALUES(payload: { type: string; name?: string; value?: FSearchValues }): void {
    const { type, name, value } = payload
    let data = this.pageSearchValues
    // 登录后清除所有缓存
    if (type === 'deleteAll') {
      data = []
      return
    }
    if (data[name]) {
      // 每关闭一个tab后清除相应缓存
      if (type === 'delete') {
        delete data[name]
        return
      }
    }
    if (!value.searchValues) value.searchValues = {}
    data[name] = value
    const obj = {}
    obj[name] = value
    console.log(JSON.stringify(value))
    sessionStorage.setItem('activedSearchValues', JSON.stringify(obj))
  }

  @Mutation
  SAVE_SUBTABS_OBJ(data: object): void {
    this.subTabObj = data
  }
}

export const UserModule = getModule(User)
