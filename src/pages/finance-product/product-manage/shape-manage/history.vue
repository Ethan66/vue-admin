<template>
  <el-dialog
    :class="'shapeHistory'"
    title="历史版本"
    width="700px"
    :visible.sync="showDialog1"
  >
    <table-module
      ref="table"
      :table-data="tableData1"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      layout="prev, pager, next"
    >
    </table-module>
  </el-dialog>
</template>

<script>
import basicMethod from '@/config/mixins'
import { shapeHistory } from '../../mixin'

export default {
  props: {
    showDialog: Boolean,
    editData: Object
  },
  mixins: [basicMethod, shapeHistory],
  computed: {
    showDialog1: {
      get () { return this.showDialog },
      set (val) { this.$emit('update:showDialog', val) }
    },
    tableData1 () {
      return [this.editData]
    }
  },
  created () {
    this.tablePages = { current: 1, pageSize: 3, total: 12 }
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
  }
</style>
