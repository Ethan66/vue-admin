<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    />
    <table-module
      ref="table"
      isInlineEdit
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @table-jump="handleJump"
      >
      <div class="btn-content" slot="btn">
        <el-button @click="handleFastCreate">快速生成</el-button>
        <el-button @click="handleHandAdd">手动添加</el-button>
        <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">返回列表</el-button>
      </div>
    </table-module>
    <create-tybe
      :showCreateTybe.sync="showCreateTybe"
      :type="type"
      :dialogTitle="dialogTitle"
      />
  </div>
</template>

<script>
import { tybeManage } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import { apiListSysMenu, apiQueryParentSysMenu, apiCreateSysMenu, apiEditSysMenu, apiDeleteSysMenu, apiListSysButton, apiEditeSysButton, apiCreateSysButton, apiDeleteSysButton } from '@/api/authority'
import createTybe from './createtybe'

export default {
  mixins: [basicMethod, tybeManage],
  components: { createTybe },
  data () {
    return {
      showCreateTybe: false,
      type: 'handCreate',
      dialogTitle: ''
    }
  },
  created () {
    this.handleGetTableData(apiListSysMenu)
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
    handleEditData (row) {
      console.log(row)
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      this.tableData = tableData.map(item => {
        if (item.menuLevel === 0) {
          item.menuLevel = '一级菜单'
        } else if (item.menuLevel === 1) {
          item.menuLevel = '二级菜单'
          item.showBtn = ['编辑']
        }
        return item
      })
    },
    // 点击对话框确认按钮
    handleSubmit () {
      if (this.editData.menuParentId) {
        if (this.editData.menuUrl === '') {
          this.$message.error('二级菜单必须要填写uxrl')
          return false
        }
      }
      if (this.editData.menuUrl === '') {
        this.editData.menuUrl = 'null'
      }
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateSysMenu, this.editData, apiListSysMenu)
      } else {
        this.apiEditData(apiEditSysMenu, this.editData, apiListSysMenu)
      }
    }
  }
}
</script>
