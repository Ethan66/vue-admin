<template>
  <div class="role-limit">
    <div class="menuList">
      <div class="menu" v-for="(item, i) in menuList" :key="i">
        <h3>{{ item.menu.menuName }}</h3>
        <div class="object list">
          <p class="title">对象级</p>
          <el-checkbox-group v-model="resultChecked[item.menu.menuId].objectPermission" :key="`object${i}`" @change="handleChangeObj(item.menu.menuId, item.operation)">
            <el-checkbox label="1">查看列表</el-checkbox>
            <el-checkbox label="2">查看详情</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="operation list">
          <div class="title">操作级</div>
          <el-checkbox-group v-model="resultChecked[item.menu.menuId].buttonIds" :key="`operation${i}`">
            <el-checkbox :label="child.btnId" :disabled="child.disabled" v-for="(child, i) in item.operation" :key="i">{{ child.btnName }}</el-checkbox>
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
                <el-radio-group v-model="tybeValueObj[item.id]" @change="handleCheckedTybeValueObj">
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
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
  </div>
</template>

<script>
import classify from '@/pages/auth-config/funclimit/components/classify'
import methods from './methods'
import typeDialog from './components/typeDialog'
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
  name: 'role-limit',
  components: { classify, typeDialog },
  mixins: [methods],
  data () {
    let checkSortNo = (rule, value, callback) => {
      let reg = /^[0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的数值'))
      } else {
        callback()
      }
    }
    return {
      typeDialogTitle: '编辑类型',
      formData: {
        cloneRoleIds: []
      },
      typeDialogRules: {
        resourceParentId: [
          { required: true, message: '请选择所属分类', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '请输入显示排序', trigger: 'blur' },
          { validator: checkSortNo, message: '请输入正确的数值', trigger: ['blur', 'change'] }
        ]
      },
      typeDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleTypeDialogRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleTypeDialogSubmit' }
      ],
      formItem: [],
      typeDialogVisible: false,
      isEdit: false,
      isClassify: 0, // 0：角色，1：角色分类
      classifyList: [], // 角色数据
      menuList: [], // 菜单列表
      resultChecked: {}, // 传给后端的结果
      showTybeDialog: false,
      allSet: '', // 字段全选设置
      nowTybeList: [], // 选中的字段列表
      nowMenuId: '', // 选中字段的时候当前的menuId
      tybeValueObj: {}, // 保存字段选项的对象
      rules: {}, // 规则
      roleCount: 0,
      temp: {
        roleId: '1',
        permissionList: [
          { menuId: '', objectIdList: [], buttonIdList: [] }
        ]
      },
      confirmContent: '',
      confrimDiaShow: false,
      confirmFn: '',
      delId: ''
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
    roleClick (type, item) {
      this.handleClickRole(type, item)
    },
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
    handleDelClass (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该分类吗？删除后该分类下所有角色将自动归到未分类角色中。', 'handleApiDelConsoleRole')
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
        { label: '复制角色权限', key: 'cloneRoleIds', type: 'selectDouble', options: [] }
      ])
      this.handleGetClassify()
      this.handleApiGetAllRoleRequestTree()
      this.typeDialogVisible = true
    },
    // 删除角色
    handleDelRole (row) {
      this.delId = row.id
      this.handleConfirmInfo('确认删除该角色？删除角色后，本角色下员工所具有的权限会受到影响。', 'handleApiDelConsoleRole')
    },
    // 选中角色
    handleClickRole (type, item) {
      if (!type) {
        return
      }
      if (type === 'classify') {
        this.isClassify = 0
        return
      } else if (type === 'all') {
        return
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
            let btnDisabled = false
            obj.menu = { menuName: item.menuName, menuId: item.menuId }
            if (Number(item.objectPermission.slice(0, 1)) === 0) {
              btnDisabled = true
            }
            obj.operation = item.buttonPermissionList.sort((v1, v2) => (v1.sortNo - v2.sortNo)).map(child => {
              return {
                btnName: child.buttonName,
                btnId: child.buttonId,
                check: child.check,
                disabled: btnDisabled
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
              obj.objectPermission.push('1')
            } else if (item.objectPermission === '01') {
              obj.objectPermission.push('2')
            }
          }
          item.operation && item.operation.forEach(btn => {
            btn.check && obj.buttonIds.push(btn.btnId)
          })
          this.$set(this.resultChecked, [item.menu.menuId], obj)
        })
      }
    },
    handleChangeObj (id, operation) {
      let result = this.resultChecked[id].objectPermission
      if (result.join('') === '2') {
        this.$message.error('授权查看详情请先点击查看列表')
        result.pop()
      }
      if (result.includes('1')) {
        operation.forEach(item => {
          item.disabled = false
        })
      } else {
        operation.forEach(item => {
          item.disabled = true
        })
        this.resultChecked[id].buttonIds = []
      }
    },
    // 点击设置字段权限按钮
    handleSetTybe (menuId) {
      if (this.resultChecked[menuId].objectPermission.length === 0 || !this.resultChecked[menuId].objectPermission.includes('1')) {
        this.$message.error('请选择查看列表再操作')
        return false
      }
      apiGetRolePermissionFields({ roleId: this.roleId, menuId }).then(res => {
        if (res.code === '208999') {
          let tybeList = []
          tybeList = res.resultMap.data.fieldPermissionList.filter(item => item.setStatus === 1)
          this.nowTybeList = tybeList
          this.nowMenuId = menuId
          tybeList.forEach(item => {
            let value = '000'
            item.authority && (value = item.authority)
            item.idStr = String(item.id)
            this.$set(this.tybeValueObj, item.id, value)
            if (item.fieldRequired) {
              this.$set(this.rules, item.idStr, [{ required: true, validator: this.validateFn, message: `请选择${item.fieldName}` }])
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
      for (let key in this.tybeValueObj) {
        this.tybeValueObj[key] = this.allSet
      }
    },
    // 勾选字段
    handleCheckedTybeValueObj () {
      let length = Object.keys(this.tybeValueObj).length
      let obj = { '100': 0, '010': 0, '001': 0 }
      Object.keys(this.tybeValueObj).forEach(key => {
        obj[this.tybeValueObj[key]]++
      })
      let result = false
      for(let key in obj) {
        if (obj[key] === length) {
          this.allSet = key
          result = true
        }
      }
      !result && (this.allSet = '000')
    },
    // 校验必填字段
    validateFn (rule, value, callback) {
      if (value === '000') {
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
              this.$message({
                type: 'success',
                message: res.message
              })
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 保存角色权限
    handleSaveRoleResource () {
      let permissionList = Object.keys(this.resultChecked).filter(menuId => this.resultChecked[menuId].objectPermission.length > 0).map(menuId => {
        let objectPermission = ''
        let objectStr = this.resultChecked[menuId].objectPermission.join('')
        if (objectStr === '1') {
          objectPermission = '10'
        } else if (objectStr === '2') {
          objectPermission = '01'
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
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleConfirmInfo (txt, fnName) {
      this.confirmContent = txt
      this.confirmFn = fnName
      this.confrimDiaShow = true
    },
    clickRole (item) {
      this.handleClickRole('rl.e', item)
    }
  }
}
</script>

<style lang="less">
  .role-limit {
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
    .menuList{
      padding: 0 10px 20px 20px;
      .menu:first-child{
        h3{
          padding-top: 0;
        }
      }
      h3{
        padding: 15px 0;
        margin-bottom: 24px;
        border-bottom: 1px solid #e8e8e8;
        color: #333;
        font-size: 16px;
      }
      .list{
        display: flex;
        margin-bottom: 15px;
        .title{
          min-width: 42px;
          margin: 0;
          margin-right: 50px;
          font-size: 14px;
        }
      }
    }
    .el-dialog{
      width: 520px;
      .el-dialog__header{
        padding: 13px 15px;
        border-bottom: 1px solid #e8e8e8;
      }
      .el-button--default{
        color: #888;
        border: 1px solid #e8e8e8;
      }
      .el-dialog__title{
        font-size: 16px;
        font-weight: bold;
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
