<template>
  <div class="catalog">
    <search-module
      class="searchContent"
      :search-item="searchItem"
      :search-values="searchValues"
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
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1 && $showBtn('visit-ip-add-ip')">{{$getBtnName('visit-ip-add-ip')}}</el-button>
        <el-button @click="handleBatchOpen" v-if="chooseDataArr.length > 0 && $showBtn('visit-ip-open-batch')">{{$getBtnName('visit-ip-open-batch')}}</el-button>
        <el-button @click="handleBatchStop" v-if="chooseDataArr.length > 0 && $showBtn('visit-ip-stop-batch')">{{$getBtnName('visit-ip-stop-batch')}}</el-button>
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
import { apiListSysIpWhite, apiEditIpWhite, apiAddIpWhite, apiEditIpWhiteStatus } from '@/api/visitControl'

export default {
  name: 'visit-control',
  mixins: [basicMethod, ipControl],
  created () {
    this.handleGetTableData(apiListSysIpWhite)
  },
  data () {
    return {
      selectFlag: false
    }
  },
  methods: {
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem = [
        { key: 'addressIp', type: 'input', maxlength: '12', label: 'IP地址', show: true},
        { key: 'isDelete', label: '状态', type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }], show: true},
        { key: 'remark', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内', show: true}
      ]
      this.isEdit = 0
      this.dialogTitle = '添加IP'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.dialogItem = [
        { key: 'addressIp', type: 'docs', label: 'IP地址', show: true},
        { key: 'remark', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内', show: true },
        { key: 'creater', label: '创建人', type: 'docs', show: true},
        { key: 'gmtCreate', label: '创建时间', type: 'docs', show: true}
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
      this.handleConfirmInfo('handleOpenConfirm', '确认启用对该IP的授权吗？启用后可以通过该IP地址访问管理后台。')
    },
    // 点击批量启用按钮
    handleBatchOpen () {
      this.handleConfirmInfo('handleBatchOpenFirm', '确认启用对该IP的授权吗？启用后可以通过该IP地址访问管理后台。')
    },
    // 批量启用确认按钮
    handleBatchOpenFirm () {
      let open = []
      this.chooseDataArr.forEach((item) => {
        open.push(item.id)
      })
      this.apiEditData(apiEditIpWhiteStatus, {ids: open, isDelete: 0}, apiListSysIpWhite)
    },
    // 点击批量停止按钮
    handleBatchStop () {
      this.handleConfirmInfo('handleBatchStopFirm', '确认停止对该IP的授权吗？停用后无法通过该IP地址访问管理后台。')
    },
    // 批量停止确认按钮
    handleBatchStopFirm () {
      let open = []
      this.chooseDataArr.forEach((item) => {
        open.push(item.id)
      })
      this.apiEditData(apiEditIpWhiteStatus, {ids: open, isDelete: 1}, apiListSysIpWhite)
    },
    // 表格停用按钮
    handleStop (val) {
      this.saveTableData = val
      this.handleConfirmInfo('handleStopConfirm', '确认停止对该IP的授权吗？停用后无法通过该IP地址访问管理后台。')
    },
    // 启用弹窗确认按钮
    handleOpenConfirm () {
      this.saveTableData.isDelete = 0
      this.apiEditData(apiEditIpWhite, this.saveTableData, apiListSysIpWhite)
    },
    // 停用按钮确认
    handleStopConfirm () {
      this.saveTableData.isDelete = 1
      this.apiEditData(apiEditIpWhite, this.saveTableData, apiListSysIpWhite)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddIpWhite, this.editData, apiListSysIpWhite)
      } else {  
        this.apiEditData(apiEditIpWhite, this.editData, apiListSysIpWhite)
      }
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.showBtn = []
        if (item.isDelete === '0') {
          item.showBtn.push('停 用')
        }
        if (item.isDelete === '1') {
          item.showBtn.push('启 用')
        }
      })
    }
  }
}
</script>
