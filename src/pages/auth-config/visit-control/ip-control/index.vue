<template>
  <div class="substance">
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
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1 && $authBtn('visit-ip-add-ip')">{{$authBtn('visit-ip-add-ip')}}</el-button>
        <el-button @click="handleBatchOpen" v-if="chooseDataArr.length > 0 && $authBtn('visit-ip-open-batch')">{{$authBtn('visit-ip-open-batch')}}</el-button>
        <el-button @click="handleBatchStop" v-if="chooseDataArr.length > 0 && $authBtn('visit-ip-stop-batch')">{{$authBtn('visit-ip-stop-batch')}}</el-button>
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
import { ipControl } from '../../mixins'
import basicMethod from '@/config/mixins'
import { apiListSysIpWhite, apiEditIpWhite, apiAddIpWhite, apiEditIpWhiteStatus } from '@/api/authority'

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
        { key: 'addressIp', type: 'input', maxlength: '12', label: 'IP地址', show: true },
        { key: 'isDelete', label: '状态', type: 'radio', options: [{ label: '正常', value: 0 }, { label: '停用', value: 1 }], show: true },
        { key: 'remark', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内', show: true }
      ]
      this.isEdit = 0
      this.dialogTitle = '添加IP'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.dialogItem = [
        { key: 'addressIp', type: 'docs', label: 'IP地址', show: true },
        { key: 'remark', label: '描述', type: 'textarea', maxlength: '100', placeholder: '100字以内', show: true },
        { key: 'creater', label: '创建人', type: 'docs', show: true },
        { key: 'gmtCreate', label: '创建时间', type: 'docs', show: true }
      ]
      this.isEdit = 1
      this.dialogTitle = '编辑IP'
      this.showDialogForm = true
    },
    // 点击表格启用
    handleOpen (row) {
      this.saveTableData = row
      this.$confirm('确认启用对该IP的授权吗？启用后可以通过该IP地址访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleOpenConfirm()
          }
        }
      })
    },
    // 点击批量启用按钮
    handleBatchOpen () {
      this.$confirm('确认启用对该IP的授权吗？启用后可以通过该IP地址访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleBatchOpenFirm()
          }
        }
      })
    },
    // 批量启用确认按钮
    handleBatchOpenFirm () {
      let open = []
      this.chooseDataArr.forEach((item) => {
        open.push(item.id)
      })
      this.apiEditData(apiEditIpWhiteStatus, { ids: open, isDelete: 0 }, apiListSysIpWhite)
    },
    // 点击批量停止按钮
    handleBatchStop () {
      this.$confirm('确认停止对该IP的授权吗？停用后无法通过该IP地址访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleBatchStopFirm()
          }
        }
      })
    },
    // 批量停止确认按钮
    handleBatchStopFirm () {
      let open = []
      this.chooseDataArr.forEach((item) => {
        open.push(item.id)
      })
      this.apiEditData(apiEditIpWhiteStatus, { ids: open, isDelete: 1 }, apiListSysIpWhite)
    },
    // 表格停用按钮
    handleStop (val) {
      this.saveTableData = val
      this.$confirm('确认停止对该IP的授权吗？停用后无法通过该IP地址访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleStopConfirm()
          }
        }
      })
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
        item.showBtnCode = []
        if (item.isDelete === '0') {
          item.showBtnCode.push('visit-ip-stop')
        }
        if (item.isDelete === '1') {
          item.showBtnCode.push('visit-ip-open')
        }
      })
    }
  }
}
</script>
