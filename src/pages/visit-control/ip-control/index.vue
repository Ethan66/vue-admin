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
      <div class="btn-content" slot="btn">
        <span v-if="chooseDataArr.length > 0">已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
        <el-button @click="handleAdd" v-if="chooseDataArr.length < 1">添加IP</el-button>
        <el-button @click="handleAdd" v-if="chooseDataArr.length > 0">启 用</el-button>
        <el-button @click="handleAdd" v-if="chooseDataArr.length > 0">停 用</el-button>
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
    <!-- <tree-select :data="dataTree"
                 :defaultProps="defaultProps" multiple
                 :nodeKey="nodeKey" :checkedKeys="defaultCheckedKeys"
                 @popoverHide="popoverHide"></tree-select> -->
  </div>
</template>

<script>
import { ipControl } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
// import treeSelect from '@/components/tree-select'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'

export default {
  mixins: [basicMethod, ipControl],
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  // components: { treeSelect },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      // defaultProps: {
      //   children: 'childrenList',
      //   label: 'menuName'
      // },
      // nodeKey: 'menuId',
      // defaultCheckedKeys: [],
      // dataTree: [{
        //   menuId: 1,
        //   menuName: '霖梓网络',
        //   childrenList: [{
        //     menuId: '1-1',
        //     menuName: '百凌事业部',
        //     childrenList: [{
        //       menuId: '1-1-1',
        //       menuName: '前端'
        //     },{
        //       menuId: '1-1-2',
        //       menuName: '后端'
        //     },{
        //       menuId: '1-1-3',
        //       menuName: '产品'
        //     },{
        //       menuId: '1-1-4',
        //       menuName: '运营'
        //     },{
        //       menuId: '1-1-5',
        //       menuName: '运维'
        //     }]
        //   },{
        //     menuId: '1-2',
        //     menuName: '联通事业部',
        //     childrenList: [{
        //       menuId: '1-2-1',
        //       menuName: '前端'
        //     },{
        //       menuId: '1-2-2',
        //       menuName: '后端'
        //     },{
        //       menuId: '1-2-3',
        //       menuName: '测试'
        //     },{
        //       menuId: '1-2-4',
        //       menuName: '产品'
        //     },{
        //       menuId: '1-2-5',
        //       menuName: '运营'
        //     },{
        //       menuId: '1-2-6',
        //       menuName: '运维'
        //     }]
        //   }]
        // }, {
        //   menuId: 2,
        //   menuName: '霖扬网络',
        //   childrenList: [{
        //     menuId: '2-1',
        //     menuName: 'in有',
        //     childrenList: [{
        //       menuId: '2-1-1',
        //       menuName: '前端'
        //     },{
        //       menuId: '2-1-2',
        //       menuName: '后端'
        //     },{
        //       menuId: '2-1-3',
        //       menuName: '运维'
        //     },{
        //       menuId: '2-1-4',
        //       menuName: '运营'
        //     }]
        //   }, {
        //     menuId: '2-2',
        //     menuName: '二级 2-2',
        //     childrenList: [{
        //       menuId: '2-2-1',
        //       menuName: '三级 2-2-1'
        //     }]
        //   }]
        // }] 
    }
  },
  methods: {
    popoverHide (checkedIds, checkedData) {
      console.log(checkedIds);
      console.log(checkedData);
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.dialogTitle = '新增按钮'
      this.showDialogForm = true
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.dialogTitle = '编辑按钮'
      this.showDialogForm = true
    },
    // 点击表格启用
    handleOpen (row) {
      this.apiDeleteData(apiDeleteSysButton, row.id, apiListSysButton)
    },
    // 点击表格停用按钮
    handleStop (val) {
      console.log(val)
    },
    // 点击对话框确认按钮
    handleSubmit () {
      this.$refs.dialog.showDialogForm1 = false
      if (this.isEdit === 0) {
        this.apiCreateData(apiCreateSysButton, this.editData, apiListSysButton)
      } else {
        this.apiEditData(apiEditeSysButton, this.editData, apiListSysButton)
      }
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? this.tableBtn[1].show = false : this.tableBtn[2].show = false
      })
    }
  }
}
</script>
