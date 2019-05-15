<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="员工角色分配" name="first">
        <staffRole></staffRole>
      </el-tab-pane>
      <el-tab-pane label="角色权限分配" name="second">
        <roleLimit></roleLimit>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import staffRole from './staffRole'
import roleLimit from './roleLimit'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    staffRole,
    roleLimit
  }
}
</script>

<style>

</style>
