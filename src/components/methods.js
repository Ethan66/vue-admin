import { tableBtn, dialogBtn } from './table-module/config/defaultBtnData'
import { SetItem } from './constructFn'

let btnList = JSON.parse(sessionStorage.getItem('btnList'))

// 展示按钮
export const showBtn = (buttonCode) => {
  btnList = JSON.parse(sessionStorage.getItem('btnList'))
  return btnList.some(item => item.btnCode === buttonCode)
}

// 获取按钮名称
export const getBtnName = (buttonCode) => {
  let result = ''
  btnList.forEach(item => {
    if (buttonCode === item.btnCode) {
      result = item.btnName
    }
  })
  return result
}

// 初始化编辑数据
export const initEditData = (dialogItem) => {
  try {
    let keyArr = dialogItem.map(item => item.key)
    let obj = {}
    keyArr.forEach(item => {
      obj[item] = ''
    })
    return obj
  } catch (e) {
    return null
  }
}

// 给vue实例设置初始data，参数为提供table按钮和dialog按钮配置
// 参数结构tableBtnKeys和dialogKeys = ['edit', 'delete'] 或者['edit', {delete: {clickFn: 'fn1'}}]
export const setBtnConfig = (obj, tableBtnKeys = ['edit', 'delete'], dialogBtnKeys = ['cancel', 'confirm']) => {
  if (Array.isArray(tableBtnKeys) && Array.isArray(dialogBtnKeys)) {
    [tableBtnKeys, dialogBtnKeys].forEach((item, i) => {
      let btnType = i === 0 ? 'tableBtn' : 'dialogBtn'
      let objBtn = i === 0 ? tableBtn : dialogBtn
      item.length > 0 && (obj[btnType] = [])
      item.forEach(key => {
        if (typeof key === 'string') {
          if (!objBtn[key]) {
            console.error(`请确认${btnType}是否配置了${key}属性`)
            return false
          }
          obj[btnType].push(objBtn[key])
        } else if (Object.prototype.toString.call(key) === '[object Object]') {
          let arr = Object.entries(key)[0]
          if (Object.prototype.toString.call(arr[1]) !== '[object Object]') {
            console.error('数组里的对象的value值必须为对象')
          }
          let config = Object.assign({}, objBtn[arr[0]], arr[1])
          if (config.code) {
            if (config.show === undefined) {
              config.show = showBtn(config.code)
            }
            config.name = getBtnName(config.code)
          }
          obj[btnType].push(config)
        } else {
          console.error('数组里的数据必须是字符串或对象')
        }
      })
    })
  } else {
    console.error('方法setBtnConfig传参必须为数组')
  }
  return Object.assign({}, obj)
}

/* // 处理searchItem, tableItem, dialogItem 转为label,key格式
export const setItem = (arr, type = 'search') => {
  let key = 'key'
  if (type === 'table') {
    key = 'prop'
  }
  arr.forEach(item => {
    if (type === 'search') {
      if (item.type === 'date') return false
    }
    if (type === 'table') {
      if (item.type === 'selection' || item.type === 'btn' || item.type === 'setting') return false
      if (!item.type) item.type = 'cell'
    }
    let key0 = Object.keys(item)[0]
    item[key] = key0
    item.label = item[key0]
    delete item[key0]
  })
} */

export const setItem = (dataArr, config, type) => {
  let data = new SetItem(dataArr, type)
  if (type === 'table') {
    data.initTableConfig(config, 'displayStatus', 'fieldSort', 'fix')
    data.deleteKey('setStatus')
  } else {
    data.filterField(config)
    data.setPlaceholder()
    if (type === 'search') {
      data.deleteKey('setStatus', 'fieldSort', 'fix', 'disabled', 'displayStatus')
    } else if (type === 'dialog') {
      data.deleteKey('fieldSort', 'fix', 'disabled', 'displayStatus')
    }
  }
  data.setKey()
  return data.dataArrFilter
}

// 跳转页面或刷新保留页面数据
export const savePageData = (name, searchValues, currentPage, activeTabName = '') => {
  if (!searchValues) {
    searchValues = {}
  }
  let objStr = JSON.stringify({ searchValues, currentPage, activeTabName })
  sessionStorage.setItem(name, objStr)
}
