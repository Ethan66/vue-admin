import searchModule from './search-module'
import dialogModule from './dialog-module/dialog'
import tableModule from './table-module'
import tableTree from './table-module/tableTree'

const components = [
  searchModule, tableModule, dialogModule, tableTree
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
  searchModule, tableModule, dialogModule, tableTree
}
