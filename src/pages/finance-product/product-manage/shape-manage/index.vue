<template>
  <div class="share-manage">
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
        <el-button @click="handleAdd" v-if="$authBtn('product-shape-create')">{{$authBtn('product-shape-create')}}</el-button>
        <el-button @click="handleGoBack">返回</el-button>
      </div>
    </table-module>
    <shape-edit
      ref="shapeEditDialog"
      :title="dialogTitle"
      :showDialog.sync="showShapeEdit"
      :shapeData="shapeData"
      @handleSubmit="handleSubmit"
    ></shape-edit>
    <shape-info
      title="形态信息"
      :showDetail.sync="showShapeInfo"
      :editData="editData"
    ></shape-info>
    <history
      :editData="editData"
      :showDialog.sync="showHistory"
    />
  </div>
</template>

<script>
import { shapeManage } from '../../mixin'
import basicMethod from '@/config/mixins'
import configTybe from '@/config/pageKey'
import { apiQueryPageList, apiAddPage, apiUpdatePage, apiListConsoleMenu, apiAddBatchPageField, apiQueryParentConsoleMenu } from '@/api/developCenter'

import shapeEdit from './shape-edit'
import shapeInfo from './shape-info'
import history from './history'

export default {
  name: 'page-manage',
  mixins: [basicMethod, shapeManage],
  components: { shapeEdit, shapeInfo, history },
  data () {
    return {
      showShapeEdit: false,
      showShapeInfo: false,
      showHistory: false,
      shapeData: {
        name: '', object: '', region: ''
      },
      batchMenuList: [],
      batchPageList: []
    }
  },
  created () {
    this.handleGetTableData(apiQueryPageList)
    this.handleGetPageListData()
  },
  methods: {
    // 返回产品管理页面
    handleGoBack () {
      this.$router.push({
        path: '/finance-product/product-manage/index'
      })
    },
    // 获取菜单下拉列表
    handleGetPageListData () {
      apiQueryParentConsoleMenu({menuLevel: 2, isDelete: 0}).then((res) => {
        if (res.code === '208999') {
          res.resultMap.data.forEach(item => {
            item['label'] = item.menuName
            item['value'] = item.code
          })
          this.searchItem[0].options = res.resultMap.data
          console.log(this.searchItem)
        } else {
          this.$message.error(res.message)
        }
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
      this.editData = JSON.parse(JSON.stringify(item))
      this.showShapeInfo = true
    },
    // 编辑按钮事件
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.dialogTitle = '编辑形态'
      this.showShapeEdit = true
    },
    // 点击表格启用停用按钮
    handleStartupShape () {
      this.$confirm('确定启用/停用该形态？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            console.log(1)
          }
        }
      })
    },
    // 点击表格删除按钮
    handleDeleteData () {
    },
    // 点击历史版本
    handleShowHistory (item) {
      this.editData = JSON.parse(JSON.stringify(item))
      this.showHistory = true
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.shapeEditDialog.showDialog1 = false
      if (this.isEdit === 0) {
        console.log(1)
      } else {
        console.log(2)
      }
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.pageStatusStash = item.pageStatus
        item.showBtnCode = item.pageStatusStash === 0 ? ['product-shape-stop'] : ['product-shape-startup']
        switch (item.pageStatus) {
          case 0:
            item.pageStatus = '正常'
            break
          case 1:
            item.pageStatus = '停用'
            break
        }
      })
    },
    validatePageName (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[0].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validatePageCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[1].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validatePageUrl (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[2].placeholder))
      }
      if (value.length > 100) {
        return callback(new Error('输入内容不能超过100字'))
      }
      callback()
    },
  }
}
</script>
