<template>
  <div class="dialog-detail" v-if="showDetail">
    <el-dialog :title="title" :visible.sync="showDetail1">
      <ul>
        <li v-for="(item, i) in dialogItem" :key="i">
          <p :class="['title', `title${chineseTybe}`]">{{ item.label }}</p>
          <p class="content">{{ editData[item.key] }}</p>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail1=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialog-detail',
  props: {
    title: String,
    showDetail: Boolean,
    dialogItem: Array,
    editData: Object
  },
  data () {
    return {
      chineseTybe: 0,
      showDetail1: false
    }
  },
  watch: {
    showDetail1 (val) {
      this.$emit('update:showDetail', val)
    },
    showDetail (val) {
      if (val) this.showDetail1 = val
    }
  },
  created () {
    this.dialogItem.forEach(item => {
      if (item.label.length > this.chineseTybe) {
        this.chineseTybe = item.label.length
      }
    })
  }
}
</script>

<style lang="less">
  .dialog-detail{
    ul,li,p{
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .el-dialog{
      width: 520px;
      .el-dialog__header{
        padding-top: 16px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 30px;
        border-bottom: 1px solid #e8e8e8;
        ul{
          li{
            margin-bottom: 15px;
            color: #333;
            p{
              display: inline-block;
            }
            .title{
              margin-right: 30px;
              &.title5{
                width: 70px;
              }
              &.title4{
                width: 56px;
              }
              &.title3{
                width: 42px;
              }
              &.title2{
                width: 28px;
              }
            }
            .content{
              color: #666;
            }
          }
        }
      }
    }
    .el-dialog__footer{
      padding-top: 20px;
      .el-button{
        height: 30px;
        padding: 0 15px;
        line-height: 30px;
    }
    }
  }
</style>
