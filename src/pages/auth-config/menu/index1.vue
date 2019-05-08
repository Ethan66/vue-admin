<template>
  <div class="catalog">
    <table-tree
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn">
      <div class="btn-content" slot="btn">
        <span>已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleAdd">新 增</el-button>
        <el-button @click="$router.push({ path: '/main/auth-config/menu/newpage' })">跳 转</el-button>
      </div>
      <div class="total-content" slot="total">
        <b>统计数据</b>
        <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
      </div>
    </table-tree>
    <dialog-module
      ref="dialog"
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
    />
    <el-dialog title="按钮管理" :visible.sync="showDialogBtnManage">
      <el-button class="btn" type="success" icon="el-icon-plus" size="small" @click="handleAddBtn">新增</el-button>
      <table-module
        isInlineEdit
        :table-data="dialogTableData"
        :table-item="inlineEditTableItem"
        :table-btn="inlineEditTableBtn"
      />
      <!-- <inline-edit-table
        ref="inlineEditTable"
        :tableData="dialogTableData"
        :tableItem="inlineEditTableItem"
        :tableBtn="inlineEditTableBtn"
      /> -->
    </el-dialog>
  </div>
</template>

<script>
import { menu } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiListSysMenu, apiQueryParentSysMenu, apiCreateSysMenu, apiEditSysMenu, apiDeleteSysMenu, apiListSysButton, apiEditeSysButton, apiCreateSysButton, apiDeleteSysButton } from '@/api/authority'

export default {
  mixins: [basicMethod, menu],
  data () {
    return {
      showDialogBtnManage: false,
      dialogTableData: [],
      inlineEditTableItem: [],
      inlineEditTableBtn: []
    }
  },
  created () {
    // 行内可编辑表格配置
    this.inlineEditTableItem = [
      { buttonName: '按钮名称', type: 'input', width: '200', isEdit: true },
      { buttonCode: '按钮编码', type: 'input', width: '80', isEdit: true },
      { type: 'btn', width: '96' }
    ]
    // 行内可编辑表格按钮
    this.inlineEditTableBtn = [ // status/show可不填
      { name: '编辑', icon: 'edit', color: 'primary', clickFn: 'handleSaveBtn', status: '', show: true },
      { name: '取消', icon: 'refresh', color: 'warning', status: false, show: true },
      { name: '删除', icon: 'delete', clickFn: 'handleDeleteBtn', show: true }
    ]
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
      this.dialogItem[2].disabled = true
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteSysMenu, row.id, apiListSysMenu)
    },
    // 点击按钮管理按钮
    handleBtnManage (row) {
      this.nowBtnMenuId = row.id
      this.apiGetButtonAuth(row.id)
    },
    // 点击按钮管理中的新增按钮
    handleAddBtn () {
      this.dialogTableData.push({ buttonName: '', buttonCode: '', editStatus: false, isAdd: true, editBtnName: '' })
    },
    // 按钮管理对话框保存按钮
    handleSaveBtn (row) {
      let params = { buttonName: row.buttonName, buttonCode: row.buttonCode, buttonMenuId: this.nowBtnMenuId }
      if (row.isAdd) {
        apiCreateSysButton(params).then(res => {
          if (res.code === '208999') {
            this.$notify({ title: '成功', message: '操作成功', type: 'success' })
            this.apiGetButtonAuth(this.nowBtnMenuId)
          }
        })
        return true
      }
      params.id = row.id
      apiEditeSysButton(params).then(res => {
        if (res.code === '208999') {
          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.apiGetButtonAuth(this.nowBtnMenuId)
        }
      })
    },
    // 点击按钮管理中的删除按钮
    handleDeleteBtn (row) {
      if (row.isAdd) {
        this.dialogTableData.pop()
        return
      }
      apiDeleteSysButton({ id: row.id }).then(res => {
        if (res.code === '208999') {
          this.$notify({ title: '成功', message: '操作成功', type: 'success' })
          this.apiGetButtonAuth(this.nowBtnMenuId)
        }
      })
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

<style lang="less">
  .el-dialog{
    .inlineEditTable{
      .right{
        background: #fff;
      }
    }
  }
</style>
