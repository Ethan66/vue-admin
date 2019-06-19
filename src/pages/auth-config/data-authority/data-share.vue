<template>
  <div class="data-share">
    <article>
      <el-menu
        text-color="#999"
        default-active="0"
        active-text-color="#4162DB"
        @select="handleSelectMenu"
      >
       <el-menu-item index="0" disabled>
          <span slot="title">菜单分类</span>
        </el-menu-item>
        <el-menu-item
          v-for="(item, i) in menuData"
          :key="i"
          :index="String(item.menuCode)"
        >
          <span slot="title">{{ `${item.menuName}(${item.num})` }}</span>
        </el-menu-item>
      </el-menu>
    </article>
    <section>
      <search-module
        :search-item="searchItem"
        :search-values="searchValues"
        :search-default-obj="searchDefaultObj"
        @handleSearch="handleSearch"
      ></search-module>
      <table-module
        ref="table"
        :table-data="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
        :table-pages="tablePages"
        @table-jump="handleJump"
      >
        <div class="btn-content" slot="btn">
          <el-button @click="handleAdd" v-if="$authBtn('data-share-create-rule')">{{ $authBtn('data-share-create-rule') }}</el-button>
        </div>
      </table-module>
    </section>
    <dialog-module
      ref="dialog"
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
      :select-tree-checked-value="selectTreeCheckedValue"
      :select-tree-checked-value-two="selectTreeCheckedValue2"
      :selectTreeWidth="304"
      :selectTreeWidth2="304"
      selectTreekey="dataFrom"
      selectTreekey2="dataTo"
      selectTreeMultiple
      selectTreeMultiple2
      @handleSelectTreeValue="handleSelectTreeValue"
      @handleSelectTreeValue2="handleSelectTreeValue2"
      @handleClearSelectTree="handleClearSelectTree"
      @handleClearSelectTree2="handleClearSelectTree2"
    />
  </div>
</template>

