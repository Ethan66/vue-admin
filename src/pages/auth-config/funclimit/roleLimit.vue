<template>
  <div class="role-limit">
    <div class="box-left">
      <h2>角色分类</h2>
      <h3>全部用户(60)</h3>
      <classify
        :classifyList="optionData"
        @classify="handleClassify"
        @role="handleRole"
        @roleClick="handleRoleClick"
      />
    </div>
    <div class="box-right">
      <div class="menuList">
        <div class="menu" v-for="(item, i) in menuList" :key="i">
          <h3>{{ item.menu.menuName }}</h3>
          <div class="object list">
            <p class="title">对象级</p>
            <el-checkbox-group v-model="result[item.menu.menuId].objectIds" :key="`object${i}`">
              <el-checkbox label="1">查看列表</el-checkbox>
              <el-checkbox label="2">查看详情</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="operation list">
            <div class="title">操作级</div>
            <el-checkbox-group v-model="result[item.menu.menuId].buttonIds" :key="`operation${i}`">
              <el-checkbox :label="child.btnId" v-for="(child, i) in item.operation" :key="i">{{ child.btnName }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="tybe list">
            <div class="title">字段级</div>
            <p class="cm-btn-color" @click="handleSetTybe(item.tybe, item.menu.menuId)">设置字段权限</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>
    <el-dialog title="设置字段权限" :visible.sync="showTybeDialog">
      <div class="tybeList">
        <p class="tip">说明: 如果角色对当前对象设置了 "新建" 或 "编辑" 权限，带*号的必填字段默认设置为“读写”，不可设置为“只读”或“不可见”，否则会造成新建/编辑不成功</p>
        <div class="list">
          <div class="top">
            <p class="title">全选</p>
            <el-radio-group v-model="allSet" @change="handleSetAll">
              <el-radio label="1">读写</el-radio>
              <el-radio label="2">只读</el-radio>
              <el-radio label="3">不可见</el-radio>
            </el-radio-group>
          </div>
          <el-form :model="tybeValueObj" :rules="rules" ref="form" label-width="110px" label-position="left">
            <template v-for="(item, index) in nowTybeList">
              <el-form-item :label="item.tybeName" :prop="item.tybeId" :key="index">
                <el-radio-group v-model="tybeValueObj[item.tybeId]">
                  <el-radio label="1">读写</el-radio>
                  <el-radio label="2">只读</el-radio>
                  <el-radio label="3">不可见</el-radio>
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
  </div>
</template>

<script>
import classify from '@/pages/auth-config/funclimit/components/classify'

export default {
  components: { classify },
  created () {
    this.handleInitResultObj(this.menuList)
  },
  data () {
    return {
      result: {}, // 传给后端的结果
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
      },
      menuList: [
        {
          menu: { menuName: '人员管理', menuId: '1' },
          operation: [{ btnName: '停用', btnId: '1' }, { btnName: '启用', btnId: '2' }, { btnName: '重置密码', btnId: '3' }],
          tybe: [{ tybeName: '姓名', type: '', tybeId: 'name', default: 1 }, { tybeName: '手机号', type: '', tybeId: 'phone', default: 1 }, { tybeName: '邮箱', type: '', tybeId: 'address', default: 0 }]
        },
        {
          menu: { menuName: '组织架构管理', menuId: '2' },
          operation: [{ btnName: '更多', btnId: '5' }, { btnName: '编辑', btnId: '6' }],
          tybe: [{ tybeName: '姓名', type: '1', tybeId: 'name', default: 1 }, { tybeName: '手机号', type: '2', tybeId: 'phone', default: 1 }, { tybeName: '邮箱', type: '1', tybeId: 'address', default: 0 }]
        }
      ],
      classifyList: [
      {
        'check': false,
        'creater': 0,
        'gmtCreate': '2019-05-13 19:52:10',
        'gmtModified': null,
        'id': 1,
        'isDelete': '0',
        'modifier': 0,
        'resourceParentId': 0,
        'resourceType': 1,
        'roleCode': 'RO001',
        'roleName': '管理员角色',
        'roleType': 1,
        'sortNo': 1,
        'userCount': 0
      },
      {
        'check': false,
        'creater': 0,
        'gmtCreate': '2019-05-15 14:20:27',
        'gmtModified': '2019-05-15 14:22:01',
        'id': 11,
        'isDelete': '0',
        'modifier': 0,
        'resourceParentId': 0,
        'resourceType': 1,
        'roleCode': 'RO002',
        'roleName': '未分类角色',
        'roleType': 0,
        'sortNo': 2,
        'userCount': 0
      },
      {
        'check': false,
        'creater': 40,
        'gmtCreate': '2019-05-15 19:39:00',
        'gmtModified': null,
        'id': 13,
        'isDelete': '0',
        'modifier': 0,
        'resourceParentId': 14,
        'resourceType': 0,
        'roleCode': 'RO20190515073900112dD',
        'roleName': '测试角色1',
        'roleType': 2,
        'sortNo': 3,
        'userCount': 0
      },
      {
        'check': false,
        'creater': 40,
        'gmtCreate': '2019-05-15 19:42:46',
        'gmtModified': '2019-05-15 19:48:15',
        'id': 14,
        'isDelete': '0',
        'modifier': 40,
        'resourceParentId': 0,
        'resourceType': 1,
        'roleCode': 'RO201905150742460721I',
        'roleName': '测试角色2019',
        'roleType': 2,
        'sortNo': 4,
        'userCount': 0
      }
    ]
    }
  },
  watch: {
    menuList (val) {
      this.handleInitResultObj(val)
    },
    showTybeDialog (val) {
      if (!val) {
        this.rules = {}
        this.tybeValueObj = {}
        this.nowTybeList = []
      }
    }
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
  methods: {
    // 结构结果对象
    handleInitResultObj (val) {
      if (val.length) {
        val.forEach((item) => {
          this.$set(this.result, [item.menu.menuId], { objectIds: [], buttonIds: [], tybeList: [] })
        })
      }
    },
    // 点击设置字段权限按钮
    handleSetTybe (tybeList, menuId) {
      this.nowTybeList = tybeList
      this.nowMenuId = menuId
      tybeList.forEach(item => {
        this.$set(this.tybeValueObj, item.tybeId, item.type)
        if (item.default) {
          this.$set(this.rules, item.tybeId, [{ required: true, validator: this.validateFn,  message: `请选择${item.tybeName}` }])
        }
      })
      this.showTybeDialog = true
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
          this.result[this.nowMenuId].tybeList = this.tybeValueObj
          this.showTybeDialog = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleClassify (type, item) {
      console.log(type, item)
    },
    /**
     * type: 点击icon的类型
     * item: 当前项数据
     */
    handleRole (type, item) {
      console.log(type, item)
    },
    // 单击角色，更新表格数据
    handleRoleClick (type, item) {
      console.log(type, item)
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
