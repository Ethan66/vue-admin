<template>
  <div class="data-share">
    <article>
      <el-menu
        text-color="#999"
        active-text-color="#4162DB"
        @select="handleSelectMenu"
      >
       <el-menu-item index="0" disabled>
          <span slot="title">菜单分类</span>
        </el-menu-item>
        <el-menu-item index="0">
          <span slot="title">全部规则</span>
        </el-menu-item>
        <el-menu-item
          v-for="(item, i) in menuData"
          :key="i"
          :index="String(item.id)"
        >
          <span slot="title">{{ item.menuName }}</span>
        </el-menu-item>
      </el-menu>
    </article>
    <section>
      <search-module
        :search-item="searchItem"
        :search-values="searchValues"
        @handleSearch="handleSearch"
      ></search-module>
      <table-module
        ref="table"
        :table-data="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
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
      selectTreekey="parentId"
      selectTreekey2="directorId"
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
export default {
  name: 'data-share',
  mixins: [dataShare, basicMethod],
  data () {
    return {
      allDepartmentTree: [],
      menuData: [],
      selectTreeCheckedValue: [],
      selectTreeCheckedValue2: []
    }
  },
  created () {
    this.handleGetTableData(apiListConsoleMenu)
    this.handleGetMenuData()
    this.handleGetAllStaff()
  },
  methods: {
    // 获取二级菜单
    handleGetMenuData () {
      apiListConsoleMenu({ currentPage: 1, pageSize: 10000 }).then(res => {
        if(res.code === '208999') {
          this.menuData = res.resultMap.page.list.filter(item => item.menuLevel === 2)
        } else {
          this.message.error(res.message)
        }
      })
    },
    // 选中菜单
    handleSelectMenu (index) {
      console.log(index)
    },
    // 新建规则
    handleAdd () {
      this.editData = JSON.parse(JSON.stringify(this.editData))
      this.showDialogForm = true
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
        this.editData.parentId = ''
      }
    },
    handleClearSelectTree2 (val) {
      if (!val) {
        this.editData.directorId = ''
      }
    },
    // 获取所有员工
    handleGetAllStaff () {
      return apiQueryDepartmentTree({ isWhole: true, hasStop: false }).then(res => {
        if (res.code === '208999') {
          this.allDepartmentTree = res.resultMap.data
          this.dialogItem[0].dialogData = menuRelation(JSON.parse(JSON.stringify(this.allDepartmentTree)), 'id', 'parentId', 'departmentLevel', 'sortNo')
          apiListConsoleUser({ pageSize: 0, currentPage: 0 }).then(res => {
            if (res.code === '208999') {
              let list = res.resultMap.page.list
              list.map(item => {
                item.parentId = item.departmentId
                item.departmentName = item.realName
                item.id = 'a' + item.id
              })
              this.dialogItem[4].dialogData = this.$disposeTreeData(this.allDepartmentTree.concat(list))
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
        item.showBtnCode = item.status === 0 ? ['data-share-stop'] : ['data-share-startup']
      })
    },
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
