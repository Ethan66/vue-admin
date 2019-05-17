<template>
  <div class="catalog">
    <search-module
      class="searchContent"
      :search-item="searchItem"
      :search-values="searchValues"
      :search-default-obj="defaultSearchObj"
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
import { errorLog } from '@/createData/log/errorLog'
import basicMethod from '@/config/mixins'
import { apiListPageLoginErrorLog } from '@/api/authority'

export default {
  mixins: [basicMethod, errorLog],
  created () {
    this.handleGetTableData(apiListPageLoginErrorLog)
  },
  data () {
    return {
      defaultSearchObj: { a: 1 }
    }
  },
  methods: {
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.loginStatus = item.loginStatus === 1 ? '失败' : '成功'
      })
    }
  }
}
</script>
