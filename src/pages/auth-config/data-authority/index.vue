<template>
  <div class="data-auth substance">
    <div class="illustration">
      <h4>说明</h4>
      <p>1、私有：对象中所有数据遵循拥有者及其汇报对象对数据可见，拥有者及其具有编辑权限的汇报对象可对这条数据进行编辑；上级部门的部门负责人可以看到下级部门的所有数据。</p>
      <p>2、公开只读：对象中所有对象对全公司公开，单条数据的拥有者及其具有编辑权限的汇报对象可对这条数据进行编辑。</p>
      <p>公开读写：对象中所有数据对全公司公开，具有编辑权限的成员对该数据编辑。</p>
    </div>
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      >
    </table-module>
  </div>
</template>

<script>
import basicMethod from '@/config/mixins'
import { dataAuth } from '../mixins'
import { apiQueryMenuPageList, apiOperateMenuDataRule } from '@/api/authority'

export default {
  data () {
    return {
    }
  },
  mixins: [dataAuth, basicMethod],
  created () {
    this.tablePages.pageSize = 1000
    this.handleGetTableData(apiQueryMenuPageList)
  },
  methods: {
    // 单选框点击选择
    handleChooseAuth (row) {
      apiOperateMenuDataRule({ code: row.code, sharePermission: row.sharePermission }).then(res => {
        if (res.code === '208999') {
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .data-auth{
    .illustration{
      border: 12px solid #fff;
      padding: 12px;
      background:rgba(65,98,219,0.1);
      h4{
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 17px;
      }
      p{
        line-height: 25px;
        font-size: 12px;
      }
    }
  }
</style>
