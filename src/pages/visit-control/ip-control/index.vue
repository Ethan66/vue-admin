<template>
  <div class="catalog">
    <search-module
      class="searchContent"
      :search-item="searchItem"
      :search-values="searchValues"
      :search-default-obj="defaultSearchObj"
      @handleSearch="handleSearch"
    />
    <table-module
      :table-data="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @handleSendHead="handleSendHead"
      @table-jump="handleJump">
      <div class="btn-content" slot="btn">
        <span v-if="chooseDataArr.length > 0">已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1">添加IP</el-button>
        <el-button @click="handleBatchOpen" v-if="chooseDataArr.length > 0">启 用</el-button>
        <el-button @click="handleBatchStop" v-if="chooseDataArr.length > 0">停 用</el-button>
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
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
  </div>
</template>

<script>
import { ipControl } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'

export default {
  mixins: [basicMethod, ipControl],
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      saveTableData: {}
    }
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem = [
        { key: 'id', type: 'input', maxlength: '12', label: 'IP地址'},
        { key: 'buttonCode', label: '状态', type: 'radio', options: [{ label: '成功', key: '1' }, { label: '失败', key: '2' }] },
        { key: 'gmtCreate', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内' }
      ]
      this.isEdit = 0
      this.dialogTitle = '添加IP'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.dialogItem = [
        { key: 'id', type: 'docs', label: 'IP地址'},
        { key: 'gmtCreate', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内' },
        { key: 'gmtCreate', label: '创建人', type: 'docs'},
        { key: 'gmtCreate', label: '创建时间', type: 'docs'}
      ]
      this.isEdit = 1
      this.dialogTitle = '编辑IP'
      this.showDialogForm = true
    },
    // 确认消息
    handleConfirmInfo (fnName, txt) {
      this.confirmFn = fnName
      this.confirmContent = txt
      this.confrimDiaShow = true
    },
    // 点击表格启用
    handleOpen (row) {
      this.saveTableData = row
      this.handleConfirmInfo('handleOpenConfirm', '此操作不可逆，是否确认操作此操作不可逆，是否确认操作此操作不可逆，是否确认操作?')
    },
    // 点击批量启用按钮
    handleBatchOpen () {
      this.handleConfirmInfo('handleBatchOpenFirm', '此操作不可逆，是否确认操作此操作不可逆，是否确认操作此操作不可逆，是否确认操作?')
    },
    // 批量启用确认按钮
    handleBatchOpenFirm () {
      console.log(this.chooseDataArr)
    },
    // 点击批量停止按钮
    handleBatchStop () {
      this.handleConfirmInfo('handleBatchStopFirm', '此操作不可逆，是否确认操作此操作不可逆，是否确认操作此操作不可逆，是否确认操作?')
    },
    // 批量停止确认按钮
    handleBatchStopFirm () {
      console.log(this.chooseDataArr)
    },
    // 表格停用按钮
    handleStop (val) {
      this.saveTableData = val
      this.handleConfirmInfo('handleStopConfirm', '此操作不可逆，是否确认操作此操作不可逆，是否确认操作此操作不可逆，是否确认操作?')
    },
    // 启用弹窗确认按钮
    handleOpenConfirm () {
      console.log(this.saveTableData, '启用')
    },
    // 停用按钮
    handleStopConfirm () {
      console.log(this.saveTableData, '停用')
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateSysButton, this.editData, apiListSysButton)
      } else {
        this.apiEditData(apiEditeSysButton, this.editData, apiListSysButton)
      }
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? this.tableBtn[1].show = false : this.tableBtn[2].show = false
      })
    }
  }
}
</script>
