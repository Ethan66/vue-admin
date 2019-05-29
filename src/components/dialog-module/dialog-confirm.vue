<template>
<!-- confirmTitle: 弹窗标题
     confirmContent： 提示内容
     showDialogForm： 是否显示弹窗
     confirmFn: 确认按钮函数
-->
  <div class="dialog-confirm">
    <el-dialog
      :title="confirmTitle"
      :visible.sync="dialogVisibleConfrim"
      :show-close='false'
      width="30%">
      <div slot="title" class="icon-wap">
        <i class="confirm-icon"><img src="~@/assets/img/confirm.png" alt=""/></i>
        <span class="icon-tit">{{confirmTitle}}</span>
      </div>
      <span class="confirm-content">{{confirmContent}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisibleConfrim = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleFn(confirmFn, dialogVisibleConfrim = false)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialog-confirm',
  props: {
    confirmTitle: {
      type: String,
      default () {
        return '温馨提醒'
      }
    },
    confirmContent: String,
    confirmFn: String,
    showDialogForm: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    showDialogForm (val) {
      if (val === true) {
        this.dialogVisibleConfrim = true
      }
    },
    dialogVisibleConfrim (val) {
      if (val === false) {
        this.$emit('update:showDialogForm', false)
      }
    }
  },
  data () {
    return {
      chineseTybe: 0,
      dialogVisibleConfrim: false
    }
  },
  created () {
  },
  methods: {
    // 确认按钮
    handleFn (fn) {
      return this.$parent[fn]()
    }
  }
}
</script>

<style lang="less">
  .dialog-confirm{
    .icon-wap {
      position: relative;
      .confirm-icon {
        >img {
          width: 20px;
          height: 20px;
        }
      }
      .icon-tit {
        position: absolute;
        top: 2px;
        left: 30px;
        font-size: 16px;
        color: #888;
      }
    }
    .el-dialog {
      .el-dialog__body {
        padding: 0 30 30px;
      }
    }
    .confirm-content {
      font-size: 14px;
      color: #888;
      line-height: 24px;
      padding: 0 30px;
      display: block;
      margin-top: -30px;
    }
  }
</style>
