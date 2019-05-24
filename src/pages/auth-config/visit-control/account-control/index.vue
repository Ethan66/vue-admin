<template>
  <div class="account">
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
      :selectableFn="handleSelectChange"
      @handleSendHead="handleSendHead"
      @table-jump="handleJump">
      <div class="btn-content" slot="btn">
        <span v-if="chooseDataArr.length > 0">已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1">添加授权</el-button>
        <el-button @click="handleInvalid" v-if="chooseDataArr.length > 0">失 效</el-button>
      </div>
    </table-module>
    <el-dialog title="添加授权" :visible.sync="showDialogForm1" class="dialogModule" :close-on-click-modal="false">
      <el-form :model="dialogAccountForm" :rules="diaRules" ref="dialogAccountForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="授权时间" prop="resource">
          <el-radio-group v-model="dialogAccountForm.resource">
            <div class="radio-wap">
              <el-radio class="radioDis" label="0">时间段</el-radio>
              <el-date-picker
                class="date-width"
                v-model="dialogAccountForm.date"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                :picker-options="pickerOptions0"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
            <el-radio label="1">永久授权</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input class="text-input" type="textarea" maxlength="100" placeholder="100字以内" v-model="dialogAccountForm.desc"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel('dialogAccountForm')">取消</el-button>
      <el-button type="primary" @click="handleSubmit('dialogAccountForm')">确定</el-button>
    </div>
  </el-dialog>
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
  </div>
</template>

<script>
import { account } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
import { apiPageConsoleUserWhite, apiAddConsoleUserWhite, apiEditConsoleUserWhiteStatus } from '@/api/visitControl'
import { debuglog } from 'util';

export default {
  mixins: [basicMethod, account],
  created () {
    this.handleGetTableData(apiPageConsoleUserWhite)
  },
  data () {
    return {
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() <= Date.now() - 8.64e7
        }
      },
      dialogAccountForm: {
          region: [],
          date: '',
          resource: '0',
          desc: ''
        },
         diaRules: {
          region: [
            { required: true, message: '请选择员工', trigger: 'blur' }
          ],
          resource: [
            { required: true, message: '请选择授权时间', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写描述内容', trigger: 'blur' }
          ]
        },
      showDialogForm1: false,
      checkArr: []
    }
  },
  watch: {
    dialogAccountForm: {
      handler (newValue,oldValue) {
        if (newValue.region.length > 0) {
          this.$refs['dialogAccountForm'].clearValidate();
        }
      },
      deep:true,
    }
  },
  methods: {
    // 确认消息
    handleConfirmInfo (fnName, txt) {
      this.confirmFn = fnName
      this.confirmContent = txt
      this.confrimDiaShow = true
    },
    // 点击新增按钮
    handleAdd () {
      this.showDialogForm1 = true
    },
    // 批量表格失效按钮
    handleInvalid () {
      this.chooseDataArr.forEach((item) => {
        this.checkArr.push(item.id)
      })
      this.handleConfirmInfo('handleBatchFirm', '此操作不可逆，是否确认操作?')
    },
    // 批量表格失效确认按钮
    handleBatchFirm () {
      this.apiEditData(apiEditConsoleUserWhiteStatus, {ids: this.checkArr, isDelete: 0}, apiPageConsoleUserWhite)
    },
    handleSelectChange (row) {
      if (row.isDelete === '1') {
        return false
      } else {
        return true
      }
    },
    // 点击对话框确认按钮
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let startTime = this.dialogAccountForm.date[0]
          let endTime = this.dialogAccountForm.date[1]
          if (!startTime) {
            this.$message({type: 'error', message: '请选择时间'})
            return false
          } else {
            this.editData.grandBegin = startTime
            this.editData.grandEnd = endTime
            this.apiCreateData(apiAddConsoleUserWhite, this.editData, apiPageConsoleUserWhite)
          }
        } else {
          return false;
        }
      })
    },
    handleCancel () {
      this.showDialogForm1 = false
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.showBtn = []
        if (item.isDelete === '0') {
          item.showBtn.push('失 效')
        }
      })
    }
  }
}
</script>
<style lang="less">
.account {
  .dialogModule {
    .el-dialog {
     width: 540px;
    }
  }
  .is-checked {
    .el-radio__inner {
      background: #4162DB;
    }
  }
  .radio-wap {
    width: 375px;
    overflow: hidden;
    margin-bottom: 20px;
    .date-width {
      width: 230px;
      margin-left: 10px;
      .el-range-separator {
        line-height: 24px !important;
        width: 10% !important;
      }
      .el-input__icon {
        line-height: 24px !important;
      }
    }
  }
  .text-input {
    textarea {
      height: 90px;
    }
  }
}
</style>
