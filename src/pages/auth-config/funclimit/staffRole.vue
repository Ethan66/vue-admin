<template>
  <div class="staff-role">
    <div class="box-left">
      <h2>角色分类</h2>
      <classify
        :classifyList="optionData"
        :total="roleCount"
        @classify="handleClassify"
        @role="handleRole"
        @roleClick="handleRoleClick"
      />
    </div>
    <div class="box-right">
      <search-module
        class="searchContent"
        :search-item="searchItem"
        :search-values="searchValues"
        :search-default-obj="defaultSearchObj"
        @handleSearch="handleSearch"
      />
      <table-module
        ref="table"
        :table-data="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
        :table-pages="tablePages"
        @handleSendHead="handleSendHead"
        @table-jump="handleJump">
        <div class="btn-content" slot="btn">
          <el-button @click="handleAddStaff">添加员工</el-button>
        </div>
        <div class="total-content" slot="total">
          <b>统计数据</b>
          <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
        </div>
      </table-module>
    </div>

    <!-- 添加编辑员工弹框 -->
    <staffDialog
      ref="staffDialog"
      :dialogTitle="staffDialogTitle"
      :formItem="staffDialogFormItem"
      :formData="staffDialogFormData"
      :dialogVisible.sync="staffDialogVisible"
      :dialogBtn="staffDialogBtn"
      :treeCheckedData="treeCheckedData"
      :treeList="treeList"
      :isEdit="staffDialogIsEdit"
    />
    <!-- 添加编辑角色分类弹框 -->
    <typeDialog
      ref="typeDialog"
      :dialogVisible.sync="typeDialogVisible"
      :formItem.sync="formItem"
      :formData="formData"
      :rules="typeDialogRules"
      :dialogTitle="typeDialogTitle"
      :dialogBtn="typeDialogBtn"
    />
  </div>
</template>

<script>
import { staffRole } from './mixins'
import methods from './methods'
import dialogConfig from './dialogConfig.js'
import basicMethod from '@/config/mixins'
import typeDialog from './typeDialog'
import classify from './components/classify'
import staffDialog from './components/staffDialog'
import { apiPageQueryUserRole } from '@/api/role'

