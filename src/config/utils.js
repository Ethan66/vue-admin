// 转换时间戳
export const format = (now, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  now = new Date(now)
  const o = {
    'M+': now.getMonth() + 1, // 月份
    'd+': now.getDate(), // 日
    'h+': now.getHours(), // 小时
    'm+': now.getMinutes(), // 分
    's+': now.getSeconds(), // 秒
    'q+': Math.floor((now.getMonth() + 3) / 3), // 季度
    'S': now.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, String(o[k]).padStart(RegExp.$1.length, 0))
    }
  }
  return fmt
}

// 菜单父子级关联
export const menuRelation = (data, id, pId, sort) => {
  if (!data.length) return data
  let template = {}
  data.forEach(item => {
    item.level = item.menuLevel
    template[item.id] = item
  })
  let arr = []
  data.forEach(item => {
    if (!item[pId]) {
      if (!template[item[id]].list) {
        template[item[id]].list = []
      }
      arr.push(template[item[id]])
    } else if (template[item[pId]]) {
      if (!template[item[pId]].list) {
        template[item[pId]].list = []
      }
      template[item[pId]].list.push(item)
    }
  })
  menuSort(arr, 'list', sort)
  return arr
}

// 目录排序
const menuSort = (arr, key, sort) => {
  if (Array.isArray(arr) && arr[0]) {
    if (arr.length > 1) {
      arr.sort((v1, v2) => {
        return v1[sort] - v2[sort]
      })
    }
    arr.length === 1 && (arr[0].onlyOne = true)
    arr[0].first = true
    arr[arr.length - 1].last = true
    arr.forEach(item => {
      item[key] && menuSort(item[key], key)
    })
  }
  return arr
}

// 成功提示
export const getSuccessMsg = (that, text, type = 'success', title = '成功') => {
  that.$notify({
    title: title,
    message: text,
    type: type,
    duration: 2000
  })
}