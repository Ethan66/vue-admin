<template>
  <el-dialog
    :title="title"
    :visible.sync="showDialog1"
    width="816px"
    :class="'dialogModule shapeEdit'"
  >
    <el-form :model="newShapeData" ref="shapeEdit" :rules="rules">
      <section>
        <h4>基础信息</h4>
        <el-form-item label="名称" prop="productFormName">
          <el-input placeholder="请输入" v-model="newShapeData.productFormName"></el-input>
        </el-form-item>
        <el-form-item label="对象" prop="productFormObject">
          <el-select v-model="newShapeData.productFormObject" placeholder="请选择">
            <el-option label="C端" :value="1"></el-option>
            <el-option label="B端" :value="2"></el-option>
            <el-option label="C端/B端" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用场景" prop="sceneName">
          <el-input placeholder="请输入" v-model="newShapeData.sceneName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="productFormStatus">
          <el-radio-group v-model="newShapeData.productFormStatus">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </section>
      <section>
        <h4>基本配置</h4>
        <div class="region">
          <el-form-item label="额度区间" prop="limit_min_range">
            <el-input placeholder="最小值/千" v-model="newShapeData.basicConfig.limit_min_range"></el-input>
          </el-form-item>
          <el-form-item label="额度区间" prop="limit_max_range">
            <el-input placeholder="最大值/千" v-model="newShapeData.basicConfig.limit_max_range"></el-input>
          </el-form-item>
        </div>
        <div class="region">
          <el-form-item label="单笔贷款区间" prop="limit_min_using">
            <el-input placeholder="最小值/千" v-model="newShapeData.basicConfig.limit_min_using"></el-input>
          </el-form-item>
          <el-form-item label="单笔贷款区间" prop="limit_max_using">
            <el-input placeholder="最大值/千" v-model="newShapeData.basicConfig.limit_max_using"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="" prop="stage_days">
          <template slot="label">
            贷款期限
            <span class="cm-color" v-if="loanType === '/月'" @click="loanType = '/天'">切换天</span>
            <span class="cm-color" v-else @click="loanType = '/月'">切换月</span>
          </template>
          <el-input placeholder="分期数，自然月，英文逗号分隔" v-model="newShapeData.basicConfig.stage_days"></el-input>
        </el-form-item>
        <el-form-item label="定日方式" prop="fixed_day_type">
          <el-select v-model="newShapeData.basicConfig.fixed_day_type" placeholder="请选择">
            <el-option label="平台统一定日" :value="0"></el-option>
            <el-option label="按户定日" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="循环授信" prop="is_circle_credit">
          <el-radio-group v-model="newShapeData.basicConfig.is_circle_credit">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提前还款" prop="is_early_repay">
          <el-radio-group v-model="newShapeData.basicConfig.is_early_repay">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提前结清" prop="is_early_clear">
          <el-radio-group v-model="newShapeData.basicConfig.is_early_clear">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退款" prop="is_support_refund">
          <el-radio-group v-model="newShapeData.basicConfig.is_support_refund">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退款免息服务" prop="is_refund_free">
          <el-radio-group v-model="newShapeData.basicConfig.is_refund_free">
            <el-radio :label="0">支持</el-radio>
            <el-radio :label="1">不支持</el-radio>
          </el-radio-group>
        </el-form-item>
      </section>
      <section>
        <h4>还款配置 <span class="cm-color" @click="handleAddRepayConfig">添加组</span><span class="cm-color" @click="handleRemoveRepayConfig">删除组</span></h4>
        <template v-for="(item, i) in newShapeData.repaymentConfig">
          <el-form-item label="还款方式" :prop="`interest_ways${i}`" :key="`interest_ways${i}`">
            <el-select v-model="newShapeData.repaymentConfig[i].interest_ways" placeholder="请选择">
              <el-option label="等额本金" :value="1"></el-option>
              <el-option label="等额本息" :value="2"></el-option>
              <el-option label="等本等息" :value="3"></el-option>
              <el-option label="一次性还本付息" :value="4"></el-option>
              <el-option label="先息后本" :value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日利率" :prop="`poundage_rate${i}`" :key="`poundage_rate${i}`">
            <el-input placeholder="请输入" v-model="newShapeData.repaymentConfig[i].poundage_rate"></el-input>
          </el-form-item>
        </template>
      </section>
      <section>
        <h4>逾期配置</h4>
        <el-form-item label="罚息日利率" prop="penalty_rate_day">
          <el-input placeholder="请输入，单位%" v-model="newShapeData.overdureConfig.penalty_rate_day"></el-input>
        </el-form-item>
        <el-form-item label="宽限期" prop="breach_days">
          <template slot="label">
            宽限期
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位天" v-model="newShapeData.overdureConfig.breach_days"></el-input>
        </el-form-item>
        <el-form-item label="逾期违约金比例" prop="breach_rate">
           <template slot="label">
            逾期违约金比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位天" v-model="newShapeData.overdureConfig.breach_rate"></el-input>
        </el-form-item>
      </section>
      <section>
        <h4>提前还款配置</h4>
        <el-form-item label="提前还款征收点" prop="early_repay_breach_scale">
          <template slot="label">
            提前还款征收点
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="newShapeData.prepayConfig.early_repay_breach_scale"></el-input>
        </el-form-item>
        <el-form-item label="提前还款违约金比例" prop="early_repay_breach_rate">
           <template slot="label">
            提前还款违约金比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="newShapeData.prepayConfig.early_repay_breach_rate"></el-input>
        </el-form-item>
      </section>
      <section>
        <h4>提前结清配置</h4>
        <el-form-item label="提前结清费用比例" prop="early_settle_cost_rate">
          <template slot="label">
            提前结清费用比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="newShapeData.settleConfig.early_settle_cost_rate"></el-input>
        </el-form-item>
      </section>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showDialog1 = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    shapeData: Object,
    showDialog: Boolean
  },
  data () {
    return {
      loanType: '/天',
      repayConfigArr: [],
      rules: {},
      newShapeData: {},
      textTip: {}
    }
  },
  watch: {
    shapeData (val) {
      this.handleInitShapeData(val)
    }
  },
  computed: {
    showDialog1: {
      get () { return this.showDialog },
      set (val) { this.$emit('update:showDialog', val) }
    }
  },
  created () {
    this.handleInitShapeData(this.shapeData)
    this.textTip = {
        limit_min_range: { text: '请输入额度区间', type: 'basicConfig', isRange: true },
        limit_max_range: { text: '请输入额度区间', type: 'basicConfig', isRange: true },
        stage_days: { text: '请输入贷款期限', type: 'basicConfig' },
        fixed_day_type: { type: 'basicConfig', text: '请选择定日方式' },
        is_circle_credit: { type: 'basicConfig', text: '请选择是否支持循环授信'},
        is_early_repay: { type: 'basicConfig', text: '请选择是否提前还款' },
        is_early_clear: { type: 'basicConfig', text: '请选择是否提前结清' },
        is_support_refund: { type: 'basicConfig', text: '请选择是否支持退款' },
        is_refund_free: { type: 'basicConfig', text: '请选择是否支持退款免息' },
        penalty_rate_day: { type: 'overdureConfig', text: '请输入罚息日利率' },
        breach_days: { type: 'overdureConfig', text: '请输入宽限期限' },
        breach_rate: { type: 'overdureConfig', text: '请输入逾期违约金比例' },
        early_repay_breach_scale: { type: 'prepayConfig', text: '请输入提前还款征收点' },
        early_repay_breach_rate: { type: 'prepayConfig', text: '请输入提前还款违约金比例' },
        early_settle_cost_rate: { type: 'settleConfig', text: '请输入提前结清费用比例' }
      }
    this.rules = {
      productFormName: [{
        required: true, message: '请输入名称', trigger: 'blur'
      }],
      productFormObject: [{
        required: true, message: '请输入对象', trigger: 'blur'
      }],
      sceneName: [{
        required: true, message: '请选择适用场景', trigger: 'blur'
      }],
      productFormStatus: [{
        required: true, message: '请选择形态状态', trigger: 'blur'
      }],
      limit_min_range: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      limit_max_range: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      stage_days: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      fixed_day_type: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      is_circle_credit: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      is_early_repay: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      is_early_clear: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      is_support_refund: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      is_refund_free: [{
        required: true, validator: this.validateConfig, trigger: 'change'
      }],
      // interest_ways: [{
      //   required: true, validator: this.validateConfig, trigger: 'blur'
      // }],
      // poundage_rate: [{
      //   required: true, validator: this.validateConfig, trigger: 'blur'
      // }],
      penalty_rate_day: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      breach_days: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      breach_rate: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      early_repay_breach_scale: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      early_repay_breach_rate: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
      early_settle_cost_rate: [{
        required: true, validator: this.validateConfig, trigger: 'blur'
      }],
    }
  },
  methods: {
    // 初始化shapeData
    handleInitShapeData (val) {
      let temp = JSON.parse(JSON.stringify(val))
      !temp.basicConfig && (temp.basicConfig = {
        limit_min_range: '', limit_max_range: '', limit_min_using: '', limit_max_using: '', stage_days: '', stage_type: '/月', fixed_day_type: '', is_circle_credit: '', is_early_repay: '', is_early_clear: '', is_support_refund: '', is_refund_free: ''
      })
      !temp.repaymentConfig && (temp.repaymentConfig = [{ interest_ways: '', poundage_rate: '' }])
      !temp.overdureConfig && (temp.overdureConfig = { penalty_rate_day: '', breach_days: '', breach_rate: '' })
      !temp.prepayConfig && (temp.prepayConfig = { early_repay_breach_scale: '', early_repay_breach_rate: '' })
      !temp.settleConfig && (temp.settleConfig = { early_settle_cost_rate: '' })
      this.newShapeData = temp
      temp.repaymentConfig.forEach((item, i) => {
        let arr = Object.keys(item)
        this.rules[`${arr[0]}${i}`] = [{ required: true, validator: this.validateConfig, trigger: 'change' }]
        this.rules[`${arr[1]}${i}`] = [{ required: true, validator: this.validateConfig, trigger: 'blur' }]
        this.textTip[`${arr[0]}${i}`] = { type: 'repaymentConfig', text: '请选择还款方式' }
        this.textTip[`${arr[1]}${i}`] = { type: 'repaymentConfig', text: '请输入日利率' }
      })
    },
    handleAddRepayConfig () {
      this.newShapeData.repaymentConfig.push({ interest_ways: '', poundage_rate: '' })
      let length = this.newShapeData.repaymentConfig.length - 1
      this.rules[`interest_ways${length}`] = [{ required: true, validator: this.validateConfig, trigger: 'change' }]
      this.rules[`poundage_rate${length}`] = [{ required: true, validator: this.validateConfig, trigger: 'blur' }]
      this.textTip[`interest_ways${length}`] = { type: 'repaymentConfig', text: '请选择还款方式' }
      this.textTip[`poundage_rate${length}`] = { type: 'repaymentConfig', text: '请输入日利率' }
    },
    handleRemoveRepayConfig () {
      this.newShapeData.repaymentConfig.pop()
      let length = this.newShapeData.repaymentConfig.length
      delete this.rules[`interest_ways${length}`]
      delete this.rules[`poundage_rate${length}`]
      delete this.textTip[`interest_ways${length}`]
      delete this.textTip[`poundage_rate${length}`]
    },
    // 提交
    handleSubmit () {
      this.$refs.shapeEdit.validate((valid) => {
        if (valid) {
          this.$emit('handleSubmit', this.newShapeData)
        }
      })
    },
    // 基本配置
    validateConfig (rule, value, callback) {
      let textTip = this.textTip
      let field = rule.field
      let obj = textTip[field]
      let val = ''
      if (/interest_ways|poundage_rate/.test(field)) {
        val = this.newShapeData[obj.type][field.slice(-1)][field.slice(0, -1)]
      } else {
        val = this.newShapeData[obj.type][field]
      }
      if (val !== 0 && !String(val).trim()) {
        return callback(new Error(obj.text))
      }
      if (obj.isRange) {
        if (Number(this.newShapeData[obj.type].limit_max_range)) {
          if (Number(this.newShapeData[obj.type].limit_min_range) >= Number(this.newShapeData[obj.type].limit_max_range)) {
            return callback(new Error('请输入正确的区间'))
          }
        }
      }
      callback()
    },
  }
}
</script>

