<template>
  <div class="classify">
    <h3 ref="all" class="active">
      <div v-if="type==='staffRole'"
        @click.stop="handleRoleClick('all', '', $event)"
      >全部用户({{total}})</div>
    </h3>
    <template v-for="item in classifyList">
      <div class="title" :key="`t${item.id}`">
        <div class="content" @click.stop="handleRoleClick(item, 'classify', $event)">
          {{item.roleName}}({{item.userCount}})
        </div>
        <span class="showIcon">
          <i
            v-if="item.roleType === 2"
            class="el-icon-edit-outline"
            @click.stop="handleClass(item, 'edit')"></i>
          <i
            class="el-icon-circle-plus-outline"
            @click.stop="handleClass(item, 'add')"></i>
          <i v-if="item.roleType === 2" class="el-icon-delete" @click.stop="handleClass(item, 'del')"></i>
        </span>
      </div>
      <div class="role"
        v-for="roleItem in item.childIdList" :key="roleItem.id">
        <div
          class="content"
          @click.stop="handleRoleClick(roleItem, 'role', $event)">
          {{roleItem.roleName}}({{roleItem.userCount}})
        </div>
        <span class="showIcon">
          <i v-if="roleItem.roleType === 2" class="el-icon-edit-outline" @click.stop="handleRole(roleItem, 'edit')"></i>
          <i class="el-icon-circle-plus-outline" @click.stop="handleRole(roleItem, 'add')"></i>
          <i v-if="roleItem.roleType === 2" class="el-icon-delete" @click.stop="handleRole(roleItem, 'del')"></i>
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
    },
    total: {
      type: Number
    },
    type: String
  },
  data () {
    return {
      node: '',
      oldNode: ''
    }
  },
  methods: {
    handleClass (item, type) {
      this.$emit('classify', type, item)
    },
    handleRole (item, type) {
      this.$emit('role', type, item)
    },
    handleRoleClick (item, type, event) {
      let el = event.target.parentNode
      if (this.type === 'roleLimit' && el.classList.contains('title')) {
        return
      }
      // 为当前单击项增加active样式
      if (!el.classList.contains('active')) {
        if (this.oldNode !== el && typeof this.oldNode === 'object') {
          this.oldNode.classList.remove('active')
        } else if (this.oldNode === '') { // 第一次进入页面时特殊情况
          this.$refs.all.classList.remove('active')
          document.querySelector(`#pane-second .classify .role`).classList.remove('active')
        }
        el.classList.add('active')
        this.oldNode = event.target.parentNode
      }
      this.$emit('roleClick', type, item)
    },
    handleReStatus () {
      if (typeof this.oldNode === 'object') {
        this.oldNode.classList.remove('active')
      }
      this.oldNode = ''
      this.$refs.all.classList.add('active')
    }
  }
}
</script>

<style lang="less">
  .classify {
    h3 {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      line-height: 40px;
      padding-left: 15px;
      cursor: pointer;
    }
    .title {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 40px;
      padding-left: 15px;
      .content {
        display: inline-block;
        cursor: pointer;
      }
      i {
        margin-left: 7px;
        cursor: pointer;
      }
    }
    .role {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      line-height: 40px;
      padding-left: 30px;
      white-space: nowrap;
      .content {
        display: inline-block;
        cursor: pointer;
        max-width: 98px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      i {
        padding-left: 7px;
        color: #999;
        cursor: pointer;
      }
    }
    .active {
      color: #4162DB;
      background: rgba(65, 98, 219, .1);
    }
    .showIcon {
      visibility: hidden;
      i:hover {
        color: #4162DB;
      }
    }
    .title:hover .showIcon{
      display: inline-block;
      visibility: visible;
    }
    .role:hover .showIcon{
      display: inline-block;
      visibility: visible;
    }
  }
</style>
