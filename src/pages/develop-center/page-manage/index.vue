<template>
  <div class="catalog">
    <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    />
    <table-module
      ref="table"
      :table-data.sync="tableData"
      :table-item="tableItem"
      :table-btn="tableBtn"
      :table-pages="tablePages"
      @table-jump="handleJump"
      >
      <div class="btn-content" slot="btn">
        <el-button @click="handleAdd" v-if="$showBtn('page-add-page')">{{$getBtnName('page-add-page')}}</el-button>
        <el-button @click="handleGetMenuList" v-if="$showBtn('page-get-menu')">{{ $getBtnName('page-get-menu') }}</el-button>
        <el-button @click="handleBatchCreate('page')" v-if="$showBtn('page-add-page-all')">{{ $getBtnName('page-add-page-all') }}</el-button>
        <el-button @click="handleGetPageList" v-if="$showBtn('page-get-page-all')">{{ $getBtnName('page-get-page-all') }}</el-button>
        <el-button @click="handleBatchCreate('tybe')" v-if="$showBtn('page-add-tybe-all')">{{ $getBtnName('page-add-tybe-all') }}</el-button>
      </div>
    </table-module>
    <dialog-module
      ref="dialog"
      :dialogTitle="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :editData="editData"
      :dialogItem="dialogItem"
      :dialogBtn="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { pageManage } from '@/createData/develop-center'
import basicMethod from '@/config/mixins'
import configTybe from '@/configureData/pageKey'
import { apiQueryPageList, apiAddPage, apiUpdatePage, apiListConsoleMenu, apiAddBatchPageField, apiQueryParentConsoleMenu } from '@/api/developCenter'

export default {
  name: 'page-manage',
  mixins: [basicMethod, pageManage],
  data () {
    return {
      batchMenuList: [],
      batchPageList: []
    }
  },
  created () {
    this.handleGetTableData(apiQueryPageList)
    this.handleGetPageListData()
  },
  methods: {
    // 获取菜单下拉列表
    handleGetPageListData () {
      apiQueryParentConsoleMenu({menuLevel: 2}).then((res) => {
        if (res.code === '208999') {
          res.resultMap.data.forEach(item => {
            item['label'] = item.menuName
            item['value'] = item.code
          })
          this.searchItem[0].options = res.resultMap.data
          console.log(this.searchItem)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.dialogItem[5].show = false
      this.dialogItem[6].show = false
      this.dialogItem[7].show = true
      this.isEdit = 0
      this.dialogTitle = '新增页面'
      this.showDialogForm = true
    },
    // 页面名称字段点击事件
    handleGoTybe (row) {
      this.$router.push({
        path: '/develop-center/page-manage/tybemanage',
        query: {
          menuCode: row.menuCode,
          pageCode: row.pageCode
        }
      })
    },
    // 编辑按钮事件
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.editData.pageStatus = this.editData.pageStatusStash
      this.dialogItem[5].show = true
      this.dialogItem[6].show = true
       this.dialogItem[7].show = false
      this.isEdit = 1
      this.dialogTitle = '编辑页面'
      this.showDialogForm = true
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiAddPage, this.editData, apiQueryPageList)
      } else {
        this.apiEditData(apiUpdatePage, this.editData, apiQueryPageList)
      }
    },
    // 处理表格数据
    handleTableData (tableData, index) {
      if (tableData.length === 0) {
        this.tableData = []
        return
      }
      tableData.forEach(item => {
        item.pageStatusStash = item.pageStatus
        switch (item.pageStatus) {
          case 0:
            item.pageStatus = '正常'
            break
          case 1:
            item.pageStatus = '停用'
            break
        }
      })
    },
    // 获取所有menuCode
    handleGetMenuList () {
      apiListConsoleMenu({ currentPage: 1, pageSize: 10000 }).then(res => {
        if (res.code === '208999') {
          this.batchMenuList = res.resultMap.page.list.map(item => ({ menuName: item.menuName, code: item.code }))
          this.$getSuccessMsg(this, res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取所有pageCode
    handleGetPageList () {
      apiQueryPageList({ currentPage: 1, pageSize: 10000 }).then(res => {
        if (res.code === '208999') {
          this.batchPageList = res.resultMap.page.list.map(item => ({ pageCode: item.pageCode, menuCode: item.menuCode }))
          this.$getSuccessMsg(this, res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 批量新建
    handleBatchCreate (type) {
      if (type === 'page') {
        if (this.batchMenuList.length === 0) {
          this.$message.error('请先点击获取menuList')
          return
        }
        let error = false
        const list = configTybe[type].map(item => {
          let obj = this.batchMenuList.find(menu => menu.menuName === item.menuName)
          if (obj) {
            item.menuCode = obj.code
            if (!item.pageName) {
              item.pageName = item.menuName
            }
            delete item.menuName
          } else {
            error = true
          }
          return item
        })
        if (error) {
          this.$message.error('没有此菜单，请先新建')
          return
        }
        this.batchError = false
        list.forEach(item => {
          apiAddPage(item).then(res => {
            if (res.code === '208999') {
              this.$getSuccessMsg(this, res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        })
      }
      if (type === 'tybe') {
        const list = configTybe[type].map((item, i) => {
          item.fieldSort = i + 1
          let obj = this.batchPageList.find(child => child.pageCode === item.pageCode)
          if (obj.constructor === Object) {
            item.menuCode = obj.menuCode
          }
          return item
        })
        apiAddBatchPageField({ list }).then(res => {
          if (res.code === '208999') {
            this.$getSuccessMsg(this, res.message)
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    validatePageName (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[0].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validatePageCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[1].placeholder))
      }
      if (value.length > 20) {
        return callback(new Error('输入内容不能超过20字'))
      }
      callback()
    },
    validatePageUrl (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error(this.dialogItem[2].placeholder))
      }
      if (value.length > 100) {
        return callback(new Error('输入内容不能超过100字'))
      }
      callback()
    },
  }
}
</script>
