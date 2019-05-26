<template>
  <el-dialog title="快速生成" :visible.sync="showDialog" :class="[`create-tybe`, { 'handCreate': this.type==='handCreate' }]">
    <template v-if="type==='fastCreate' && step !== 2">
      <el-steps :active="step" finish-status="success">
        <el-step title="选择表"></el-step>
        <el-step title="生成字段"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <template v-if="step===0">
        <el-form ref="form" :model="form" label-width="67px" :rules="rules">
          <el-form-item label="表名" prop="name">
            <el-input v-model="form.name" placeholder="请输入表名"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </template>
    <template v-if="step===1">
      <table-module
        ref="table"
        isInlineEdit
        :inlineLabelToValue="inlineLabelToValue"
        :table-data.sync="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
        maxHeight="200"
      />
    </template>
    <template v-if="step===2">
      <div class="finish">
        <p class="img">
          <i class="el-icon-success"></i>
        </p>
        <p class="text">提交完成</p>
        <p class="btn">
          <el-button>取消</el-button>
          <el-button type="primary" @click="handleContinueAdd">继续添加</el-button>
        </p>
      </div>
    </template>
    <span slot="footer" class="dialog-footer" v-if="step !== 2">
      <el-button @click="showDialog = false">取 消</el-button>
      <el-button v-if="step===1 && type==='fastCreate'" type="primary" @click="step--">上一步</el-button>
      <el-button v-if="step===0" type="primary" @click="handleGoNext">下一步</el-button>
      <el-button v-if="step===1" type="primary" @click="handleSubmit">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fastCreateType } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import { apiPageFiledQueryList, apiAddPageField, apiPageFieldRapidGeneration, apiAddBatchPageField } from '@/api/developCenter'


