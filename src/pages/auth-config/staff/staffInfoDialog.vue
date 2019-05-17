<template>
  <div class="staff-info-dialog">
    <el-dialog
      :title="dialogTitle" :visible.sync="staffInfoVisible"  width="700px">
      <div class="user-info" v-for="(item, index) in infoItem" :key="index">
        <div class="info-title">{{item.infoTitle}}</div>
        <div class="info-content">
          <div v-for="(infoItem, index) in item.infoList" :key="index">
            {{infoItem.label}}：<span>{{infoData[infoItem.key]}}</span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-for="(item, index) in dialogBtn"
          :key="index" :type="item.color"
          @click="handleClick(item.type, item.clickfn)">{{item.label}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String
    },
    dialogBtn: {
      type: Array
    },
    dialogVisible: {
      type: Boolean
    },
    infoItem: {
      type: Array
    },
    infoData: {
      type: Object
    }
  },
  data () {
    return {
      staffInfoVisible: false
    }
  },
  watch: {
    staffInfoVisible (val) {
      if (val === false) {
        this.$emit('update:dialogVisible', false)
      }
    },
    dialogVisible (val) {
      if (val === true) {
        this.staffVisible = true
      }
    }
  },
  methods: {
    handleClick (type, fn) {
      if (type === 'delete') {
        if (!fn) {
          this.staffInfoVisible = false
        } else {
          this.$parent[fn]()
        }
      } else if (type === 'edit') {
        if (!fn) {
          this.staffInfoVisible = false
        } else {
          this.$parent[fn]()
        }
      }
    }
  }
}
</script>

<style lang="less">
  .staff-info-dialog {
    .user-info {
      padding-bottom: 50px;
      .info-title {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        padding-bottom: 15px;
      }
      .info-content {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.43px;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        div{
          width: 50%;
          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666666;
            letter-spacing: -0.43px;
            line-height: 20px;
          }
        }
        div:nth-of-type(1) {
          padding-bottom: 20px;
        }
      }
    }
    .el-dialog{
      border-radius: 4px;
      .el-dialog__header{
        padding: 15px 15px 10px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 28px 30px 0;
      }
       .el-dialog__footer{
        height: 60px;
        padding: 14px 15px;
        border-top: 1px solid #e8e8e8;
        .el-button{
          width: 60px;
          height: 32px;
          padding: 0;
          line-height: 32px;
        }
      }
    }
  }
</style>
