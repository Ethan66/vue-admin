<template>
  <div class="dialog-detail shape-info" v-if="showDetail">
    <el-dialog :title="title" :visible.sync="showDetail1">
      <template v-for="(item, index) in dialogItem">
        <dl :key="index">
          <dt>{{ item[0].title }}</dt>
          <dd v-for="(child, i) in item[1]" :key="i">
            <p class="title">{{ i }}:</p>
            <p class="content">{{ editData[child] }}</p>
          </dd>
        </dl>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetail1=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    showDetail: Boolean,
    editData: Object
  },
  data () {
    return {
      showDetail1: false,
      dialogItem: [
        [
          { title: '可分期-随借随还' },
          { '状态': 'creater', '对象': 'gmtCreate', '适用场景': 'id', '创建人': 'menuCode', '创建时间': 'menuName', '更新时间': 'modifier' }
        ],
        [
          { title: '基本配置' },
          { '额度区间': 'creater', '单笔贷款区间': 'gmtCreate', '贷款期限': 'id', '定日方式': 'menuCode', '循环授信': 'menuName', '提前还款': 'modifier', '提前结清': 'pageCode' }
        ],
        [
          { title: '还款配置' },
          { '还款方式': 'creater', '日利率': 'gmtCreate' }
        ],
        [
          { title: '逾期配置' },
          { '罚息日利率': 'creater', '宽限度': 'gmtCreate', '逾期违约金比例': 'id' }
        ],
        [
          { title: '提前还款配置' },
          { '提前还款征收点': 'creater', '提前还款违约金比例': 'gmtCreate' }
        ],
        [
          { title: '提前结清配置' },
          { '提前结清费用比例': 'creater' }
        ]
      ]
    }
  },
  watch: {
    showDetail1 (val) {
      this.$emit('update:showDetail', val)
    },
    showDetail (val) {
      if (val) this.showDetail1 = val
    }
  }
}
</script>

<style lang="less">
  .shape-info{
    .el-dialog{
      width: 700px;
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
        height: 420px;
        overflow: scroll;
        border-bottom: 1px solid #e8e8e8;
        &::-webkit-scrollbar {/*滚动条整体样式*/
            width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 8px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            background: #ccc;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            border-radius: 0;
            background: transparent;
        }
        dl{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          &:first-child{
            dt{
              margin-top: 0;
            }
          }
          dt{
            margin: 45px 0 20px;
            width: 100%;
            min-width: 100%;
            color: #333;
          }
          dd{
            margin-bottom: 20px;
            display: flex;
            width: 50%;
            height: 20px;
            line-height: 20px;
            .title{
              color: #333;
            }
            .content{
              margin-left: 5px;
              color: #999;
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
