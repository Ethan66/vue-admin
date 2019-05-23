<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-tree-open-num.sync="tableTreeOpenNum"
      :table-item="tableItem"
      :table-btn="tableBtn">
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd">新增菜单</el-button>
        <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button>
        <el-button @click="handleBatchCreate('catalogue')">批量新建目录</el-button>
        <el-button @click="handleBatchCreate('menu')">批量新建菜单</el-button>
        <el-button @click="handleBatchCreate('btn')">批量新建按钮</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      doubleColumn
      :dialog-title="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :edit-data="editData"
      :dialog-item="dialogItem"
      :dialog-btn="dialogBtn"
      :rules="rules"
      :select-tree-checked-value="selectTreeCheckedValue"
      selectTreekey="menuParentId"
      @handleSelectTreeValue="handleSelectTreeValue"
      @handleClearSelectTree="handleClearSelectTree"
    />
    <dialog-detail
      title="详情"
      :showDetail.sync="showDetail"
      :dialogItem="dialogItem"
      :editData="editData"
    />
  </div>
</template>

<script>
import { menu } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import batchConfig from '@/configureData/menu'
import { apiListConsoleMenu, apiEditeConsoleMenu, apiCreateConsoleMenu, apiDeleteConsoleMenu } from '@/api/developCenter'

export default {
  mixins: [basicMethod, menu],
  data () {
    return {
      showDetail: false,
      allParentMenu: [],
      selectTreeCheckedValue: []
    }
  },
  watch: {
    showDialogForm (val) {
      if (!val) {
        this.dialogItem[0].type = 'selectTree'
        this.dialogItem[0].disabled = false
        this.dialogItem[2].disabled = false
      }
    }
  },
  created () {
    this.tablePages.pageSize = 10000
    this.handleGetTableData(apiListConsoleMenu)
  },
  methods: {
    // 获取所有父菜单树
    handleGetAllParentTree () {
      this.selectTreeCheckedValue = []
      let filterArr = JSON.parse(JSON.stringify(this.allData.filter(item => item.menuLevel !== 3)))
      this.allParentMenu = this.dialogItem[0].dialogData = menuRelation(filterArr, 'id', 'menuParentId', 'menuLevel', 'sortNo')
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.handleClearSelectTree()
      this.handleGetAllParentTree()
      this.isEdit = 0
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.handleClearSelectTree()
      this.handleGetAllParentTree()
      this.selectTreeCheckedValue = [this.editData.menuParentId]
      this.editData.status = this.editData.statusStash
      this.editData.menuType = this.editData.menuTypeStash
      this.editData.menuLevel = this.editData.menuLevel[0]
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 新建平级菜单
    handleCreateLevelMenu (row) {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[2].disabled = true
      this.editData.menuParentIdStash = row.menuParentId
      let obj = this.allData.find(item => item.id === row.menuParentId)
      obj && (this.editData.menuParentId = obj.menuName)
      this.editData.menuType = row.menuTypeStash
      this.editData.menuLevel = Number(row.menuLevel[0])
      this.isEdit = 0
      this.dialogTitle = '新建菜单'
      this.showDialogForm = true
    },
    // 新建下级菜单
    handleCreateNextLevelMenu (row) {
      if (Number(row.menuTypeStash) === 2) {
        this.$message.error('三级不能创建下级菜单')
        return false
      }
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[0].type = 'input'
      this.dialogItem[0].disabled = true
      this.dialogItem[2].disabled = true
      this.editData.menuParentIdStash = row.id
      this.editData.menuParentId = row.menuName
      this.editData.menuType = Number(row.menuTypeStash) + 1
      this.editData.menuLevel = Number(row.menuLevel[0])
      this.isEdit = 0
      this.dialogTitle = '新建菜单'
      this.showDialogForm = true
    },
    // 选择菜单树的值后
    handleSelectTreeValue (row) {
      if (!row) return false
      this.editData.menuType = Number(row.menuType) + 1
      let list = this.dialogItem[2].options.map(item => {
        if (item.value <= row.menuType) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.$set(this.dialogItem[2], 'options', list)
    },
    // 清空菜单树的值
    handleClearSelectTree () {
      let list = this.dialogItem[2].options.map(item => {
        item.disabled = false
        return item
      })
      this.$set(this.dialogItem[2], 'options', list)
    },
    // 点击表格详情按钮
    handleShowDetailDialog (row) {
      this.showDetail = true
      this.editData = row
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteConsoleMenu, row.id, apiListConsoleMenu)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        if (this.editData.menuParentIdStash) {
          this.editData.menuParentId = this.editData.menuParentIdStash
        }
        this.editData.menuLevel = this.editData.menuType + 1
        this.apiCreateData(apiCreateConsoleMenu, this.editData, apiListConsoleMenu)
      } else {
        this.editData.menuLevel = this.editData.menuType + 1
        this.apiEditData(apiEditeConsoleMenu, this.editData, apiListConsoleMenu)
      }
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.menuTypeStash = item.menuType
        switch (item.menuType) {
          case 0:
            item.menuType = '目录'
            break
          case 1:
            item.menuType = '菜单'
            break
          case 2:
            item.menuType = '按钮'
            break
        }
        item.menuLevelStash = item.menuLevel - 1
        item.menuLevel = `${item.menuLevel}级`
        item.statusStash = item.status
        switch (item.status) {
          case 0:
            item.status = '显示'
            break
          case 1:
            item.status = '隐藏'
            break
        }
      })
      this.tableData = menuRelation(tableData, 'id', 'menuParentId', 'menuLevelStash', 'sortNo')
    },
    // 批量新建
    handleBatchCreate (type) {
      const typeObj = { catalogue: 0, menu: 1, btn: 2 }
      let data = batchConfig[type]
      if (type === 'catalogue') {
        data.forEach(item => {
          item.status = 0
          item.menuType = typeObj[type]
          item.menuLevel = typeObj[type] + 1
          this.apiCreateData(apiCreateConsoleMenu, item)
        })
      } else {
        let menuParentList = {}
        data.forEach(item => {
          if (!menuParentList[item.menuParentName]) {
            menuParentList[item.menuParentName] = ''
          }
        })
        Object.keys(menuParentList).forEach(name => {
          menuParentList[name] = this.allData.find(item => item.menuName === name).id
        })
        data.forEach(item => {
          item.menuParentId = menuParentList[item.menuParentName]
          item.status = 0
          item.menuType = typeObj[type]
          item.menuLevel = typeObj[type] + 1
          this.apiCreateData(apiCreateConsoleMenu, item)
        })
      }
    }
  }
}
</script>
