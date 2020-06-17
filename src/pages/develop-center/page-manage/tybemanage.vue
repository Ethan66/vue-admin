<template>
  <div class="substance">
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
        <el-button @click="handleFastCreate" v-if="$authBtn('tybe-fast-create')">{{ $authBtn('tybe-fast-create') }}</el-button>
        <el-button @click="handleHandAdd" v-if="$authBtn('tybe-hand-create')">{{ $authBtn('tybe-hand-create') }}</el-button>
        <el-button @click="handleDelete" v-if="$authBtn('tybe-hand-delete')">{{ $authBtn('tybe-hand-delete') }}</el-button>
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
import { tybeManage } from '../mixin'
import basicMethod from '@/config/mixins'
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
      },
      seleData: []
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
    },
    // 点击表格保存按钮
    handleEditData (row) {
      if (!row.isDelete) {
        delete row.isDelete
      }
      this.apiEditData(apiUpdatePageField, row, apiPageFiledQueryList)
    },
    // 点击表格删除按钮
    handleDeleteData (rows) {
      let ids = []
      if (this.seleData.length > 0) {
        if (this.seleData.constructor === Object) {
          ids.push(this.seleData.id)
        } else {
          ids = this.seleData.map(item => {
            return item.id
          })
        }
      } else {
        if (rows.constructor === Object) {
          ids.push(rows.id)
        } else {
          ids = rows.map(item => {
            return item.id
          })
        }
      }
      apiDeletePageField({ ids }).then(res => {
        if (res.code === '208999') {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.handleGetTableData(apiPageFiledQueryList, Object.assign({}, this.searchValues, this.searchDefaultObj))
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击删除按钮
    handleDelete () {
      this.seleData = this.chooseDataArr
      this.$confirm('此操作不可逆，确认继续操作？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleDeleteData()
          }
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      this.tableData.sort((v1, v2) => v1.fieldSort - v2.fieldSort)
      this.tableData = tableData.map(item => {
        if (item.editStatus) {
          item.showBtn = ['取消']
        } else {
          item.showBtn = ['删除']
        }
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
