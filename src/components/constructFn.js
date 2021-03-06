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
    if (item[hide] === 0) {
      if (item.authority !== '001') {
        return true
      } else {
        return false
      }
    }
    return false
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
    let dataArrFilter = this.dataArrFilter
    let addDataArr = []
    let sortArr = []
    let arr = config.map((item, i) => {
      if (typeof item === 'string') {
        sortArr.push(item)
        return item
      } else if (item.constructor === Object) {
        let key = Object.keys(item)[0]
        sortArr.push(key)
        if (dataArrFilter.find(child => child.key === key)) {
          this.configObj[key] = item[key]
          return key
        } else {
          let obj = { label: '', key, setStatus: 1, fieldSort: i }
          addDataArr.push(Object.assign({}, obj, item[key]))
        }
      }
    })
    dataArrFilter = dataArrFilter.filter(item => arr.includes(item.key)).concat(addDataArr)
    this.dataArrFilter = []
    sortArr.forEach(item => {
      let obj = dataArrFilter.find(child => child.key === item)
      if (obj) {
        obj.show === undefined && (obj.show = true)
        this.dataArrFilter.push(obj)
      }
    })
  } else {
    console.error('搜索或对话框配置必须是数组')
  }
}
// 设置placeholder
SetItem.prototype.setPlaceholder = function () {
  this.dataArrFilter.forEach(item => {
    let type1 = item.type
    !type1 && (item.placeholder = `请输入${item.label}`)
    if (type1 === 'select' || type1 === 'selectAll' || type1 === 'radio' || type1 === 'doc') {
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
      } else {
        Object.assign(obj, val)
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
