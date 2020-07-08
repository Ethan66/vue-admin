<template>
  <div class="share-manage substance">
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
        <el-button @click="handleAdd" v-if="$getBtnName('product-shape-create')">{{$getBtnName('product-shape-create')}}</el-button>
        <el-button @click="handleGoBack">返回</el-button>
      </div>
    </table-module>
    <shape-edit
      ref="shapeEditDialog"
      :title="dialogTitle"
      :showDialog.sync="showShapeEdit"
      :shapeData="editData"
      @handleSubmit="handleSubmit"
    ></shape-edit>
    <shape-info
      title="形态信息"
      :showDetail.sync="showShapeInfo"
      :shapeInfoData="shapeInfoData"
    ></shape-info>
    <history
      :showDialog.sync="showHistory"
      :shapeId="shapeId"
    />
  </div>
</template>

<script>
import { shapeManage } from '../../mixin'
import basicMethod from '@/config/mixins'
import shapeEdit from './shape-edit'
import shapeInfo from './shape-info'
import history from './history'
import { apiPageQueryProductForm, apiGetProductFrom, apiCreateOrEditeProductForm, apiSetProductFormStatus, apiDeleteProductFrom } from '@/api/financeProduct'

export default {
  name: 'shape-manage',
  mixins: [basicMethod, shapeManage],
  components: { shapeEdit, shapeInfo, history },
  data () {
    return {
      showShapeEdit: false,
      showShapeInfo: false,
      shapeInfoData: {},
      showHistory: false,
      shapeId: 0
    }
  },
  created () {
    this.searchDefaultObj = { productId: this.$route.query.productId }
    this.handleGetTableData(apiPageQueryProductForm, Object.assign(this.searchValues, this.searchDefaultObj))
  },
  methods: {
    // 返回产品管理页面
    handleGoBack () {
      this.$router.push({
        path: '/finance-product/product-manage/index'
      })
    },
    // 点击新增按钮
    handleAdd () {
      this.isEdit = 0
      this.dialogTitle = '新建形态'
      this.showShapeEdit = true
    },
    // 点击查看
    handleShowDetailDialog (item) {
      apiGetProductFrom({id: item.id}).then(res => {
        if (res.code === '208999') {
          this.showShapeInfo = true
          this.shapeInfoData = res.resultMap.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑按钮事件
    handleEditData (row) {
      this.isEdit = 1
      this.dialogTitle = '编辑形态'
      apiGetProductFrom({id: row.id}).then(res => {
        if (res.code === '208999') {
          this.editData = res.resultMap.data
          this.showShapeEdit = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击表格启用停用按钮
    handleStartupShape (row) {
      let text = row.productFormStatus === 0 ? '确定停用该形态？停用前请先确认使用该形态的应用是否已全部切换至其他形态' : '确定启用该形态'
      this.$confirm(text, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            let status = row.productFormStatus === 0 ? 1: 0
            apiSetProductFormStatus({ id: row.id, productFormStatus: status }).then(res =>{
              if (res.code === '208999') {
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.handleGetTableData(apiPageQueryProductForm, this.searchValues)
              } else {
                this.$message.error(res.message)
              }
            })
          }
        }
      })
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      apiDeleteProductFrom({ id: row.id }).then(res => {
        if (res.code === '208999') {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.handleGetTableData(apiPageQueryProductForm, this.searchValues)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击历史版本
    handleShowHistory (row) {
      this.shapeId = row.id
      this.showHistory = true
    },
    // 点击对话框确认按钮
    handleSubmit (val) {
      this.$refs.shapeEditDialog.showDialog1 = false
      val.productId = this.$route.query.productId
      apiCreateOrEditeProductForm(val).then(res => {
        if (res.code === '208999') {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.handleGetTableData(apiPageQueryProductForm, this.searchValues)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.showBtnCode = item.productFormStatus === 0 ? ['product-shape-stop'] : ['product-shape-startup']
      })
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      let obj = this.handleSaveSearchValues(val, currentPage)
      val = obj.val || val
      currentPage = obj.currentPage || currentPage
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {
        currentPage: this.tablePages.current, pageSize: this.tablePages.pageSize
      }
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '208999') {
          this.allData = res.resultMap.list
          this.tablePages.current = currentPage
          this.tablePages.total = res.resultMap.totalCount
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
