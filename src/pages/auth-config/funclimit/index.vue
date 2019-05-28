<template>
  <div class="funclimit">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工角色分配" name="first">
        <div class="display-box">
          <div class="box-left">
            <h2>角色分类</h2>
            <classify
              ref="classify"
              :classifyList="classifyList"
              :total="roleCount"
              @classify="handleClassify"
              @role="handleRole"
              @roleClick="handleRoleClick"
            />
          </div>
          <div class="box-right">
            <staffRole ref="staffRole"></staffRole>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色权限分配" name="second">
        <div class="display-box">
          <div class="box-left">
            <h2>角色分类</h2>
            <classify
              ref="classify"
              :classifyList="classifyList"
              :total="roleCount"
              @classify="handleClassify"
              @role="handleRole"
              @roleClick="handleRoleClick"
            />
          </div>
          <div class="box-right">
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
    <dialog-confirm
      :confirmContent="confirmContent" :showDialogForm.sync="confrimDiaShow" :confirmFn="confirmFn"/>
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
      confirmContent: '',
      confrimDiaShow: false,
      confirmFn: '',
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
        this.$refs.roleLimit.clickRole(this.classifyList[0])
      }
    },
    handleConfirmInfo (txt, fnName) {
      this.confirmContent = txt
      this.confirmFn = fnName
      this.confrimDiaShow = true
    },
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
  .display-box {
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
      padding: 15px 0;
      flex: 1;
      max-width: calc(100% - 210px);
      height: calc(100vh - 144px);
      overflow-y: scroll;
      background: #fff;
      &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 2px;
          background: rgba(0,0,0,0.5);
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          border-radius: 0;
          background: transparent;
      }
      .el-checkbox-group{
        margin-left: -30px;
      }
      .el-checkbox{
        margin-left: 30px;
        margin-top: 5px;
        margin-bottom: 5px;
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
