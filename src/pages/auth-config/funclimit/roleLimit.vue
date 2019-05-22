<template>
  <div class="role-limit">
    <div class="box-left">
      <h2>角色分类</h2>
      <classify
        :classifyList="classifyList"
        @classify="handleClickClassifyIcon"
        @role="handleClickRoleIcon"
        @roleClick="handleClickRole"
      />
    </div>
    <div class="box-right">
      <div class="menuList">
        <div class="menu" v-for="(item, i) in menuList" :key="i">
          <h3>{{ item.menu.menuName }}</h3>
          <div class="object list">
            <p class="title">对象级</p>
            <el-checkbox-group v-model="resultChecked[item.menu.menuId].objectPermission" :key="`object${i}`">
              <el-checkbox label="1">查看列表</el-checkbox>
              <el-checkbox label="2">查看详情</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="operation list">
            <div class="title">操作级</div>
            <el-checkbox-group v-model="resultChecked[item.menu.menuId].buttonIds" :key="`operation${i}`">
              <el-checkbox :label="child.btnId" v-for="(child, i) in item.operation" :key="i">{{ child.btnName }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="tybe list">
            <div class="title">字段级</div>
            <p class="cm-btn-color" @click="handleSetTybe(item.menu.menuId)">设置字段权限</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleSaveRoleResource">保存</el-button>
      </div>
    </div>
    <el-dialog title="设置字段权限" :visible.sync="showTybeDialog">
      <div class="tybeList">
        <p class="tip">说明: 如果角色对当前对象设置了 "新建" 或 "编辑" 权限，带*号的必填字段默认设置为“读写”，不可设置为“只读”或“不可见”，否则会造成新建/编辑不成功</p>
        <div class="list">
          <div class="top">
            <p class="title">全选</p>
            <el-radio-group v-model="allSet" @change="handleSetAll">
              <el-radio label="100">读写</el-radio>
              <el-radio label="010">只读</el-radio>
              <el-radio label="001">不可见</el-radio>
            </el-radio-group>
          </div>
          <el-form :model="tybeValueObj" :rules="rules" ref="form" label-width="110px" label-position="left">
            <template v-for="(item, index) in nowTybeList">
              <el-form-item :label="item.fieldName" :prop="item.idStr" :key="index">
                <el-radio-group v-model="tybeValueObj[item.id]">
                  <el-radio label="100">读写</el-radio>
                  <el-radio label="010">只读</el-radio>
                  <el-radio label="001">不可见</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
          </el-form>
          <div class="footer">
            <el-button type="primary" @click="handleSaveTybe">确定</el-button>
            <el-button @click="showTybeDialog= false">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
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
import classify from '@/pages/auth-config/funclimit/components/classify'
import methods from './methods'
import dialogConfig from './dialogConfig'
import typeDialog from './typeDialog'
import { apiGetAllPermissionResource, apiSetRolePermissionResource, apiGetRolePermissionFields, apiSetRolePermissionFields } from '@/api/role'

const initFormItem = [
  { label: '分类名称', key: 'roleName', type: 'input' },
  { label: '显示排序', key: 'sortNo', type: 'input' },
  { label: '创建人', type: 'text', key: 'creater' },
  { label: '创建时间', type: 'text', key: 'gmtCreate' }
]

const initRoleFormItem = [
  { label: '所属分类', key: 'resourceParentId', type: 'select', options: [] },
  { label: '角色名称', key: 'roleName', type: 'input' },
  { label: '显示排序', key: 'sortNo', type: 'input' }
]

export default {
  components: { classify, typeDialog },
  mixins: [methods, dialogConfig],
  data () {
    return {
      classifyList: [], // 角色数据
      menuList: [], // 菜单列表
      resultChecked: {}, // 传给后端的结果
      showTybeDialog: false,
      allSet: '', // 字段全选设置
      nowTybeList: [], // 选中的字段列表
      nowMenuId: '', // 选中字段的时候当前的menuId
      tybeValueObj: {}, // 保存字段选项的对象
      rules: {}, // 规则
      temp: {
        roleId: '1',
        permissionList: [
          { menuId: '', objectIdList: [], buttonIdList: [] }
        ]
      }
    }
  },
  watch: {
    menuList (val) {
      this.handleInitResultChecked(val)
    },
    showTybeDialog (val) {
      if (!val) {
        this.rules = {}
        this.tybeValueObj = {}
        this.nowTybeList = []
      }
    }
  },
  created () {
    this.handleApiGetAllRoleRequestTree()
  },
  methods: {
    // 点击角色分类图标
    handleClickClassifyIcon (type, item) {
      this.isClassify = 1
      if (type === 'add') {
        this.handleAddClass(item)
      } else if (type === 'del') {
        this.handleDelClass(item)
      } else if (type === 'edit') {
        this.handleEditClass(item)
      }
    },
    // 点击角色图标
    handleClickRoleIcon (type, item) {
      this.isClassify = 0
      if (type === 'add') {
        this.handleAddRole(item)
      } else if (type === 'del') {
        this.handleDelRole(item)
      } else if (type === 'edit') {
        this.handleEditRole(item)
      }
    },
    // 编辑角色分类
    handleEditClass (item) {
      this.typeDialogTitle = '编辑类型'
      this.formItem = initFormItem
      this.isEdit = true
      this.formData = JSON.parse(JSON.stringify(item))
      this.typeDialogVisible = true
    },
    // 新增角色分类
    handleAddClass (row) {
      this.typeDialogTitle = '新建类型'
      this.formItem = initFormItem.slice(0, 2)
      this.isEdit = false
      this.typeDialogVisible = true
    },
    // 删除角色分类
    handleDelClass (row) {
      this.$confirm('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiDelConsoleRole(row.id)
      })
    },
    // 编辑角色
    handleEditRole (row) {
      this.typeDialogTitle = '编辑角色'
      this.isEdit = true
      this.formItem = initRoleFormItem.concat([
        { label: '创建人', type: 'text', key: 'creater' },
        { label: '创建时间', type: 'text', key: 'gmtCreate' }
      ])
      this.formData = JSON.parse(JSON.stringify(row))
      this.handleGetClassify()
      this.typeDialogVisible = true
    },
    // 新增角色
    handleAddRole (row) {
      this.typeDialogTitle = '新建角色'
      this.isEdit = false
      this.formItem = initRoleFormItem.concat([
        { label: '复制角色权限', key: 'roleLimit', type: 'selectDouble', options: [] }
      ])
      this.handleGetClassify()
      this.handleApiGetAllRoleRequestTree()
      this.typeDialogVisible = true
    },
    // 删除角色
    handleDelRole (row) {
      this.$confirm('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.handleApiDelConsoleRole(row.id)
      })
    },
    // 选中角色
    handleClickRole (type, item) {
      if (type === 'classify') {
        this.isClassify = 0
      } else if (type === 'all') {
        this.isClassify = ''
      } else {
        this.isClassify = 1
      }
      this.roleId = item.id
      this.handleGetRoleResource(item.id)
    },
    // 编辑角色对话框取消按钮
    handleTypeDialogRefuse () {
      this.$refs.typeDialog.typeVisible = false
    },
    // 编辑角色对话框确定按钮
    handleTypeDialogSubmit () {
      if (this.isEdit) {
        this.handleApiEditeConsoleRole()
      } else {
        this.handleApiCreateConsoleRole()
      }
      this.$refs.typeDialog.typeVisible = false
    },
    // 获取角色所有资源
    handleGetRoleResource (roleId) {
      apiGetAllPermissionResource({ roleId }).then(res => {
        if (res.code === '208999') {
          this.menuList = res.resultMap.data.list.map(item => {
            let obj = {}
            obj.menu = { menuName: item.menuName, menuId: item.menuId }
            obj.operation = item.buttonPermissionList.map(child => {
              return {
                btnName: child.buttonName,
                btnId: child.buttonId,
                check: child.check
              }
            })
            obj.objectPermission = item.objectPermission
            return obj
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 结构结果对象
    handleInitResultChecked (menuList) {
      if (menuList.length) {
        menuList.forEach((item) => {
          let obj = { objectPermission: [], buttonIds: [] }
          if (item.objectPermission) {
            if (item.objectPermission === '11') {
              obj.objectPermission.push('1', '2')
            } else if (item.objectPermission === '10') {
              obj.objectPermission.push('2')
            } else if (item.objectPermission === '01') {
              obj.objectPermission.push('1')
            }
          }
          item.operation && item.operation.forEach(btn => {
            btn.check && obj.buttonIds.push(btn.btnId)
          })
          this.$set(this.resultChecked, [item.menu.menuId], obj)
        })
      }
    },
    // 点击设置字段权限按钮
    handleSetTybe (menuId) {
      apiGetRolePermissionFields({ roleId: this.roleId, menuId }).then(res => {
        if (res.code === '208999') {
          let tybeList = []
          tybeList = res.resultMap.data.fieldPermissionList
          this.nowTybeList = tybeList
          this.nowMenuId = menuId
          tybeList.forEach(item => {
            let value = '000'
            item.authority && (value = item.authority)
            item.idStr = String(item.id)
            this.$set(this.tybeValueObj, item.id, value)
            if (item.fieldRequired) {
              this.$set(this.rules, item.id, [{ required: true, validator: this.validateFn,  message: `请选择${item.tybeName}` }])
            }
          })
          this.showTybeDialog = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 全选字段改变时
    handleSetAll () {
       for(let key in this.tybeValueObj) {
        this.tybeValueObj[key] = this.allSet
      }
    },
    // 校验必填字段
    validateFn (rule, value, callback) {
      if (value === '') {
        this.$message.error(rule.message)
      } else {
        callback()
      }
    },
    // 点击设置字段权限的保存
    handleSaveTybe () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let permissionFiledList = Object.keys(this.tybeValueObj).map(key => {
            return {
              id: key,
              authority: this.tybeValueObj[key]
            }
          })
          apiSetRolePermissionFields({
            menuId: this.nowMenuId,
            roleId: this.roleId,
            permissionFiledList
          }).then(res => {
            if (res.code === '208999') {
              this.showTybeDialog = false
              this.$getSuccessMsg(this, res.message)
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 保存角色权限
    handleSaveRoleResource () {
      let permissionList = Object.keys(this.resultChecked).map(menuId => {
        let objectPermission = ''
        let objectStr = this.resultChecked[menuId].objectPermission.join('')
        if (objectStr === '1') {
          objectPermission = '01'
        } else if (objectStr === '2') {
          objectPermission = '10'
        } else if (objectStr === '12' || objectStr === '21') {
          objectPermission = '11'
        }
        return {
          menuId,
          objectPermission,
          buttonIdList: this.resultChecked[menuId].buttonIds
        }
      })
      apiSetRolePermissionResource({
        roleId: this.roleId,
        permissionList
      }).then(res => {
        if (res.code === '208999') {
          this.$getSuccessMsg(this, res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .role-limit {
    display: flex;
    p{
      margin: 0;
    }
    .footer{
      display: flex;
      align-items: center;
      border-top: 1px solid #e8e8e8;
      padding: 0 20px;
      height: 80px;
      button{
        vertical-align: middle;
        padding: 0 28px;
        height: 40px;
        line-height: 40px;
      }
      .el-button+.el-button{
        margin-left: 15px;
      }
    }
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
      h3 {
        background: rgba(65, 98, 219, .05);
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #4162DB;
        line-height: 40px;
        padding-left: 15px;
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
      height: calc(100vh - 144px);
      background: #fff;
      p.cm-btn-color{
        margin: 0;
        font-size: 14px;
      }
      .menuList{
        padding: 0 10px 20px 20px;
        h3{
          padding: 15px 0;
          margin-bottom: 24px;
          border-bottom: 1px solid #e8e8e8;
          color: #333;
          font-weight: normal;
          font-size: 16px;
        }
        .list{
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .title{
            margin: 0;
            padding-right: 50px;
            font-size: 14px;
          }
        }
      }
    }
    .el-dialog{
      width: 520px;
      .el-dialog__header{
        padding: 13px 15px;
        border-bottom: 1px solid #e8e8e8;
      }
      .el-dialog__body{
        padding: 15px 30px 0;
        .el-radio + .el-radio{
          margin-left: 61px;
        }
      }
      .el-form-item{
        margin: 20px 0 30px 0;
      }
      .el-form-item__label{
        line-height: 16px;
        font-weight: normal;
        color: #333;
      }
      .el-form-item__content{
        line-height: 0;
      }
      .footer{
        height: 70px;
        margin: 0 -30px;
        flex-direction: row-reverse;
        button{
          height: 30px;
          padding: 0 16px;
          line-height: 30px;
          &:first-child{
            margin-left: 10px;
          }
        }
      }
      .tybeList{
        .tip{
          margin-bottom: 30px;
          font-size: 12px;
          line-height: 17px;
          color: #9B9B9B;
        }
        .top{
          display: flex;
          align-items: center;
          padding-bottom: 21px;
          border-bottom: 1px solid #e8e8e8;
          .title{
            width: 110px;
            color: #333;
          }
        }
      }
    }
  }
</style>
