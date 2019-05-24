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
import { loginLog } from '@/createData/log/loginLog'
import basicMethod from '@/config/mixins'
import { apiListPageLoginLog } from '@/api/authority'

export default {
  mixins: [basicMethod, loginLog],
  created () {
    this.handleGetTableData(apiListPageLoginLog)
  },
  data () {
    return {}
  },
  methods: {
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.loginStatus = item.loginStatus === '0' ? '成功' : '失败'
      })
    }
  }
}
</script>
