<template>
  <el-dialog
    :class="'shapeHistory'"
    title="历史版本"
    width="700px"
    :visible.sync="showDialog1"
  >
    <table-module
      ref="table"
      :table-data="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      layout="prev, pager, next"
      @table-jump="handleJump"
    >
    </table-module>
  </el-dialog>
</template>

<script>
import basicMethod from '@/config/mixins'
import { shapeHistory } from '../../mixin'
import { apiListHistoryProductFrom } from '@/api/financeProduct'

export default {
  props: {
    showDialog: Boolean,
    shapeId: Number
  },
  mixins: [basicMethod, shapeHistory],
  computed: {
    showDialog1: {
      get () { return this.showDialog },
      set (val) { this.$emit('update:showDialog', val) }
    }
  },
  watch: {
    showDialog1 (val) {
      if (val) {
        this.handleGetTableData(apiListHistoryProductFrom, { id: this.shapeId })
      }
    }
  },
  created () {
    this.tablePages.pageSize = 4
  },
  methods: {
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
    },
    // 选择页面跳转
    handleJump (currentPage) {
      this.handleGetTableData(this.getTableDataApi, { id: this.shapeId }, currentPage)
    }
  }
}
</script>

<style lang="less">
  .shapeHistory{
    .el-dialog__header{
      padding-top: 16px;
      border-bottom: 1px solid #e8e8e8;
      .el-dialog__title {
        font-size: 16px;
        font-weight: bold;
      }
    }
    .el-dialog__body{
      padding: 26px 20px 36px;
      .tableModule{
        padding: 0;
        .el-table{
          border-right: 1px solid #e8e8e8;
        }
        .right{
          height: 68px;
          .el-pagination{
            top: 36px;
            left: 50%;
            right: auto;
            transform: translateX(-50%);
          }
        }
      }
    }
    .el-table__row{
      td:nth-child(2) {
        border-right: 1px solid #e8e8e8;
      }
    }
  }
</style>