<style lang="less">
  .shapeEdit{
    &.el-tooltip__popper{
      border-color: #e8e8e8;
      .popper__arrow{
        &.is-light[x-placement^=top]{
          border-top-color: #e8e8e8;
          &:after{
            border-top-color: #e8e8e8;
          }
        }
        border-top-color: #e8e8e8 !important;
        &:after{
          border-top-color: #e8e8e8;
        }
      }
    }
    &.dialogModule{
      .el-dialog{
        max-width: 816px;
        box-sizing: content-box;
        .el-dialog__body{
          padding: 30px 0 0 30px;
          height: 480px;
          overflow: scroll;
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
        }
      }
      section{
        display: flex;
        flex-wrap: wrap;
        &+section{
          margin-top: 15px;
        }
        h4{
          width: 100%;
          margin-bottom: 10px;
          font-size: 14px;
          color: #333;
        }
        .el-form-item{
          display: flex;
          flex-direction: column;
          margin-right: 30px;
          label{
            text-align: left;
          }
          .el-form-item__label{
            .tip.el-icon-warning{
              margin-left: 7px;
              font-size: 12px;
              color: #FF8018;
            }
          }
          .el-form-item__content{
            margin-left: 0;
            input[type=text]{
              width: 230px;
            }
            .el-radio-group{
              width: 230px;
            }
          }
        }
        .region{
          width: 230px;
          margin-right: 30px;
          display: flex;
          
          .el-form-item{
            width: 105px;
            margin-right: 0;
            &+.el-form-item{
              position: relative;
              margin-left: 20px;
              &:before{
                position: absolute;
                left: -12px;
                top: 35px;
                display: block;
                content: '-';
              }
              label{
                opacity: 0;
              }
            }
            .el-form-item__content{
              input[type=text]{
                width: 105px;
              }
            }
          }
        }
      }
    }
  }
</style>
