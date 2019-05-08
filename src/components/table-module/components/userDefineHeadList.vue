<template>
  <div class="user-define-head-list">
    <el-popover
      popper-class="user-define-head-list table-el-popover"
      width="110"
      trigger="click">
      <el-checkbox class="head" :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAllChange">自定义表头</el-checkbox>
      <el-checkbox-group v-model="newChoosedHeadList" @change="handleCheckedHeadChange">
        <el-checkbox v-for="(item, index) in totalSetHeadList" :label="item" :key="index">{{ item.label }}</el-checkbox>
      </el-checkbox-group>
      <button class="head bottom" @click="handleSendHead">确定</button>
      <p slot="reference" title="自定义表头">设置</p>
    </el-popover>
  </div>
</template>

<script>
import totalSetHeadList from '../config/defaultHeadList'
export default {
  props: {
    choosedHeadList: Array,
    totalSetHeadList: {
      type: Array,
      default () {
        return totalSetHeadList
      }
    }
  },
  data () {
    return {
      checkedAll: false, // 表格头部勾选全部
      isIndeterminate: true, // 全部勾选状态
      newChoosedHeadList: [] // 新已勾选表头
    }
  },
  watch: {
    choosedHeadList (val) {
      this.newChoosedHeadList = val
    }
  },
  mounted () {
    this.handleSetPosition()
  },
  methods: {
    // 设置位置
    handleSetPosition () {
      setTimeout(() => {
        const NavHeight = 50
        const el = document.querySelector('.user-define-head-list .el-popover__reference')
        const settingPosition = document.querySelector('.cell.el-icon-setting').getBoundingClientRect()
        el.style.top = settingPosition.top - NavHeight - 12 + 'px'
      }, 1000)
    },
    // 选择全部
    handleCheckAllChange (val) {
      this.newChoosedHeadList = val ? this.totalSetHeadList : []
      this.isIndeterminate = false
    },
    // 改变勾选状态时
    handleCheckedHeadChange (val) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.totalSetHeadList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.totalSetHeadList.length
    },
    // 发送勾选的表头
    handleSendHead () {
      let noCheckedHeadList = this.totalSetHeadList.filter(item => {
        let result = true
        this.newChoosedHeadList.forEach(obj => {
          Object.is(obj, item) && (result = false)
        })
        return result
      }).map(item => `${item.label},${item.value}`)
      this.$emit('handleSendHead', noCheckedHeadList.join(';'))
      document.querySelector('.table-el-popover').style.display = 'none'
    }
  }
}
</script>

<style lang="less">
.user-define-head-list{
  @fontColor: #172F88;
  .el-popover__reference{
    position: absolute;
    z-index: 1000;
    right: 46px;
    top: 82px;
    width: 24px;
    height: 16px;
    opacity: 0;
    cursor: pointer;
    font-size: 12px;
  }
  &.el-popover{
    width: auto !important;
    min-width: 110px;
    padding: 0;
    box-sizing: border-box;
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: @fontColor;
      border-color: @fontColor;
    }
    .el-checkbox__label{
      font-size: 12px;
    }
    .is-checked+.el-checkbox__label{
      color: @fontColor !important;
    }
    .el-checkbox{
      display: block;
      margin-left: 15px;
      margin-bottom: 10px;
      line-height: 1;
    }
    .el-checkbox+.el-checkbox{
      margin-left: 15px;
    }
    .head{
      width: 100%;
      height: 35px;
      margin-left: 0;
      padding-left: 15px;
      line-height: 35px;
      border-bottom: 1px solid #e8e8e8;
      box-sizing: border-box;
      &.bottom{
        background: #fff;
        padding-left: 0;
        border: none;
        border-top: 1px solid #e8e8e8;
        text-align: center;
        color: @fontColor;
      }
    }
  }
}
</style>
