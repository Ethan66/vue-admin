<template>
  <div class="staff-admin">
    <div class="box-left">
      <div class="tree-box">
        <h2>组织架构</h2>
        <el-tree
          :data="data"
          :highlight-current="true"
          @node-click="handleNodeClick"></el-tree>
      </div>
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
        :table-data="tableData"
        :table-item="tableItem"
        :table-btn="tableBtn"
        :table-pages="tablePages"
        @handleSendHead="handleSendHead"
        @table-jump="handleJump">
        <div class="btn-content" slot="btn">
          <el-button @click="handleAdd">新建员工</el-button>
        </div>
      </table-module>
    </div>

    <!-- 员工信息 -->
    <el-dialog
      title="员工信息"
      :visible.sync="staffInfoVisible"
      width="30%"
      :before-close="handleStaffInfoClose">
      <div class="staffInfo-content">
        <div class="user-info">
          <div class="info-title">孙华杰</div>
          <div class="info-content">
            <div>状态：<span>禁止登录</span></div>
            <div>创建时间：<span>2019/4/26 10:17</span></div>
            <div>创建人：<span>admin</span></div>
            <div>上次登录时间：<span>2019/4/26 10:17</span></div>
          </div>
        </div>
        <div class="account-info">
          <div class="info-title">账号信息</div>
          <div class="info-content">
            <div>昵称：<span>cosplay</span></div>
            <div>姓名：<span>123</span></div>
            <div>手机号：<span>18605817222</span></div>
            <div>邮箱：<span>sunhuajie@ldxinyong.com</span></div>
          </div>
        </div>
        <div class="job-info">
          <div class="info-title">职位信息</div>
          <div class="info-content">
            <div>部门：<span>杭州霖梓网络科技有限公司</span></div>
            <div>职位：<span>产品经理</span></div>
            <div>汇报对象：<span>-</span></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleStaffInfoClose">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 添加编辑员工 -->
    <el-dialog
      :title="staffDialogTitle"
      :visible.sync="addStaffVisible"
      width="810px"
      :before-close="handleAddStaffVisibleClose">
      <div class="form-box">
        <el-form ref="form" :model="staffForm" label-position="top" :rules="staffFormRules">
          <div class="form-title">账号信息</div>
          <div class="form-flex-box">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称">
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="staffForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-title">职位信息</div>
          <div class="form-flex-box">
            <el-form-item label="部门">
              <tree-select
                :data="dialogData"
                :defaultProps="defaultProps"
                nodeKey="menuId" :checkedKeys="defaultCheckedKeys"
                @popoverHide="popoverHide"/>
            </el-form-item>
            <el-form-item label="职位" prop="name">
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
            <el-form-item label="汇报对象">
              <el-input v-model="staffForm.name"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStaffVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStaffVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { staff } from './mixins'
