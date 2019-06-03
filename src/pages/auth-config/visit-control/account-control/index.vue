<template>
  <div class="account catalog">
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
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1 && $showBtn('visit-c-add')">{{$getBtnName('visit-c-add')}}</el-button>
        <el-button @click="handleInvalidPl" v-if="chooseDataArr.length > 0 && $showBtn('visit-c-stop-batch')">{{$getBtnName('visit-c-stop-batch')}}</el-button>
      </div>
    </table-module>
    <el-dialog title="添加授权" :visible.sync="showDialogForm1" class="dialogModule" :close-on-click-modal="false">
      <el-form :model="dialogAccountForm" :rules="diaRules" ref="dialogAccountForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="请选择员工" prop="region">
          <tree-select
            ref="treeSelect"
            :data="treeList" :defaultProps="defaultProps"
            multiple nodeKey="id" :checkedKeys="treeCheckedData"
            @popoverHide="popoverHide"
            @change="popoverHide"></tree-select>
        </el-form-item>
        <el-form-item label="授权时间" prop="grandType">
          <el-radio-group v-model="dialogAccountForm.grandType">
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
        <el-form-item label="描述" prop="remark">
          <el-input class="text-input" type="textarea" maxlength="100" placeholder="100字以内" v-model="dialogAccountForm.remark"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel('dialogAccountForm')">取消</el-button>
      <el-button type="primary" @click="handleSubmit('dialogAccountForm')">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { account } from '../../mixins'
import basicMethod from '@/config/mixins'
import { apiPageConsoleUserWhite, apiAddConsoleUserWhite, apiEditConsoleUserWhiteStatus } from '@/api/visitControl'
import { debuglog } from 'util';
import treeSelect from '@/components/modules/tree-select'
import { apiQueryDepartmentTree, apiListConsoleUser } from '@/api/staff'

export default {
  name: 'account-control',
  mixins: [basicMethod, account],
  components: { treeSelect },
  created () {
    this.handleGetTableData(apiPageConsoleUserWhite)
    this.handleApiListConsoleUser()
    this.tableItem.push({fixed: "right", label: "操作", prop: "btn", type: "btn", width: 75})
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
          grandType: '0',
          remark: ''
        },
         diaRules: {
          region: [
            { required: true, message: '请选择员工', trigger: 'change' }
          ],
          grandType: [
            { required: true, message: '请选择授权时间', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写描述内容', trigger: 'blur' }
          ]
        },
      showDialogForm1: false,
      checkArr: [],
      defaultProps: {
        children: 'childIdList',
        label: 'departmentName'
      },
      treeList: [],
      treeCheckedData: [],
      consoleUserIds: [],
      saveDataId: '' 
    }
  },
  methods: {
    // 查询系统用户列表
    handleApiListConsoleUser () {
      let list = []
      let treeList = []
      let params = {
        isWhole: true,
        hasStop: true
      }
      apiListConsoleUser({
        pageSize: 0,
        currentPage: 0
      }).then(res => {
        if (res.code === '208999') {
          list = res.resultMap.page.list
          list.map(item => {
            item.parentId = item.departmentId
            item.departmentName = item.realName
            item.id = 'a' + item.id
          })
          apiQueryDepartmentTree(params).then(res => {
            if (res.code === '208999') {
              treeList = res.resultMap.data
              this.treeList = this.$disposeTreeData(treeList.concat(list))
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 员工选择
    popoverHide (checkedIds, checkedData) {
      let list = checkedIds.filter(item => {
        if (typeof item === 'string' && item.includes('a')) {
          return item
        }
      })
      this.$refs.treeSelect.selectedData = list
      list = list.map(item => {
        return item.replace(/a/g, '')
      })
      this.consoleUserIds = list
      this.dialogAccountForm.region = list
    },
    // 点击新增按钮
    handleAdd () {
      this.showDialogForm1 = true
    },
    // 批量表格失效按钮
    handleInvalidPl () {
      this.chooseDataArr.forEach((item) => {
        this.checkArr.push(item.id)
      })
      this.$confirm('确认失效对该账号的授权吗？失效后该账号无法通过外网访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleBatchFirmPl()
          }
        }
      })
    },
    // 表格失效按钮
    handleInvalid (row) {
      this.saveDataId = row.id
      this.$confirm('确认失效对该账号的授权吗？失效后该账号无法通过外网访问管理后台。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleBatchFirm()
          }
        }
      })
    },
    // 批量表格失效确认按钮
    handleBatchFirmPl () {
      this.apiEditData(apiEditConsoleUserWhiteStatus, {ids: this.checkArr, isDelete: 1}, apiPageConsoleUserWhite)
    },
    // 表格失效确认按钮
    handleBatchFirm () {
      this.apiEditData(apiEditConsoleUserWhiteStatus, {ids: [this.saveDataId], isDelete: 1}, apiPageConsoleUserWhite)
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
          if (!startTime && this.dialogAccountForm.grandType === '0') {
            this.$message({type: 'error', message: '请选择时间'})
            return false
          } else {
            this.editData.grandBegin = startTime
            this.editData.grandEnd = endTime
            this.editData.remark = this.dialogAccountForm.remark
            this.editData.grandType = this.dialogAccountForm.grandType
            this.editData.consoleUserIds = this.consoleUserIds
            apiAddConsoleUserWhite(this.editData).then(res => {
              if (res.code === '208999') {
                this.$message.success('添加成功')
                this.handleGetTableData(apiPageConsoleUserWhite)
                this.showDialogForm1 = false
                this.$refs[formName].resetFields()
                this.$refs.treeSelect.clearSelectedNodes()
              } else {
                this.$message.error(res.message)
              }
            })
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
        if (item.grandBegin) {
          item.grandBegin = item.grandBegin + '至' + item.grandEnd
        } else {
          item.grandBegin = '永 久'
        }
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
