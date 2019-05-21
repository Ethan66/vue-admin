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
      :table-item="tableItem"
      :table-btn="tableBtn">
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd">新增菜单</el-button>
        <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      doubleColumn
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
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
import { apiListConsoleMenu, apiEditeConsoleMenu, apiCreateConsoleMenu, apiDeleteConsoleMenu, apiQueryParentConsoleMenu } from '@/api/developCenter'

export default {
  mixins: [basicMethod, menu],
  data () {
    return {
      showDetail: false
    }
  },
  created () {
    this.tablePages.pageSize = 10000
    apiQueryParentConsoleMenu({ menuLevel: 2 }).then(res => {
      if (res.code === '208999') {
        
      }
    })
    this.handleGetTableData(apiListConsoleMenu)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.status = this.editData.statusStash
      this.editData.menuType = this.editData.menuTypeStash
      this.editData.menuLevel = this.editData.menuLevel[0]
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
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
        this.editData.menuLevel = this.editData.menuType + 1
        this.apiCreateData(apiCreateConsoleMenu, this.editData, apiListConsoleMenu)
      } else {
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
      this.tableData = menuRelation(tableData, 'id', 'menuParentId', 'menuLevel1', 'sortNo')
    }
  }
}
</script>