import basicMethod from '@/config/mixins'
import treeSelect from '@/components/tree-select'
import { apiDeleteSysButton, apiEditeSysButton, apiListSysButton, apiCreateSysButton } from '@/api/authority'
export default {
  mixins: [basicMethod, staff],
  data () {
    return {
      defaultSearchObj: { a: 1 },
      data: [
        {
          label: '霖梓网络',
          children: [{
            label: '百凌事业部',
            children: [{
              label: '产品'
            }, {
              label: '机构合作'
            }, {
              label: '测试'
            }]
          }]
        }
      ],
      staffDialogTitle: '添加员工',
      staffInfoVisible: false,
      addStaffVisible: false,
      staffForm: {},
      staffFormRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 20, // 初始ID（可选）
      props: { // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children'
        // disabled:true
      },
      list:[
        {id:1, parentId:0, name:"一级菜单A",rank:1},
        {id:2, parentId:0,name:"一级菜单B",rank:1},
        {id:3, parentId:0,name:"一级菜单C",rank:1},
        {id:4, parentId:1,name:"二级菜单A-A",rank:2},
        {id:5, parentId:1,name:"二级菜单A-B",rank:2},
        {id:6, parentId:2,name:"二级菜单B-A",rank:2},
        {id:7, parentId:4,name:"三级菜单A-A-A",rank:3}
      ],
      dialogData: [{
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
      defaultProps: {
        children: 'childrenList',
        label: 'menuName'
      },
      defaultCheckedKeys: []
    }
  },
  created () {
    this.handleGetTableData(apiListSysButton)
  },
  computed: {
    /* 转树形数据 */
    optionData () {
      let cloneData = JSON.parse(JSON.stringify(this.list)) // 对源数据深度克隆
      return cloneData.filter(father => { // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id === child.parentId) // 返回每一项的子级数组
        father.children = branchArr.length > 0 ? branchArr : '' // 给父级添加一个children属性，并赋值
        return father.parentId === 0 // 返回第一层
      })
    }
  },
  methods: {
    popoverHide (checkedIds, checkedData) {
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleSendHead (val) {
      console.log(val)
    },
    // 处理表格数据
    handleTableData (tableData) {
      tableData.forEach(item => {
        item.isDelete = item.isDelete === '0' ? '有效' : '无效'
      })
    },
    // 点击表格删除按钮
    handleDeleteData (row) {
      this.apiDeleteData(apiDeleteSysButton, row.id, apiListSysButton)
    },
    // 点击表格编辑按钮
    handleEditData (row) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.isEdit = 1
      this.staffDialogTitle = '编辑员工'
      this.addStaffVisible = true
    },
    // 点击新增按钮
    handleAdd () {
      this.editData = this.$initEditData(this.dialogItem) // 初始化编辑数据
      this.isEdit = 0
      this.staffDialogTitle = '添加员工'
      this.addStaffVisible = true
    },
    // 停用账号
    handleStop () {
      this.$confirm('确定停用该员工账号吗？停用后该员工将无法登录后台管理系统。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 启用账号
    handleStart () {
      this.$confirm('确定启用该员工账号吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 禁止登录
    handleForbidLogin () {
      this.$confirm('确定禁止该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 允许登录
    handleAllowLogin () {
      this.$confirm('确定允许该员工账号登录吗？', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 重置密码
    handleResetPassword () {
      this.$confirm('确定重置该员工账号密码吗？新密码将以短信发送。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {

      }).catch(() => {

      })
    },
    // 关闭员工信息弹框
    handleStaffInfoClose () {
      this.staffInfoVisible = false
    },
    handleAddStaffVisibleClose () {
      this.addStaffVisible = false
    },
    getValue (value) {
      this.valueId = value
      console.log(this.valueId)
    }
  },
  components: {
    treeSelect
  }
}
</script>

<style lang="less">
  .staff-admin {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      .tree-box {
        background: #fff;
        h2 {
          font-family: PingFangSC-Semibold;
          font-size: 16px;
          color: #333333;
          line-height: 16px;
          padding: 20px 0 20px 15px;
        }
        .el-tree {
          .el-tree-node {
            .el-tree-node__content {
              height: 30px;
              .el-icon-caret-right {
                color: #B2B2B2;
              }
              .el-tree-node__label {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
              }
            }
          }
          .is-current {
            >.el-tree-node__content{
              background: rgba(66, 99, 219, 0.095);
              .el-icon-caret-right {
                color: #4162DB;
              }
              .el-tree-node__label {
                color: #4162DB;
              }
            }
          }
        }
      }
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 210px);
    }
    .el-dialog{
      min-width: 700px;
      border-radius: 4px;
      .el-dialog__header{
        padding: 15px 15px 10px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 28px 30px 0;
        .el-form{
          min-width: 570px;
          .el-form-item{
            margin-bottom: 30px;
          }
        }
        .el-form-item__label {
          width: 100px;
          line-height: 30px;
          font-weight: normal;
          color: #1c1c1c;
        }
        .el-form-item__content {
          margin-left: 100px;
          line-height: 30px;
          .el-input__inner{
            height: 30px;
            border-color: #e8e8e8;
            line-height: 30px;
          }
          .el-input__icon{
            line-height: 30px;
          }
        }
      }
       .el-dialog__footer{
        height: 60px;
        padding: 14px 15px;
        border-top: 1px solid #e8e8e8;
        .el-button{
          width: 60px;
          height: 32px;
          padding: 0;
          line-height: 32px;
        }
      }
    }
    .staffInfo-content {
      .user-info, .account-info, .job-info {
        padding-bottom: 50px;
        .info-title {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          letter-spacing: 0;
          padding-bottom: 15px;
        }
        .info-content {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
          letter-spacing: -0.43px;
          line-height: 20px;
          display: flex;
          flex-wrap: wrap;
          div{
            width: 50%;
            span {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #666666;
              letter-spacing: -0.43px;
              line-height: 20px;
            }
          }
          div:nth-of-type(1) {
            padding-bottom: 20px;
          }
        }
      }
    }
    .form-box {
      .form-title {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        padding-bottom: 10px;
      }
      .form-flex-box {
        display: flex;
        flex-wrap: wrap;
        .el-form-item {
          width: 230px;
          margin-right: 30px;
          margin-bottom: 20px;
          .el-form-item__label {
            padding-bottom: 5px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: -0.43px;
            line-height: 14px;
          }
          .el-form-item__label::before {
            color: #F41824;
          }
          .el-form-item__content {
            margin-left: 0;
            .el-select {
              width: 100%;
            }
          }
        }
        .el-form-item:nth-of-type(3n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
