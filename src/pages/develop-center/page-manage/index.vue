<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    />
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @table-jump="handleJump"
      >
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd">新建页面</el-button>
        <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { pageManage } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import { apiQueryPageList, apiAddPage, apiUpdatePage } from '@/api/developCenter'

export default {
  mixins: [basicMethod, pageManage],
  created () {
    this.handleGetTableData(apiQueryPageList)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[5].show = false
      this.dialogItem[6].show = false
      this.isEdit = 0
      this.dialogTitle = '新增页面'
      this.showDialogForm = true
    },
    // 页面名称字段点击事件
    handleGoTybe (row) {
      this.$router.push({
        path: '/develop-center/page-manage/tybemanage',
        query: {
          menuCode: row.menuCode,
          pageCode: row.pageCode
        }
      })
    },
    // 编辑按钮事件
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.pageStatus = this.editData.pageStatusStash
      this.dialogItem[5].show = true
      this.dialogItem[6].show = true
      this.isEdit = 1
      this.dialogTitle = '编辑页面'
      this.showDialogForm = true
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddPage, this.editData, apiQueryPageList)
      } else {
        this.apiEditData(apiUpdatePage, this.editData, apiQueryPageList)
      }
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.pageStatusStash = item.pageStatus
        switch (item.pageStatus) {
          case 1:
            item.pageStatus = '正常'
            break
          case 0:
            item.pageStatus = '停用'
            break
        }
      })
    }
  }
}
</script>
