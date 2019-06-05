<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="IP授权" name="first">
        <ipControl></ipControl>
      </el-tab-pane>
      <el-tab-pane label="账号授权" name="second">
        <accountControl></accountControl>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import accountControl from './account-control/index'
import ipControl from './ip-control/index'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
    //   console.log(tab, event)
    }
  },
  components: {
    accountControl,
    ipControl
  }
}
</script>