export default {
  mixins: [basicMethod, fastCreateType],
  props: {
    type: String,
    showCreateTybe: Boolean,
    pageCode: String,
    menuCode: String
  },
  data () {
    return {
      step: 0,
      form: { name: '' },
      showDialog: false,
      handTableData: [{ fieldName: '', fieldValue: '', fieldRequired: 1, displayStatus: 0, setStatus: 1, fieldSort: 0, editStatus: true }],
      inlineLabelToValue: {
        displayStatus: [],
        setStatus: [],
        fieldRequired: []
      }
    }
  },
  watch: {
    showCreateTybe (val) {
      if (val) {
        this.showDialog = true
        this.tableItem[0].show = true
        this.tableItem[1].type = 'cell'
        this.tableItem[5].show = true
        // this.tableItem[6] && this.tableItem.pop()
        if (this.type === 'handCreate') {
          this.tableItem[0].show = false
          this.tableItem[1].type = 'input'
          this.tableItem[5].show = false
          this.tableItem[6] = { label: '显示排序', prop: 'fieldSort', type: 'input' }
          this.tableData = JSON.parse(JSON.stringify(this.handTableData))
          this.step++
        }
      }
    },
    showDialog (val) {
      if (!val) {
        this.step = 0
        this.form.name = ''
        this.$emit('update:showCreateTybe', val)
      }
    },
  },
  created () {
    Object.keys(this.inlineLabelToValue).forEach(key => {
      this.inlineLabelToValue[key] = [{ label: '否', value: 0 }, { label: '是', value: 1 }]
    })
    this.rules = {
      name: [
        { required: true, message: '请输入表名', trigger: 'blur' }
      ]
    }
  },
  methods: {
    handleGoNext () {
      if (this.step === 0) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.step++
            this.handleGetTableData(apiPageFieldRapidGeneration, { tableName: this.form.name })
          }
        })
      } else {
        this.step++
      }
    },
    handleSubmit () {
      let pageCode = this.pageCode
      let menuCode = this.menuCode
      if (this.type === 'fastCreate') {
        const list = JSON.parse(JSON.stringify(this.tableData)).map(item => {
          item.displayStatus = item.displayStatus === '是' ? 1 : 0
          item.setStatus = item.setStatus === '是' ? 1 : 0
          item.fieldRequired = item.fieldRequired === '是' ? 1 : 0
          item.menuCode = menuCode
          item.pageCode = pageCode
          return item
        })
        apiAddBatchPageField({ list }).then(res => {
          if (res.code === '208999') {
            this.step++
            this.$getSuccessMsg(this, res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        apiAddPageField(Object.assign({}, this.tableData[0], { pageCode, menuCode })).then(res => {
          if (res.code === '208999') {
            this.step++
            this.$getSuccessMsg(this, res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    handleContinueAdd () {
      if (this.type === 'fastCreate') {
        this.step = 0
        this.form.name = ''
      } else {
        this.tableData = JSON.parse(JSON.stringify(this.handTableData))
        this.step = 1
      }
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {}
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '208999') {
          this.tablePages.current = currentPage
          this.allData = res.resultMap.pageFields.list
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        }
      })
    },
    // 表格数据处理
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.displayStatus = item.displayStatus ? '是' : '否'
        item.setStatus = item.setStatus ? '是' : '否'
        item.fieldRequired = item.fieldRequired ? '是' : '否'
        return item
      })
    }
  }
}
</script>

<style lang="less">
  .create-tybe{
    &.handCreate{
      .el-dialog{
        min-height: 425px;
      }
    }
    .el-dialog{
      width: 900px;
      min-height: 555px;
      position: relative;
      .el-dialog__header{
        padding: 0;
        border-bottom: 1px solid #e8e8e8;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #333;
        .el-dialog__headerbtn{
          top: 14px;
        }
      }
      .el-dialog__body{
        padding: 30px 54px 0;
        .el-steps{
          padding: 15px 116px 40px;
          .el-step__title{
            &.is-process{
              font-weight: normal;
            }
            &.is-success{
              color: #4162DB;
            }
          }
          .el-step__head{
            .el-step__icon.is-text{
              border: 1px solid;
            }
            font-size: 14px;
            color: #4162DB;
            border-color: #4162DB;
            .is-status{
              color: #4162DB;
            }
            &.is-success{
              .el-step__line, .el-step__line-inner{
                background: #4162DB;
              }
            }
            .el-step__line{
              margin-left: 46px;
              height: 1px;
              top: 15px;
            }
            .el-step__line-inner{
              border-top-width: 0 !important;
            }
            &.is-process{
              .el-step__icon{
                background: #4162DB;
                color: #fff;
              }
            }
            &.is-wait{
              color: rgba(0,0,0,0.15);
            }
          }
          .el-step__icon{
            width: 32px;
            height: 32px;
          }
        }
        .el-step{
          margin-right: 14px !important;
          &:nth-child(1) {
            .el-step__title{
              margin-left: -8px;
            }
          }
          &:nth-child(2) {
            .el-step__title{
              margin-left: -16px;
            }
          }
        }
      }
    }
    .el-form{
      margin: 80px 150px 174px 128px;
      .el-form-item{
        margin-bottom: 0;
      }
      .el-form-item__label{
        color: #333;
        padding-right: 20px;
        font-size: 18px;
        font-weight: normal;
      }
      .el-input__inner{
        font-size: 18px;
      }
    }
    .el-dialog__footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
      border-top: 1px solid #e8e8e8;
      padding: 30px 0;
    }
    .tableModule{
      margin: 0 0 54px;
      padding: 0 2px;
    }
    .finish{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .img{
        i{
          font-size: 80px;
          color: green;
        }
      }
      .text{
        margin: 15px 0 30px;
        font-size: 18px;
        color: #000;
      }
      .el-button{
        width: 88px;
        padding: 12px 0;
      }
    }
    .el-button{
      padding: 12px 28px;
      &+.el-button{
        margin-left: 20px;
      }
    }
  }
</style>
