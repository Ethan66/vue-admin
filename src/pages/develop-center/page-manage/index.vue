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
import { menuRelation } from '@/config/utils'
import { apiListSysMenu, apiQueryParentSysMenu, apiCreateSysMenu, apiEditSysMenu, apiDeleteSysMenu, apiListSysButton, apiEditeSysButton, apiCreateSysButton, apiDeleteSysButton } from '@/api/authority'
import { debuglog } from 'util';

export default {
  mixins: [basicMethod, pageManage],
  created () {
    this.handleGetTableData(apiListSysMenu)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[4].show = false
      this.dialogItem[5].show = false
      this.isEdit = 0
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 页面名称字段点击事件
    handleGoTybe (row) {
      this.$router.push({
        path: '/main/develop-center/page-manage/tybemanage',
        query: {
          id: row.id
        }
      })
    },
    // 编辑按钮事件
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.menuLevel = this.editData.menuLevel === '一级菜单' ? '0' : '1'
       this.dialogItem[4].show = true
      this.dialogItem[5].show = true
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 点击对话框确认按钮
    handleSubmit () {
      if (this.editData.menuParentId) {
        if (this.editData.menuUrl === '') {
          this.$message.error('二级菜单必须要填写uxrl')
          return false
        }
      }
      if (this.editData.menuUrl === '') {
        this.editData.menuUrl = 'null'
      }
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateSysMenu, this.editData, apiListSysMenu)
      } else {
        this.apiEditData(apiEditSysMenu, this.editData, apiListSysMenu)
      }
    }
  }
}
</script>
