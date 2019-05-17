<template>
  <div class="classify">
    <template v-for="item in classifyList">
      <div class="title" :key=item.id @click="handleRoleClick(item, 'classify')">
        {{item.roleName}}({{item.userCount}})
        <span class="showIcon">
          <i class="el-icon-edit-outline" @click="handleClass(item, 'edit')"></i>
          <i class="el-icon-circle-plus-outline" @click="handleClass(item, 'add')"></i>
          <i class="el-icon-delete" @click="handleClass(item, 'del')"></i>
        </span>
      </div>
      <div class="role" @click="handleRoleClick(item, 'role')"
        v-for="roleItem in item.children" :key="roleItem.id">
        {{roleItem.roleName}}({{roleItem.userCount}})
        <span class="showIcon">
          <i class="el-icon-edit-outline" @click.stop="handleRole(roleItem, 'edit')"></i>
          <i class="el-icon-circle-plus-outline" @click.stop="handleRole(roleItem, 'add')"></i>
          <i class="el-icon-delete" @click.stop="handleRole(roleItem, 'del')"></i>
        </span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    classifyList: {
      type: Array
    }
  },
  methods: {
    handleClass (item, type) {
      this.$emit('classify', type, item)
    },
    handleRole (item, type) {
      this.$emit('role', type, item)
    },
    handleRoleClick (item, type) {
      this.$emit('roleClick', type, item)
    }
  }
}
</script>

<style lang="less">
  .classify {
    .title {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 40px;
      padding-left: 15px;
      cursor: pointer;
      i {
        padding-left: 7px;
      }
    }
    .role {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      line-height: 40px;
      padding-left: 40px;
      cursor: pointer;
      i {
        padding-left: 7px;
        color: #999;
      }
    }
    .showIcon {
      display: none;
    }
    .title:hover .showIcon{
      display: inline-block;
    }
    .role:hover .showIcon{
      display: inline-block;
    }
  }
</style>
