<template>
  <div class="substance menu-manage">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    ></search-module>
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :tree-expand-ids.sync="saveExpendIdList"
      :tree-parent-id="'menuParentId'"
    >
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd" v-if="$authBtn('menu-add-menu')">{{ $authBtn('menu-add-menu') }}</el-button>
        <!-- <el-button @click="$router.push({ path: '/main/develop-center/menu-manage/newpage' })">跳转页面</el-button> -->
        <el-button @click="handleBatchCreate('catalogue')" v-if="$authBtn('menu-add-catogue-all')">{{ $authBtn('menu-add-catogue-all') }}</el-button>
        <el-button @click="handleBatchCreate('menu')" v-if="$authBtn('menu-add-menu-all')">{{ $authBtn('menu-add-menu-all') }}</el-button>
        <el-button @click="handleBatchCreate('btn')" v-if="$authBtn('menu-add-btn-all')">{{ $authBtn('menu-add-btn-all') }}</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      doubleColumn
      :dialog-title="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :edit-data="editData"
      :dialog-item="dialogItem"
      :dialog-btn="dialogBtn"
      :rules="rules"
      :selectTreeWidth="244"
      :select-tree-checked-value="selectTreeCheckedValue"
      selectTreekey="menuParentId"
      @handleSelectTreeValue="handleSelectTreeValue"
      @handleClearSelectTree="handleClearSelectTree"
    />
    <dialog-detail
      title="详情"
      :showDetail.sync="showDetail"
      :dialogItem="dialogItem"
      :editData="editData"
    />
  </div>
</template>

<script>
import { menu } from '../mixin'
import basicMethod from '@/config/mixins'
import { menuRelation } from '@/config/utils'
import batchConfig from '@/config/menu'
import { apiModifyMenu, apiAddMenu, apiDeleteMenu } from '@/api/developCenter'
import { apiGetAllMenu } from '@/api/login'

