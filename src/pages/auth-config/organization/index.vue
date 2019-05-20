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
import { organization } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiListSysMenu, apiQueryParentSysMenu, apiCreateSysMenu, apiEditSysMenu, apiDeleteSysMenu, apiListSysButton, apiEditeSysButton, apiCreateSysButton, apiDeleteSysButton } from '@/api/authority'
import { debuglog } from 'util';

export default {
  mixins: [basicMethod, organization],
  data () {
    return {
      showDetail: false
    }
  },
  created () {
    this.tablePages.pageSize = 10000
    this.handleGetTableData(apiListSysMenu)
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.apiGetParantMenu(1)
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.menuLevel = this.editData.menuLevel === '一级菜单' ? '0' : '1'
      // this.dialogItem[2].disabled = true
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteSysMenu, row.id, apiListSysMenu)
    },
    // 点击详情
    handleShowDetailDialog (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.showDetail = true
    },
    // 点击按钮管理按钮
    handleBtnManage (row) {
      this.nowBtnMenuId = row.id
      this.apiGetButtonAuth(row.id)
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
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData = menuRelation(tableData, 'id', 'menuParentId', 'menuSort')
      this.tableData = tableData.filter(item => {
        if (item.menuLevel === 0) {
          item.menuLevel = '一级菜单'
        } else if (item.menuLevel === 1) {
          item.menuLevel = '二级菜单'
          item.showBtn = ['编辑']
        }
        return item
      })
    },
    // 接口：获取菜单按钮
    apiGetButtonAuth (buttonMenuId) {
      apiListSysButton({ buttonMenuId }).then(res => {
        if (res.code === '208999') {
          this.dialogTableData = res.resultMap.page.list
          this.dialogTableData.forEach(item => { item.editStatus = false })
          this.showDialogBtnManage = true
        }
      })
    },
    // 搜索模块查询父菜单
    handleGetParentMenu () {
      if (this.searchValues.menuLevel === '0') {
        this.searchItem[2].type = 'input'
        this.searchValues.menuParentId = ''
      } else {
        this.apiGetParantMenu(this.searchValues.menuLevel)
      }
    },
    // 获取父菜单
    apiGetParantMenu (menuLevel) {
      apiQueryParentSysMenu({
        menuLevel: menuLevel
      }).then(res => {
        if (res.code === '208999') {
          let arr = res.resultMap.data.map(item => {
            return {label: item.menuName, value: item.id}
          })
          this.dialogItem[0].options = arr
        }
      })
    }
  }
}
</script>
