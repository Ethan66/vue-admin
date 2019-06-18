<template>
  <div class="dialog-detail shape-info" v-if="showDetail">
    <el-dialog :title="title" :visible.sync="showDetail1">
      <template v-for="(item, index) in dialogItem">
        <dl :key="index" v-if="index !== 2">
          <dt>{{ item[0].title }}</dt>
          <dd v-for="(child, i) in item[1]" :key="i">
            <p class="title">{{ i }}:</p>
            <template v-if="child.constructor === Array">
              <p class="content">{{ `${newShapeInfoData[child[0]]} - ${newShapeInfoData[child[1]]}` }}</p>
            </template>
            <template v-if="child.constructor === Object">
              <p class="content">{{ child.options[newShapeInfoData[child.type]] }}</p>
            </template>
            <template v-else>
              <p class="content">{{ newShapeInfoData[child] }}</p>
            </template>
          </dd>
        </dl>
        <dl :key="index" v-else>
          <dt>{{ item[0].title }}</dt>
          <template v-for="(child, i) in newShapeInfoData.repaymentConfig">
            <dd :key="`${i}1`">
              <p class="title">还款方式:</p>
              <p class="content">{{ item[1]['还款方式'].options[child.interest_ways] }}</p>
            </dd>
            <dd :key="`${i}2`">
              <p class="title">日利率:</p>
              <p class="content">{{ child.poundage_rate }}</p>
            </dd>
          </template>
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
    shapeInfoData: Object
  },
  data () {
    return {
      showDetail1: false,
      newShapeInfoData: {},
      dialogItem: [
        [
          { title: '可分期-随借随还' },
          { '状态': { type: 'productFormStatus', options: ['正常', '停用'] }, '对象': { type: 'productFormObject', options: [ '','C端', 'B端', 'C端/B端' ] }, '适用场景': 'sceneName', '创建人': 'createrName', '创建时间': 'gmtCreate', '更新时间': 'gmtModified' }
        ],
        [
          { title: '基本配置' },
          { '额度区间': ['limit_min_range', 'limit_max_range'], '单笔贷款区间': ['limit_min_using', 'limit_max_using'], '贷款期限': 'stage_days', '定日方式': { type: 'fixed_day_type', options: ['凭条统一定日', '按户定日'] }, '循环授信': { type: 'is_circle_credit', options: ['不支持', '支持'] }, '提前还款': { type: 'is_early_repay', options: ['不支持', '支持'] }, '提前结清': { type: 'is_early_clear', options: ['不支持', '支持'] }, '退款': { type: 'is_support_refund', options: ['不支持', '支持'] }, '退款免息': { type: 'is_refund_free', options: ['不支持', '支持'] } }
        ],
        [
          { title: '还款配置' },
          { '还款方式': { type: 'interest_ways', options: ['', '等额本⾦', '等额本息', '等本等息', '⼀次性还本付息', '先息后本'] }, '日利率': 'poundage_rate' }
        ],
        [
          { title: '逾期配置' },
          { '罚息日利率': 'penalty_rate_day', '宽限度': 'breach_days', '逾期违约金比例': 'breach_rate' }
        ],
        [
          { title: '提前还款配置' },
          { '提前还款征收点': 'early_repay_breach_scale', '提前还款违约金比例': 'early_repay_breach_rate' }
        ],
        [
          { title: '提前结清配置' },
          { '提前结清费用比例': 'early_settle_cost_rate' }
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
    },
    shapeInfoData (val) {
      let obj = JSON.parse(JSON.stringify(val))
      let result = {}
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string' || obj[key].constructor === Array) {
          result[key] = obj[key]
        } else if (obj[key].constructor === Object) {
          for(let i in obj[key]) {
            result[i] = obj[key][i]    
          }
        }
      })
      this.newShapeInfoData = result
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