export default {
  mixins: [basicMethod, staffRole, dialogConfig, methods],
  created () {
    this.handleApiGetConsoleRoleById()
    this.handleGetTableData(apiPageQueryUserRole)
    this.handleApiGetAllRoleRequestTree()
    this.handleApiQueryDepartmentTree()
  },
  computed: {
    optionData () {
      let cloneData = JSON.parse(JSON.stringify(this.classifyList)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id === child.resourceParentId) // 返回每一项的子级数组
        father.children = branchArr.length > 0 ? branchArr : '' // 给父级添加一个children属性，并赋值
        return father.resourceParentId === 0 // 返回第一层
      })
    }
  },
  data () {
    return {
      defaultSearchObj: { a: 1 },
      selectStaff: [],
      classifyList: [],
      staffDialogIsEdit: false,
      staffDialogVisible: false,
      staffDialogTitle: '添加员工',
      staffDialogFormData: {
        admin: [],
        marketing: []
      },
      roleCount: 0,
      treeData: [],
      staffDialogFormItem: [
        {
          label: '管理员角色',
          key: 'admin',
          options: [
            { label: '超级管理员', value: '1' },
            { label: '管理员', value: '2' }
          ]
        }, {
          label: '运营角色',
          key: 'marketing',
          options: [
            { label: '运营经理', value: '3' },
            { label: '用户运营', value: '4' }
          ]
        }
      ],
      staffDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleSubmit' }
      ],
      treeList: [{
        menuId: 1,
        menuName: '霖梓网络',
        childrenList: [{
          menuId: '1-1',
          menuName: '百凌事业部',
          childrenList: [{
            menuId: '1-1-1',
            menuName: '前端'
          }, {
            menuId: '1-1-2',
            menuName: '后端'
          }, {
            menuId: '1-1-3',
            menuName: '产品'
          }, {
            menuId: '1-1-4',
            menuName: '运营'
          }, {
            menuId: '1-1-5',
            menuName: '运维'
          }]
        }, {
          menuId: '1-2',
          menuName: '联通事业部',
          childrenList: [{
            menuId: '1-2-1',
            menuName: '前端'
          }, {
            menuId: '1-2-2',
            menuName: '后端'
          }, {
            menuId: '1-2-3',
            menuName: '测试'
          }, {
            menuId: '1-2-4',
            menuName: '产品'
          }, {
            menuId: '1-2-5',
            menuName: '运营'
          }, {
            menuId: '1-2-6',
            menuName: '运维'
          }]
        }]
      }, {
        menuId: 2,
        menuName: '霖扬网络',
        childrenList: [{
          menuId: '2-1',
          menuName: 'in有',
          childrenList: [{
            menuId: '2-1-1',
            menuName: '前端'
          }, {
            menuId: '2-1-2',
            menuName: '后端'
          }, {
            menuId: '2-1-3',
            menuName: '运维'
          }, {
            menuId: '2-1-4',
            menuName: '运营'
          }]
        }, {
          menuId: '2-2',
          menuName: '二级 2-2',
          childrenList: [{
            menuId: '2-2-1',
            menuName: '三级 2-2-1'
          }]
        }]
      }],
      treeCheckedData: []
    }
  },
  methods: {
    handleEditClass (item) {
      this.typeDialogTitle = '编辑类型'
      this.formItem = [
        { label: '分类名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'sortNo', type: 'input' },
        { label: '创建人', type: 'text', key: 'creater' },
        { label: '创建时间', type: 'text', key: 'gmtCreate' }
      ]
      this.isEdit = true
      this.formData = JSON.parse(JSON.stringify(item))
      this.typeDialogVisible = true
    },
    handleAddClass (id) {
      this.typeDialogTitle = '新建类型'
      this.formItem = [
        { label: '分类名称', key: 'name', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' }
      ]
      this.isEdit = false
      this.typeDialogVisible = true
    },
    handleDelClass (id) {
      this.$confirm('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiDelConsoleRole()
      })
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleClassify (type, item) {
      this.isRole = 0
      if (type === 'add') {
        this.handleAddClass(item)
      } else if (type === 'del') {
        this.handleDelClass(item)
      } else if (type === 'edit') {
        this.handleEditClass(item)
      }
    },
    handleEditRole (id) {
      this.typeDialogTitle = '编辑角色'
      this.formItem = [
        { label: '所属分类', key: 'classfy', type: 'input' },
        { label: '角色名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '创建人', type: 'text', content: '2019/04/26 15:23' },
        { label: '创建时间', type: 'text', content: '2019/04/26 15:23' }
      ]
      this.typeDialogVisible = true
    },
    handleAddRole (id) {
      this.typeDialogTitle = '新建角色'
      this.formItem = [
        { label: '所属分类',
          key: 'classfy',
          type: 'select',
          options: [
            { label: '分类1', value: 'a' },
            { label: '分类2', value: 'b' }
          ] },
        { label: '角色名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '复制角色权限',
          key: 'roleLimit',
          type: 'selectDouble',
          options: [
            {
              label: '热门尘世',
              options: [{
                label: '上海',
                value: 'shanghai'
              }]
            }, {
              label: '城市名',
              options: [{
                label: '成都',
                value: 'chengdu'
              }]
            }
          ] }
      ]
      this.typeDialogVisible = true
    },
    handleDelRole (id) {
      this.$confirm('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiDelConsoleRole()
      }).catch(() => {
      })
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleRole (type, item) {
      this.isRole = 1
      if (type === 'add') {
        this.handleAddRole(item)
      } else if (type === 'del') {
        this.handleDelRole(item)
      } else if (type === 'edit') {
        this.handleEditRole(item)
      }
    },
    /**
     * 单击角色，更新表格数据
     * type: role: 单击的角色； all: 单击的全部用户； 否则就是单击的分类
     * item: 
     */
    handleRoleClick (type, item) {
      if (type === 'role') {
        this.isRole = 1
      } else if (type === 'all') {
        this.isRole = ''
      } else {
        this.isRole = 0
      }
      this.handleGetTableData(apiPageQueryUserRole, { resourceType: this.isRole, roleId: item.id })
    },
    handleAddStaff () {
      this.staffDialogIsEdit = false
      this.staffDialogTitle = '添加员工'
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.staffDialogVisible = true
    },
    // 表格编辑按钮
    handleEditData (row) {
      this.staffDialogIsEdit = true
      this.staffDialogTitle = '编辑员工'
      this.editData = JSON.parse(JSON.stringify(row))
      this.staffDialogVisible = true
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiPageQueryUserRole, row.id, apiPageQueryUserRole)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? '有效' : '无效'
      })
    },
    handleSendHead (val) {
      console.log(val)
    },
    handleRefuse () {
      this.$refs.staffDialog.staffDialogVisible = false
    },
    handleSubmit () {
      this.$refs.staffDialog.staffDialogVisible = false
    },
    handleTypeDialogRefuse () {
      this.$refs.typeDialog.typeVisible = false
    },
    handleTypeDialogSubmit () {
      if (this.isEdit) {
        this.handleApiEditeConsoleRole()
      } else {
        this.handleApiCreateConsoleRole()
      }
      this.$refs.typeDialog.typeVisible = false
    }
  },
  components: {
    staffDialog,
    typeDialog,
    classify
  }
}
</script>

<style lang="less">
  .staff-role {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      h2 {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        padding: 20px 0 20px 15px;
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
    }
  }
</style>
