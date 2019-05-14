// 设置table的max-height
export const getTableHeight = (totalClsName, reduceClsNameList = []) => {
  const totalHeight = document.querySelector(totalClsName).clientHeight // 总高度
  const $tableModule = document.querySelector('.tableModule')
  const tableTop = $tableModule.getBoundingClientRect().top // 距离body高度
  const tableBrothersHeight = Array.from($tableModule.children) // 兄弟级高度
    .filter(item => !item.classList.contains('el-table'))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const reduceHeight = reduceClsNameList.map(item => document.querySelector(item)) // 需要减掉的高度
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue.offsetHeight
    }, 0)
  const tableHeight = totalHeight - reduceHeight - tableTop - tableBrothersHeight - 51
  return tableHeight < 400 ? 400 : tableHeight
}

// 设置table单元格className
export const getCellClass = (row, newTableItem) => {
  const lastIndex = newTableItem.length - 1
  let clsName = ''
  console.log(111, row)
  if (row.columnIndex === lastIndex) {
    clsName = 'headSetting'
  }
  return clsName
}

// 修改筛选图标
export const setHeadIcon = () => {
  Array.from(document.querySelectorAll('.tableModule .el-table th.headSetting .cell')).forEach(item => {
    item.classList.add('el-icon-setting')
  })
}

// mounted中设置table样式
export const setInitTableStyle = () => {
  let timer = setTimeout(() => {
    Array.from(document.querySelectorAll('.el-table__fixed-right')).forEach(item => {
      item.style.bottom = '7px'
      item.style.right = '7px'
    })
    Array.from(document.querySelectorAll('.el-table__fixed')).forEach(item => {
      item.style.bottom = '7px'
    })
    let tableContent = document.querySelector('.el-table__body-wrapper>table')
    tableContent.style.width = tableContent.style.width.slice(0, 2) + 9 + 'px'
    clearTimeout(timer)
  }, 100)
}
