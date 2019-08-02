<template>
  <div class="role-manage">
    <div class="menu">
      <h5>角色分类</h5>
      <el-tree
        :data="menuData"
        node-key="id"
        default-expand-all
        highlight-current
        :expand-on-click-node="false">
        <span slot-scope="{ node, data }">
          <span class="title" @click="handleChooseRole(data)">{{ node.label }}</span>
          <span class="icon" v-if="typeof data.id === 'number'">
            <i class="el-icon-view" v-if="data.status === 1" title="正常"></i>
            <i class="el-icon-circle-plus-outline" @click="handleAddRole(node, data)"></i>
            <i class="el-icon-edit-outline" @click="handleEditRole(node, data)"></i>
            <i class="el-icon-delete" @click="handleDeleteRole(node, data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
    <div class="operate">
      <ul>
        <li
            v-for="(item, i) in operateList"
            :key="i">
          <h5>{{ item.title }}</h5>
          <div class="content">
            <h6>对象级</h6>
            <el-checkbox-group v-model="checkedObj[item.menuId].menuList">
              <el-checkbox
                          v-for="(child, index) in item.objectList"
                          :key="index"
                          :label="child.value"
                          >{{ child.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="content">
            <h6>操作级</h6>
            <el-checkbox-group v-model="checkedObj[item.menuId].btnList">
              <el-checkbox
                          v-for="(child, index) in item.btnList"
                          :key="index"
                          :label="child.value"
                          >{{ child.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </li>
      </ul>
      <div class="btn">
        <el-button
                  size="small"
                  type="primary"
                  @click="handleModifyAuth"
                  >确定</el-button>
      </div>
    </div>
    <dialog-module
      ref="dialog"
      :dialog-title="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :edit-data="editData"
      :dialog-item="dialogItem"
      :dialog-btn="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { apiAddRole, apiGetRole, apiModifyRole, apiDeleteRole, apiGetUser, apiGetRoleAuthority, apiModifyRoleAuthority } from '@/api/authority'
import { menuRelation } from '@/config/utils'
import { roleAuth } from '../mixins'

export default {
  name: 'role-auth',
  mixins: [roleAuth],
  data () {
      return {
        menuData: [],
        checkedRoleId: '',
        checkedObj: {},
        userOptionsList: [],
        operateList: [
          // { menuId: 1, title: '人员管理', objectList: [{ label: '查看列表', value: '1' }], btnList: [{ label: '启用', value: '1' }, { label: '停用', value: '0' }] },
          // { menuId: 2, title: '人员管理2', objectList: [{ label: '查看列表2', value: '1' }], btnList: [{ label: '启用2', value: '1' }, { label: '停用2', value: '0' }] }
        ]
      }
    },
    created () {
      this.handleGetData()
    },

    methods: {
      handleGetData () {
        this.userOptionsList = []
        Promise.all([apiGetRole(), apiGetUser()]).then( arr => {
          if (arr[0].code === '000000' && arr[1].code === '000000') {
            arr[0].data.list.forEach(item => {
              item.id = item.roleId
              item.label = item.roleName
            })
            const userList = arr[1].data.list.map(item => {
              let { id, userId, roleId, account: label, roleId: parentRoleId } = item
              this.userOptionsList.push({ label, value: String(userId) })
              id = `userId${userId}`
              return { id, roleId, label, parentRoleId }
            })
            this.dialogItem[1].options = this.userOptionsList
            let data = arr[0].data.list.concat(userList)
            this.menuData = menuRelation(data, 'id', 'parentRoleId', 'level', '', 'children')
          } else {
            this.$message.error('请求接口失败')
          }
        })
      },
      // 选择角色展示所授权限
      handleChooseRole (data) {
        this.checkedRoleId = data.roleId
        apiGetRoleAuthority({ roleId: data.roleId }).then(res => {
          if (res.code === '000000') {
            let data = res.data
            let tempBtnObj = {}
            data.btnList.forEach(item => {
              let obj = { label: item.menuName, value: item.menuId }
              if (tempBtnObj[item.menuParentId]) {
                tempBtnObj[item.menuParentId].push(obj)
              } else {
                tempBtnObj[item.menuParentId] = [obj]
              }
            })
            this.operateList = data.menuList.map(item => {
              item.title = item.menuName
              item.btnList = tempBtnObj[item.menuId]
              item.objectList = [{ label: '查看列表', value: item.menuId }]
              return item
            })
            let checkedObj = {}
            data.authBtnList.forEach(item => {
              if (checkedObj[item.menuParentId]) {
                if (checkedObj[item.menuParentId].btnList) {
                  checkedObj[item.menuParentId].btnList.push(item.menuId)
                } else {
                  checkedObj[item.menuParentId].btnList = item.menuId
                }
              } else {
                checkedObj[item.menuParentId] = { btnList: [item.menuId] }
              }
            })
            data.authObjectList.forEach(id => {
              if (checkedObj[id]) {
                if (checkedObj[id].menuList) {
                  checkedObj[id].menuList.push(id)
                } else {
                  checkedObj[id].menuList = [id]
                }
              } else {
                checkedObj[id] = { menuList: [id] }
              }
            })
            this.checkedObj = checkedObj
            this.operateList.forEach(item => {
              if (!this.checkedObj[item.menuId]) {
                this.$set(this.checkedObj, item.menuId, { menuList: [], btnList: [] })
              } else {
                let obj = this.checkedObj[item.menuId]
                if (!obj.menuList) {
                  obj.menuList = []
                }
                if (!obj.btnList) {
                  obj.btnList = []
                }
                this.$set(this.checkedObj, item.menuId, JSON.parse(JSON.stringify(obj)))
              }
            })
          }
        })
      },
      // 点击新增角色按钮
      handleAddRole (node, data) {
        this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
        this.editData.status = 1
        this.isEdit = 0
        this.dialogTitle = '新增角色'
        this.showDialogForm = true
      },
      // 点击修改角色按钮
      handleEditRole (node, data) {
        data.userIdList = data.children.map(item => Number(item.id.replace(/[^\d]/g, ''))).toString()
        this.editData = JSON.parse(JSON.stringify(data))
        this.dialogTitle = '编辑角色'
        this.isEdit = 1
        this.showDialogForm = true
      },
      // 点击删除角色按钮
      handleDeleteRole (node, data) {
        this.$confirm('确认删除', '温馨提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            callback: action => {
              if (action === 'confirm') {
                apiDeleteRole({ id: data.id }).then(res => {
                  if (res.code === '000000') {
                    this.$message({
                      type: 'success',
                      message: res.msg
                    })
                    this.handleGetData()
                  } else {
                    this.$message.error(res.msg)
                  }
                })
              }
            }
          })
      },
      // 对话框点击确定
      handleSubmit () {
        let params = Object.assign({}, this.editData)
        params.userIdList = params.userIdList.map(item => Number(item))
        const api = this.isEdit === 0 ? apiAddRole : apiModifyRole
        api(this.$purifyParams(params)).then(res => {
          if (res.code === '000000') {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$refs.dialog.showDialogForm1 = false
            this.handleGetData()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      // 修改权限
      handleModifyAuth () {
        let menuIdList = [], btnIdList = [], checkedObj = this.checkedObj
        for(let key in checkedObj) {
          checkedObj[key].menuList && menuIdList.push(...checkedObj[key].menuList)
          checkedObj[key].btnList && btnIdList.push(...checkedObj[key].btnList)
        }
        apiModifyRoleAuthority({ roleId: this.checkedRoleId, menuIdList, btnIdList }).then(res => {
          if (res.code === '000000') {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  };
</script>

<style lang="less">
  .role-manage{
    .menu{
      width: 200px;
      height: calc(100vh - 70px);
      float: left;
      background: #fff;
      font-size: 13px;
      color: #333;
      h5{
        padding: 20px 15px 15px;
        font-weight: bold;
        color: #333;
        font-size: 16px;
      }
      .el-tree-node__content{
        height: 40px;
        line-height: 40px;
      }
      .el-icon-edit-outline, .el-icon-delete, .el-icon-view, .el-icon-circle-plus-outline{
        margin-left: 6px;
        font-size: 13px;
        color: #999;
      }
      .el-tree-node__children{
        color: #999;
        .el-tree-node__content{
          height: 20px;
          line-height: 20px;
        }
        .icon{
          display: none;
        }
      }
    }
    .operate{
      margin-left: 210px;
      padding: 20px;
      height: calc(100vh - 70px);
      overflow-y: scroll;
      background: #fff;
      ul{
        li{
          h5{
            padding: 0 0 15px 0;
            border-bottom: 1px solid #E8E8E8;
            margin-bottom: 24px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
          .content{
            display: flex;
            width: 100%;
            h6{
              margin-right: 50px;
              margin-bottom: 24px;
              font-size: 14px;
            }
            .el-checkbox-group{
              flex: 1;
            }
            .el-checkbox + .el-checkbox{
              margin-bottom: 24px;
            }
            .el-checkbox:first-child{
              margin-bottom: 24px;
            }
          }
        }
      }
    }
  }
</style>
