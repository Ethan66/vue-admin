<template>
  <div class="role-auth">
    <div class="box-left">
      <h3>角色分类</h3>
      <el-tree
        :data="data"
        default-expand-all
        :highlight-current="true"
        @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="box-right"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          label: '管理员角色',
          children: [{
            label: '超级管理员',
            label: '管理员',
          }]
        },
        {
          label: '运营角色',
          children: [{
            label: '运营经理',
            label: '用户运营'
          }]
        }
      ]
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">
  .role-auth{
    display: flex;
    height: calc(100vh - 90px);
    margin-top: 15px;
    .box-left {
      width: 200px;
      height: 100%;
      min-width: 200px;
      background: #fff;
      margin-right: 10px;
    }
    .box-right {
      flex: 1;
      max-width: calc(100% - 200px);
    }
  }
</style>

