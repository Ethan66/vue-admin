import searchModule from './search-module'
import dialogModule from './dialog-module'
import dialogDetail from './dialog-module/detail'
import tableModule from './table-module'

const components = [
  searchModule, tableModule, dialogModule, dialogDetail
]

components.forEach(item => {
  item.install = (Vue) => {
    Vue.component(item.name, item)
  }
})

const adminModule = (Vue) => {
  components.forEach(component => {
    Vue.use(component)
  })
}

export {
  adminModule,
  searchModule, tableModule, dialogModule, dialogDetail
}
