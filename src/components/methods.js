import { tableBtn, dialogBtn } from './table-module/config/defaultBtnData'
import { SetItem } from './constructFn'

let btnList = JSON.parse(sessionStorage.getItem('btnList'))

// 展示、获取按钮
export const authBtn = (btnCode, type) => {
  !btnList && (btnList = JSON.parse(sessionStorage.getItem('btnList')))
  if (window.btnList) { // 刷新页面的window.btnList保存的是最新的按钮权限
    btnList = window.btnList
    window.btnList = undefined
  }
  let obj = btnList.find(item => item.btnCode === btnCode)
  if (type) {
    if (obj) {
      return true
    } else {
      return false
    }
  }
  if (obj) {
    return obj.btnName
  } else {
    return false
  }
}

// 表格更多按钮里按钮列表展示
export const authMoreBtn = (list) => {
  return list.map(item => {
    let obj = { code: item.code, name: '', clickFn: item.clickFn }
    obj.name = authBtn(item.code)
    obj.show = authBtn(item.code, 'show')
    item.config && Object.assign(obj, item.config)
    return obj
  })
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
            if (arr[1].show === undefined) {
              config.show = authBtn(config.code, 'show')
            }
            config.name = authBtn(config.code)
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

export const setItem = (dataArr, config, type) => {
  let data = new SetItem(dataArr, type)
  if (type === 'table') {
    data.initTableConfig(config, 'displayStatus', 'fieldSort', 'fixedStatus')
    data.deleteKey('setStatus')
  } else {
    data.filterField(config)
    data.setPlaceholder()
    if (type === 'search') {
      data.deleteKey('setStatus', 'fieldSort', 'fixedStatus', 'disabled', 'displayStatus')
    } else if (type === 'dialog') {
      data.deleteKey('fieldSort', 'fixedStatus', 'disabled', 'displayStatus')
    }
  }
  data.setKey()
  return data.dataArrFilter
}
