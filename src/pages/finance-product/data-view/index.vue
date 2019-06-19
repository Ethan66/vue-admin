<template>
  <div class="dataView substance">
    <div class="header">
      <div class="dataTotol dataContent">
        <h4>数据概览</h4>
        <div class="lend">
          <div class="img">
            <img src="" />
          </div>
          <div class="text">
            <p class="amount">{{ totalData.yesterdaySumLoanAmount }}万</p>
            <p>昨日累计放贷(元)</p>
          </div>
        </div>
        <div class="lending">
          <div class="img">
            <img src="" />
          </div>
          <div class="text">
            <p class="amount">{{ totalData.yesterdaySumFlowOutAmount }}万</p>
            <p>昨日在贷金额(元)</p>
          </div>
        </div>
      </div>
      <div class="rate dataContent">
        <h4>在贷金额占比</h4>
        <div class="circleContent">
          <div class="circle" style="width: 150px; height: 150px;"></div>
          <div class="tip">
            <p class="rate" v-for="(item, i) in scaleList" :key="i">{{ item.scale }}</p>
          </div>
        </div>
      </div>
      <div class="lastFive dataContent">
        <h4>今5天每日放款数据</h4>
        <div class="tree" style="width: 100%; height: 210px;"></div>
      </div>
    </div>
    <div class="chartContent">
      <div class="title">
        <span>申请借款</span>
        <el-select v-model="value" placeholder="请选择" popper-class="dataView" @change="handleGetDataOverView">
          <el-option
            v-for="item in [{ value: 7, label: '近7天' }, { value: 14, label: '近14天' }]"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="line" style="width: 100%; height: calc(100% - 60px);"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { circle, tree, line } from './options'
import { apiDateOverView } from '@/api/financeProduct'
export default {
  name: 'chart',
  data () {
    return {
      value: 7,
      totalData: {},
      productList: [],
      scaleList: [],
      product5Day: [],
      borrowDataList: []
    }
  },
  created () {
    this.handleGetDataOverView(this.value)
  },
  mounted () {
    let $circle = echarts.init(document.querySelector('.circle'))
    $circle.setOption(circle)
    let $tree = echarts.init(document.querySelector('.tree'))
    $tree.setOption(tree)
    let $line = echarts.init(document.querySelector('.line'))
    $line.setOption(line)
  },
  methods: {
    handleGetDataOverView (day) {
      apiDateOverView({ day }).then(res => {
        if (res.code === '208999') {
          let data = res.resultMap.data
          let productList = this.productList = res.resultMap.product.list
          this.$set(this.totalData, 'yesterdaySumFlowOutAmount', (data.yesterdaySumFlowOutAmount/10000).toFixed(2))
          this.$set(this.totalData, 'yesterdaySumLoanAmount', (data.yesterdaySumLoanAmount/10000).toFixed(2))
          this.scaleList = data.productScale.map(item => {
            let obj = productList.find(product => product.productCode === item.productCode)
            item.productName = obj ? obj.productName : ''
            return item
          })
          this.product5Day = data.product5Day.map(item => {
            let obj = productList.find(product => product.productCode === item.productCode)
            item.productName = obj ? obj.productName : ''
            return item
          })
          this.borrowDataList = data.productResult.map(item => {
            let obj = productList.find(product => product.productCode === item.productCode)
            item.productName = obj ? obj.productName : ''
            return item
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
  .dataView{
    .header{
      display: flex;
      flex-wrap: wrap;
      .dataContent{
        height: 260px;
        margin-right: 10px;
        background: #fff;
        h4{
          height: 50px;
          line-height: 50px;
          padding-left: 16px;
          border-bottom: 1px solid #e8e8e8;
          font-size: 16px;
        }
        &.dataTotol{
          min-width: 220px;
          .lend{
            padding: 40px 20px 35px;
          }
          .lending{
            padding: 0 20px 40px;
          }
          .img{
            width: 36px;
            height: 36px;
            display: inline-block;
            img{
              width: 100%;
              height: 100%;
              background: black;
              vertical-align: middle;
            }
          }
          .text{
            vertical-align: middle;
            margin-left: 20px;
            display: inline-block;
            font-size: 12px;
            color: #999;
            .amount{
              color: #333;
              height: 33px;
              line-height: 33px;
              font-size: 24px;
              letter-spacing: 0;
            }
          }
        }
        &.rate{
          min-width: 294px;
          .circleContent{
            width: 100%;
            .circle{
              margin-top: 28px;
              display: inline-block;
              vertical-align: top;
            }
            .tip{
              margin: 42px 0 0 18px;
              display: inline-block;
              vertical-align: top;
              font-size: 14px;
              color: #666;
              .rate{
                margin-right: 6px;
              }
              >p{
                margin-bottom: 6px;
              }
            }
          }
        }
        &.lastFive{
          margin-right: 0;
          min-width: calc(100% - 534px);
        }
      }
    }
    .chartContent{
      width: 100%;
      height: calc(100vh - 360px);
      margin-top: 15px;
      background: #fff;
      .title{
        padding: 20px 16px 0;
        .el-select{
          margin-left: 16px;
        }
      }
      .el-select{
        width: 70px;
        height: 22px;
        .el-input__inner{
          height: 22px;
          line-height: 22px;
          border-color: rgba(204,204,204,1);
          font-size: 12px;
          color: #333;
        }
        .el-input--suffix .el-input__inner{
          padding-right: 0;
        }
        .el-input__icon{
          width: 18px;
          height: 22px;
          line-height: 22px;
          color: #333;
          font-size: 12px;
        }
      }
    }
    .el-select-dropdown__list{
      width: 70px;
      padding: 0;
      .el-select-dropdown__item{
        padding: 0 6px;
        font-size: 12px;
      }
    }
  }
</style>
