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
      
    </div>
  </div>
</template>

<script>
import classify from '@/pages/auth-config/funclimit/components/classify'

export default {
  components: { classify },
  data () {
    return {
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
    }
  }
</style>