export default {
  name: 'menu-manage',
  mixins: [basicMethod, menu],
  data () {
    return {
      showDetail: false,
      allParentMenu: [],
      selectTreeCheckedValue: [],
      saveExpendIdList: []
    }
  },
  watch: {
    showDialogForm (val) {
      if (!val) {
        this.dialogItem[1].type = 'selectTree'
        this.dialogItem[1].disabled = false
        this.dialogItem[3].disabled = false
      }
    }
  },
  created () {
    this.tablePages.pageSize = 10000
    this.handleGetTableData(apiGetAllMenu)
  },
  methods: {
    // 获取所有父菜单树
    handleGetAllParentTree () {
      this.selectTreeCheckedValue = []
      let filterArr = JSON.parse(JSON.stringify(this.allData.filter(item => item.menuLevel !== 3)))
      this.allParentMenu = this.dialogItem[1].dialogData = menuRelation(filterArr, 'id', 'menuParentId', 'menuLevel', 'sortNo')
    },
    // 点击新增按钮
    handleAdd () {
      this.dialogItem[0].show = false
      this.dialogItem[1].show = true
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.$set(this.editData, 'status', 1)
      this.handleClearSelectTree()
      this.handleGetAllParentTree()
      this.isEdit = 0
      this.dialogTitle = '新增菜单'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.dialogItem[0].show = false
      this.editData = JSON.parse(JSON.stringify(row))
      this.handleClearSelectTree()
      this.handleGetAllParentTree()
      this.selectTreeCheckedValue = [this.editData.menuParentId]
      this.editData.status = this.editData.statusStash
      this.editData.menuType = this.editData.menuTypeStash
      this.editData.menuLevel = this.editData.menuLevel[0]
      this.isEdit = 1
      this.dialogTitle = '编辑菜单'
      this.showDialogForm = true
    },
    // 新建平级菜单
    handleCreateLevelMenu (row) {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.$set(this.editData, 'status', 1)
      this.dialogItem[0].show = false
      this.dialogItem[1].type = 'input'
      this.dialogItem[1].disabled = true
      this.dialogItem[3].disabled = true
      this.editData.menuParentIdStash = row.menuParentId
      let obj = this.allData.find(item => item.id === row.menuParentId)
      obj && (this.editData.menuParentId = obj.menuName)
      this.editData.menuType = row.menuTypeStash
      this.editData.menuLevel = Number(row.menuLevel[0])
      this.isEdit = 0
      this.dialogTitle = '新建菜单'
      this.showDialogForm = true
    },
    // 新建下级菜单
    handleCreateNextLevelMenu (row) {
      if (Number(row.menuTypeStash) === 3) {
        this.$message.error('三级不能创建下级菜单')
        return false
      }
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.$set(this.editData, 'status', 1)
      this.dialogItem[0].show = false
      this.dialogItem[1].type = 'input'
      this.dialogItem[1].disabled = true
      this.dialogItem[3].disabled = true
      this.editData.menuParentIdStash = row.id
      this.editData.menuParentId = row.menuName
      this.editData.menuType = Number(row.menuTypeStash) + 1
      this.editData.menuLevel = Number(row.menuLevel[0])
      this.isEdit = 0
      this.dialogTitle = '新建菜单'
      this.showDialogForm = true
    },
    // 选择菜单树的值后
    handleSelectTreeValue (row) {
      if (!row) return false
      this.editData.menuType = Number(row.menuType) + 1
      let list = this.dialogItem[3].options.map(item => {
        if (item.value <= row.menuType) {
          item.disabled = true
        } else {
          item.disabled = false
        }
        return item
      })
      this.$set(this.dialogItem[3], 'options', list)
    },
    // 清空菜单树的值
    handleClearSelectTree () {
      let list = this.dialogItem[3].options.map(item => {
        item.disabled = false
        return item
      })
      this.$set(this.dialogItem[3], 'options', list)
    },
    // 点击表格改变状态
    handleChangeStatus (row) {
      let id = row.id
      let status = row.statusStash === 0 ? 1 : 0
      this.apiEditData(apiModifyMenu, { id, status }, apiGetAllMenu)
    },
    // 点击表格详情按钮
    handleShowDetailDialog (row) {
      this.showDetail = true
      this.dialogItem[0].show = true
      this.dialogItem[1].show = false
      this.editData = row
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteMenu, row.id, apiGetAllMenu)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      if (this.isEdit === 0) {
        if (this.editData.menuParentIdStash) {
          this.editData.menuParentId = this.editData.menuParentIdStash
        }
        this.editData.menuLevel = this.editData.menuType
        this.apiCreateData(apiAddMenu, this.$purifyParams(this.editData), apiGetAllMenu)
      } else {
        this.editData.menuLevel = this.editData.menuType
        this.apiEditData(apiModifyMenu, this.editData, apiGetAllMenu)
      }
    },
    // 处理表格数据
    handleTableData (tableData) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.showBtnCode = []
        if (item.menuTypeStash === undefined) {
          item.menuTypeStash = item.menuType
        }
        switch (item.menuType) {
          case 1:
            item.menuType = '目录'
            break
          case 2:
            item.menuType = '菜单'
            break
          case 3:
            item.menuType = '按钮'
            break
        }
        if (item.menuLevelStash === undefined) {
          item.menuLevelStash = item.menuLevel - 1
          item.menuLevel = `${item.menuLevel}级`
        }
        item.statusStash = item.status
        switch (item.status) {
          case 1:
            item.status = '显示'
            item.showBtnCode.push('menu-hide-menu')
            break
          case 0:
            item.status = '隐藏'
            item.showBtnCode.push('menu-show-menu')
            break
        }
      })
      this.tableData = menuRelation(tableData, 'id', 'menuParentId', 'menuLevelStash', 'sortNo')
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
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[2].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validateCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[4].placeholder))
      }
      if (value.length > 30) {
        return callback(new Error('输入内容不能超过30字'))
      }
      callback()
    },
    validateMenuUrl (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[5].placeholder))
      }
      if (value.length > 100) {
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
