<template>
  <div class="funclimit">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="noMargin">
      <el-tab-pane label="员工角色分配" name="first">
        <div class="display-box">
          <div class="box-left">
            <h2>角色分类</h2>
            <classify
              ref="classify"
              type="staffRole"
              :classifyList="classifyList"
              :total="roleCount"
              @classify="handleClassify"
              @role="handleRole"
              @roleClick="handleRoleClick"
            />
          </div>
          <div class="box-right">
            <staffRole ref="staffRole" @getClassifyList="getClassifyList" @handleReStatus="handleReStatus"></staffRole>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色权限分配" name="second">
        <div class="display-box">
          <div class="box-left">
            <h2>角色分类</h2>
            <classify
              ref="classify"
              type="roleLimit"
              :classifyList="classifyList"
              :total="roleCount"
              @classify="handleClassify"
              @role="handleRole"
              @roleClick="handleRoleClick"
            />
          </div>
          <div class="box-right overflow">
            <roleLimit ref="roleLimit"></roleLimit>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加编辑角色分类弹框 -->
    <typeDialog
      ref="typeDialog"
      :dialogVisible.sync="typeDialogVisible"
      :formItem="formItem"
      :formData="formData"
      :rules="typeDialogRules"
      :dialogTitle="typeDialogTitle"
      :dialogBtn="typeDialogBtn"
    />
  </div>
</template>

<script>
import staffRole from './staffRole'
import roleLimit from './roleLimit'
import classify from './components/classify'
import classifyMethods from './classifyMethods'
import typeDialog from './components/typeDialog'
import basicMethod from '@/config/mixins'
export default {
  mixins: [classifyMethods, basicMethod],
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
      activeName: 'first',
      classifyList: [],
      roleCount: 0,
      isClassify: 0, // 0：角色，1：角色分类
      formItem: [],
      typeDialogVisible: false,
      typeDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleTypeDialogRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleTypeDialogSubmit' }
      ],
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
      delId: '',
      globleItem: [
        { label: '所属分类', key: 'resourceParentId', type: 'select', options: [] },
        { label: '分类名称', key: 'roleName', type: 'input' },
        { label: '显示排序', key: 'sortNo', type: 'input' },
        { label: '创建人', key: 'createrName', type: 'text' },
        { label: '更新时间', key: 'gmtModified', type: 'text' },
        { label: '复制角色权限', key: 'cloneRoleIds', type: 'selectDouble', options: [] }
      ],
      flag: true
    }
  },
  created () {
    this.getClassifyList()
  },
  methods: {
    handleClick (tab, event) {
      if (this.activeName === 'second') {
        let index = 0
        let obj = this.classifyList.find((item, i) => {
          if (item.childIdList && item.childIdList[0]) {
            index = i
            return true
          }
        })
        document.querySelector(`#pane-second .classify .role`).classList.add('active')
        this.$refs.roleLimit.clickRole(obj.childIdList[0])
      }
    },
    handleReStatus () {
      this.$refs.classify.handleReStatus()
    }
  },
  components: {
    staffRole,
    roleLimit,
    classify,
    typeDialog
  }
}
</script>

<style lang="less">
.funclimit {
  .el-form-item__label{
    font-weight: normal;
  }
  .noMargin{
    margin-top: -15px;
  }
  .tableModule {
    margin-top: 0;
  }
  .display-box {
    display: flex;
    .box-left {
      width: 200px;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
      height: calc(100vh - 130px);
      h2 {
        font-family: PingFangSC-Semibold;
        font-size: 16px;
        color: #333333;
        line-height: 16px;
        padding: 20px 0 20px 15px;
      }
    }
    .box-left {
      overflow: auto;
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2px;
          background: #ccc
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
      }
    }
    .box-right {
      &.overflow{
        overflow: scroll;
      }
      flex: 1;
      overflow: auto;
      background: #fff;
      max-width: calc(100% - 210px);
      height: calc(100vh - 130px);
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2px;
          background: #ccc;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
      }
      p.cm-btn-color{
        margin: 0;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
