export const SetItem = function (dataArr, type) {
  this.configObj = {}
  this.dataArrFilter = JSON.parse(JSON.stringify(dataArr))
  this.type = type
}
// 初始化table配置(排序，隐藏，固定，添加按钮, 添加selection)
SetItem.prototype.initTableConfig = function (config, hide, sort, fixed) {
  this.configObj = config
  let tableBtnConfig = { key: 'btn', fixed: 'right', label: '操作', type: 'btn' }
  let tableSelection = { key: 'selection', type: 'selection' }
  this.dataArrFilter = this.dataArrFilter.filter(item => {
    return item[hide] === 0
  }).sort((v1, v2) => v1[sort] - v2[sort])
  if (this.configObj.selection) {
    this.dataArrFilter.unshift(Object.assign({}, tableSelection))
  }
  if (this.configObj.btn) {
    this.dataArrFilter.push(Object.assign({}, tableBtnConfig))
  }
  this.dataArrFilter.forEach(item => {
    if (item[fixed] === 1) {
      item.fixed = true
    }
  })
}
// 过滤对象(搜索和对话框)
SetItem.prototype.filterField = function (config) {
  if (Array.isArray(config)) {
    if (Array.isArray(config[0])) {
      this.dataArrFilter = this.dataArrFilter.filter(item => config[0].includes(item.key))
      config[1] && (this.configObj = config[1])
    } else {
      this.dataArrFilter = this.dataArrFilter.filter(item => config.includes(item.key))
    }
  }
}
// 设置placeholder
SetItem.prototype.setPlaceholder = function () {
  this.dataArrFilter.forEach(item => {
    let type1 = item.type
    !type1 && (item.placeholder = `请输入${item.label}`)
    if (type1 === 'select' || type1 === 'selectAll') {
      item.placeholder = `请选择${item.label}`
      !item.options && (item.options = [])
    }
  })
}
// 删除不必要的字段
SetItem.prototype.deleteKey = function () {
  this.dataArrFilter.forEach(item => {
    Array.from(arguments).forEach(key => {
      delete item[key]
    })
  })
}
// 配置自定义属性
SetItem.prototype.setKey = function () {
  let configObj = this.configObj
  if (Object.is(configObj, {})) return
  let dataArrFilter = this.dataArrFilter
  let type = this.type
  Object.keys(configObj).forEach(key => {
    let val = configObj[key]
    let obj = dataArrFilter.find(item => item.key === key)
    if (obj) {
      if (type === 'table') {
        if (Object.prototype.toString.call(val) !== '[object Object]') {
          obj.width = Number(val)
        } else {
          Object.assign(obj, val)
        }
        if (obj.fix === 1) {
          obj.fixed = true
          delete obj.fix
        }
      }
    }
  })
  if (dataArrFilter[0].type === 'selection' && dataArrFilter[1].fixed) {
    dataArrFilter[0].fixed = true
  }
  this.dataArrFilter.forEach(item => {
    if (type === 'table') {
      item.prop = item.key
      delete item.key
    }
    if (!item.type) {
      if (type === 'table') {
        item.type = 'cell'
      } else {
        item.type = 'input'
      }
    }
  })
}
