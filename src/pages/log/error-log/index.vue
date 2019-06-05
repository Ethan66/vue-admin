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
    </table-module>
  </div>

</template>

<script>
import { errorLog } from '../mixin'
import basicMethod from '@/config/mixins'
import { apiListPageLoginErrorLog } from '@/api/authority'
import { apiQueryParentConsoleMenu } from '@/api/developCenter'

export default {
  name: 'error-log',
  mixins: [basicMethod, errorLog],
  created () {
    this.handleGetTableData(apiListPageLoginErrorLog)
    this.handleGetPageList()
  },
  data () {
    return {}
  },
  methods: {
    handleSendHead (val) {
      console.log(val)
    },
    // 获取菜单下拉列表
    handleGetPageList () {
      apiQueryParentConsoleMenu({ menuLevel: 2 }).then((res) => {
        if (res.code === '208999') {
          res.resultMap.data.forEach(item => {
            item['label'] = item.menuName
            item['value'] = item.code
          })
          this.searchItem[0].options = res.resultMap.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        // item.loginStatus = item.loginStatus === 1 ? '失败' : '成功'
      })
    }
  }
}
</script>