<script>
import { dataShare } from '../mixins'
import basicMethod from '@/config/mixins'
import { apiListConsoleUser, apiQueryDepartmentTree } from '@/api/authority'
import { menuRelation } from '@/config/utils'
import { apiListConsoleMenu, apiEditeConsoleMenu, apiCreateConsoleMenu, apiDeleteConsoleMenu } from '@/api/developCenter'
import { apiQueryDataRulePageList, apiCreateDataRule, apiEditDataRule, apiOperateDataRuleStatus } from '@/api/authority'
export default {
  name: 'data-share',
  mixins: [dataShare, basicMethod],
  data () {
    return {
      searchDefaultObj: {},
      allDepartmentTree: [],
      menuData: [],
      selectTreeCheckedValue: [],
      selectTreeCheckedValue2: []
    }
  },
  created () {
    // this.handleGetTableData(apiListConsoleMenu)
    this.handleGetAllStaff()
    this.handleGetTableData(apiQueryDataRulePageList)
  },
  methods: {
    // 选中菜单
    handleSelectMenu (menuCode) {
      if (menuCode === 'ALL') {
        menuCode = undefined
      }
      this.searchDefaultObj = { menuCode }
      this.searchValues = {}
      this.handleGetTableData(apiQueryDataRulePageList, Object.assign(this.searchValues, this.searchDefaultObj))
    },
    // 新建规则
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem)
      this.handleClearSelectTree()
      this.handleClearSelectTree2()
      this.isEdit = 0
      this.dialogTitle = '新建规则'
      this.showDialogForm = true
      this.$nextTick(() => {
        this.$refs.dialog.$refs.editData.clearValidate()
      })
    },
    // 点击编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.menuCode = Object.keys(this.editData.menuDetail).join()
      if (this.editData.dataFrom) {
        this.editData.dataFrom = Object.keys(this.editData.dataFromDetail).map(item => 'a' + item).join()
      }
      if (this.editData.dataFrom) {
        this.selectTreeCheckedValue = this.editData.dataFrom.split(',')
      }
      if (this.editData.dataTo) this.editData.dataTo = Object.keys(this.editData.dataToDetail).map(item => 'a' + item).join()
      if (this.editData.dataTo) {
        this.selectTreeCheckedValue2 = this.editData.dataTo.split(',')
      }
      this.isEdit = 1
      this.dialogTitle = '编辑规则'
      this.showDialogForm = true
      this.$nextTick(() => {
        this.$refs.dialog.$refs.editData.clearValidate()
      })
    },
    // 点击改变状态按钮
    handleChangeStatus (row) {
      let text = '确定要启用该数据来源'
      if (row.ruleStatusStash === 0) {
        text = '确定要停用该数据来源'
      }
      this.$confirm(text, '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            this.handleChangeOrEditData(row)
          }
        }
      })
    },
    // 点击删除按钮
    handleDeleteData (row) {
      this.handleChangeOrEditData(row, 'delete')
    },
    // 点击对话框确认按钮
    handleSubmit () {
      let edit = this.editData
      edit.dataFrom = edit.dataFrom.filter(item => item.includes('a'))
      edit.dataTo = edit.dataTo.filter(item => item.includes('a'))
      edit.dataFrom && (edit.dataFrom = edit.dataFrom.join(',').replace(/a/g, ''))
      edit.dataTo && (edit.dataTo = edit.dataTo.join(',').replace(/a/g, ''))
      let obj = {
        dataFromUserIds: edit.dataFrom,
        dataToUserIds: edit.dataTo,
        menuCodes: edit.menuCode.join(','),
        id: edit.id,
        dataPermission: edit.dataPermission
      }
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateDataRule, obj, apiQueryDataRulePageList)
      } else {
        this.apiEditData(apiEditDataRule, obj, apiQueryDataRulePageList)
      }
    },
    // 选择菜单树的值后
    handleSelectTreeValue (row) {
      console.log(111, row)
      if (!row) return false
    },
    handleSelectTreeValue2 (row) {
      console.log(222, row)
    },
     // 清空菜单树的值
    handleClearSelectTree (val) {
      if (!val) {
        this.editData.dataFrom = ''
        this.selectTreeCheckedValue = []
      }
    },
    handleClearSelectTree2 (val) {
      if (!val) {
        this.editData.dataTo = ''
        this.selectTreeCheckedValue2 = []
      }
    },
    // 获取所有员工
    handleGetAllStaff () {
      return apiQueryDepartmentTree({ isWhole: true, hasStop: false }).then(res => {
        if (res.code === '208999') {
          this.allDepartmentTree = res.resultMap.data
          apiListConsoleUser({ pageSize: 0, currentPage: 0 }).then(res => {
            if (res.code === '208999') {
              let list = res.resultMap.page.list
              list.map(item => {
                item.parentId = item.departmentId
                item.departmentName = item.realName
                item.id = 'a' + item.id
              })
              this.dialogItem[0].dialogData = this.dialogItem[2].dialogData = this.$disposeTreeData(this.allDepartmentTree.concat(list))
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.ruleStatusStash = item.ruleStatus
        switch (item.ruleStatus) {
          case 0:
            item.showBtnCode = ['data-share-stop']
            item.ruleStatus = '正常'
            break
          case 1:
            item.showBtnCode = ['data-share-startup']
            item.ruleStatus = '停用'
            break
        }
      })
    },
    // 获取表格数据
    handleGetTableData (api, val, currentPage = 1) {
      let obj = this.handleSaveSearchValues(val, currentPage)
      val = (obj.val && JSON.parse(JSON.stringify(obj.val))) || val
      if (val && val.ruleStatus !== undefined) {
        val.status = val.ruleStatus
      }
      currentPage = obj.currentPage || currentPage
      this.getTableDataApi = api
      this.tableLoading = true
      let params = {
        currentPage: this.tablePages.current, PageSize: this.tablePages.pageSize
      }
      Object.assign(params, val)
      api(params).then(res => {
        if (res.code === '208999') {
          this.allData = res.resultMap.page.list
          this.tablePages.current = currentPage
          this.tablePages.total = res.resultMap.page.total
          this.tableData = JSON.parse(JSON.stringify(this.allData))
          if (!this.menuData || this.menuData.length === 0) {
            this.menuData = res.resultMap.menuRuls
            this.dialogItem[1].options = this.menuData.filter(item => item.menuName !== '全部规则').map(item => ({ label: item.menuName, value: item.menuCode }))
          }
          this.handleTableData && this.handleTableData(this.tableData || [])
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 改变状态和删除
    handleChangeOrEditData (row, type) {
      let status = ''
      if (type) {
        status = 2
      }
      if (row.ruleStatusStash === 0) {
        status = 1
      } else if (row.ruleStatusStash === 1) {
        status = 0
      }
      apiOperateDataRuleStatus({ id: row.id, status }).then(res => {
        if (res.code === '208999') {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.handleGetTableData(apiQueryDataRulePageList, this.searchValues)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .data-share{
    display: flex;
    article{
      .el-menu{
        width: 200px;
        min-width: 200px;
        margin-right: 12px;
        height: calc(100vh - 110px);
        .el-menu-item{
          padding: 0 15px;
          padding-left: 15px !important;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          &:first-child.is-disabled{
            height: 50px;
            line-height: 50px;
            color: #333 !important;
            opacity: 1;
          }
          &.is-active{
            background-color: #ecf5ff;
          }
        }
      }
    }
    section{
      flex: 1;
      width: calc(100% - 212px);
    }
  }
</style>
