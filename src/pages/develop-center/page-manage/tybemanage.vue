<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      :search-default-obj="searchDefaultObj"
      @handleSearch="handleSearch"
    />
    <table-module
      ref="table"
      isInlineEdit
      :inlineLabelToValue="inlineLabelToValue"
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @table-jump="handleJump"
      >
      <div class="btn-content" slot="btn">
        <el-button @click="handleFastCreate" v-if="$showBtn('tybe-fast-create')">{{ $getBtnName('tybe-fast-create') }}</el-button>
        <el-button @click="handleHandAdd" v-if="$showBtn('tybe-hand-create')">{{ $getBtnName('tybe-hand-create') }}</el-button>
        <el-button @click="handleDelete" v-if="$showBtn('tybe-hand-delete')">{{ $getBtnName('tybe-hand-delete') }}</el-button>
        <el-button @click="$router.go(-1)">返回列表</el-button>
      </div>
    </table-module>
    <create-tybe
      :showCreateTybe.sync="showCreateTybe"
      :type="type"
      :menuCode="menuCode"
      :pageCode="pageCode"
      :dialogTitle="dialogTitle"
      />
  </div>
</template>

<script>
import { tybeManage } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiPageFiledQueryList, apiUpdatePageField, apiDeletePageField, apiAddPageField, apiPageFieldRapidGeneration } from '@/api/developCenter'
import createTybe from './createtybe'

export default {
  name: 'tybe-manage',
  mixins: [basicMethod, tybeManage],
  components: { createTybe },
  data () {
    return {
      showCreateTybe: false,
      type: 'handCreate',
      dialogTitle: '',
      inlineLabelToValue: {
        displayStatus: [],
        setStatus: [],
        fixedStatus: [],
        fieldRequired: []
      }
    }
  },
  watch: {
    showCreateTybe (val) {
      if (!val) {
        this.handleGetTableData(apiPageFiledQueryList, this.searchValues)
      }
    }
  },
  created () {
    Object.keys(this.inlineLabelToValue).forEach(key => {
      this.inlineLabelToValue[key] = [{ label: '否', value: 0 }, { label: '是', value: 1 }]
    })
    const { menuCode, pageCode } = this.$route.query
    console.log(1)
    this.searchDefaultObj = { menuCode, pageCode }
    this.menuCode = menuCode
    this.pageCode = pageCode
    this.handleGetTableData(apiPageFiledQueryList, Object.assign({}, this.searchValues, this.searchDefaultObj))
  },
  methods: {
    // 点击快速生成按钮
    handleFastCreate () {
      this.isEdit = 0
      this.type = 'fastCreate'
      this.dialogTitle = '新增菜单'
      this.showCreateTybe = true
    },
    // 点击手动添加按钮
    handleHandAdd () {
      this.type = 'handCreate'
      this.showCreateTybe = true
    },
    // 页面名称字段点击事件
    handleGoPage () {
      console.log(111)
    },
    // 点击表格保存按钮
    handleEditData (row) {
      this.apiEditData(apiUpdatePageField, row, apiPageFiledQueryList)
    },
    // 点击表格删除按钮
    handleDeleteData (rows) {
      let ids = []
      if (rows.constructor === Object) {
        ids.push(rows.id)
      } else {
        ids = rows.map(item => {
          return item.id
        })
      }
      apiDeletePageField({ ids }).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, '删除成功')
          this.handleGetTableData(apiPageFiledQueryList, Object.assign({}, this.searchValues, this.searchDefaultObj))
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击删除按钮
    handleDelete () {
      this.handleDeleteData(this.chooseDataArr)
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      this.tableData = tableData.map(item => {
        item.displayStatus = item.displayStatus ? '是' : '否'
        item.setStatus = item.setStatus ? '是' : '否'
        item.fixedStatus = item.fixedStatus ? '是' : '否'
        item.fieldRequired = item.fieldRequired ? '是' : '否'
        return item
      })
    }
  }
}
</script>
