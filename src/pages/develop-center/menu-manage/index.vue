<template>
  <div class="substance menu-manage">
    <search-module
      :items="searchItem"
      v-model="searchValues"
      @search="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :data="tableData"
      :items="tableItem"
    >
      <div class="btn-content" slot="header-btn">
        <el-button @click="handleAdd" v-btn="'menu-add-menu'">{{ $getBtnName('menu-add-menu') }}</el-button>
        <!-- <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button> -->
        <el-button @click="handleBatchCreate('catalogue')" v-btn="'menu-add-catogue-all'">{{ $getBtnName('menu-add-catogue-all') }}</el-button>
        <el-button @click="handleBatchCreate('menu')" v-btn="'menu-add-menu-all'">{{ $getBtnName('menu-add-menu-all') }}</el-button>
        <el-button @click="handleBatchCreate('btn')" v-btn="'menu-add-btn-all'">{{ $getBtnName('menu-add-btn-all') }}</el-button>
      </div>
      <template slot="tree" slot-scope="scope">
        <cell-tree
          :scope="scope"
          :item="tableItem[0]"
          :tableData.sync="tableData"
          :treeExpandIds.sync="saveExpendIdList"
          treeParentId="menuParentId"
        >
        </cell-tree>
      </template>
      <template slot="btn" slot-scope="scope">
        <table-btn
          :row="scope.row"
          :btns="tableBtn"
        />
      </template>
    </table-module>
    <dialog-module
      ref="dialog"
      :title="dialogTitle"
      :showDialog.sync="showDialogForm"
      :data="editData"
      :items="dialogItem"
      :btns="dialogBtn"
      :rules="rules"
    >
      <select-tree
        slot="tree"
        v-model="editData.menuParentId"
        clearable
        :data="allParentMenu"
        :defaultChecked="checkedKeys"
        :defaultProps="{ children: 'list', label: 'menuName' }"
        nodeKey="id"
      />
    </dialog-module>
  </div>
</template>

<script>
import { menu } from '../mixin'
import basicMethod from '@/config/mixins'
import batchConfig from '@/config/menu'
import { apiModifyMenu, apiAddMenu, apiDeleteMenu } from '@/api/developCenter'
import { apiGetAllMenu } from '@/api/login'
import { cellTree, adminMethods, selectTree } from 'vue-admin-ui-lib' // 表格树
import tableBtn from '@/components/tableBtn' // 按钮模块

export default {
  name: 'menu-manage',
  mixins: [basicMethod, menu],
  components: { cellTree, tableBtn, selectTree },
  data () {
    return {
      tableBtn: [],
      showDetail: false,
      allParentMenu: [],
      checkedKeys: [],
      saveExpendIdList: [],
      menuTypes: [{ label: '目录', value: 1 }, { label: '菜单', value: 2 }, { label: '按钮', value: 3 }],
      statusList: [{ label: '显示', value: 1 }, { label: '隐藏', value: 0 }]
    }
  },
  created () {
    this.dialogItem[2].options = this.menuTypes
    this.dialogItem[7].options = this.statusList
    this.searchItem[1].options = this.statusList
    this.tablePages.pageSize = 10000
    this.handleGetTableData(apiGetAllMenu)
  },
  methods: {
    // 获取所有父菜单树
    handleGetAllParentTree () {
      this.checkedKeys = []
      let filterArr = JSON.parse(JSON.stringify(this.allData.filter(item => item.menuLevel !== 3)))
      this.allParentMenu = adminMethods.menuRelation(filterArr, 'id', 'menuParentId', 'menuLevel', 'sortNo')
    },
    // 点击新增按钮
    handleAdd () {
      this.$set(this.editData, 'status', 1)
      this.handleGetAllParentTree()
      this.isEdit = 0
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.handleGetAllParentTree()
      this.checkedKeys = [this.editData.menuParentId]
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteMenu, row.id, apiGetAllMenu)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      console.log(111, this.editData)
      // if (this.isEdit === 0) {
      //   this.editData.menuLevel = this.editData.menuType
      //   this.apiCreateData(apiAddMenu, this.$purifyParams(this.editData), apiGetAllMenu)
      // } else {
      //   this.editData.menuLevel = this.editData.menuType
      //   this.apiEditData(apiModifyMenu, this.editData, apiGetAllMenu)
      // }
    },
    // 处理表格数据
    handleTableData (tableData) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      this.tableData = adminMethods.menuRelation(tableData, 'id', 'menuParentId', 'menuLevel', 'sortNo')
      function fn (data) {
        data.forEach(item => {
          if (item.list && item.list.length > 0) {
            item.hasLower = true
            fn(item.list)
          }
        })
      }
      fn(this.tableData)
      if (this.saveExpendIdList.length > 0) {
        this.handleOpenTree(this.tableData, this.saveExpendIdList)
      }
    },
    // 批量新建
    handleBatchCreate (type) {
      const typeObj = { catalogue: 1, menu: 2, btn: 3 }
      let data = batchConfig[type]
      let i = 0
      let menuParentList = {}
      const createMenuFn = () => {
        new Promise((resolve, reject) => {
          if (data.length < i + 1) {
            reject()
            return
          }
          let item = data[i]
          type !== 'catalogue' && (item.menuParentId = menuParentList[item.menuParentName])
          item.status = 1
          item.menuType = typeObj[type]
          item.menuLevel = typeObj[type]
          this.apiCreateData(apiAddMenu, item).then(createMenuFn)
          i++
          resolve(data)
        }).catch(() => {
          this.handleGetTableData(apiGetAllMenu)
        })
      }
      if (type === 'catalogue') {
        createMenuFn()
      } else {
        data.forEach(item => {
          if (!menuParentList[item.menuParentName]) {
            menuParentList[item.menuParentName] = ''
          }
        })
        Object.keys(menuParentList).forEach(name => {
          menuParentList[name] = this.allData.find(item => item.menuName === name).id
        })
        createMenuFn()
      }
    },
    validateMenuName (rule, value, callback) {
      if (value && !value.trim()) {
        return callback(new Error(this.dialogItem[2].placeholder))
      }
      if (value && value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validateCode (rule, value, callback) {
      if (value && !value.trim()) {
        return callback(new Error(this.dialogItem[4].placeholder))
      }
      if (value && value.length > 30) {
        return callback(new Error('输入内容不能超过30字'))
      }
      callback()
    },
    validateMenuUrl (rule, value, callback) {
      if (value && !value.trim()) {
        return callback(new Error(this.dialogItem[5].placeholder))
      }
      if (value && value.length > 100) {
        return callback(new Error('输入内容不能超过100字'))
      }
      callback()
    },
    validateSortNo (rule, value, callback) {
      if (value < 0 || !Number(value)) {
        return callback(new Error('输入内容必须为正整数'))
      }
      callback()
    }
  }
}
</script>

<style lang="less">
  .menu-manage{
    .el-textarea{
      height: 84px;
    }
  }
</style>
