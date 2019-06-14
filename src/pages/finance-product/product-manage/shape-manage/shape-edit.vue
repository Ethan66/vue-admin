<template>
  <el-dialog
    :title="title"
    :visible.sync="showDialog1"
    width="816px"
    :class="'dialogModule shapeEdit'"
  >
    <el-form :model="shapeData" ref="shapeEdit" :rules="rules">
      <section>
        <h4>基础信息</h4>
        <el-form-item label="名称" prop="name">
          <el-input placeholder="请输入" v-model="shapeData.name"></el-input>
        </el-form-item>
        <el-form-item label="对象" prop="object">
          <el-select v-model="shapeData.object" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用场景" prop="name">
          <el-input placeholder="请输入" v-model="shapeData.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="object">
          <el-radio-group v-model="shapeData.object">
            <el-radio label="正常"></el-radio>
            <el-radio label="停用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </section>
      <section>
        <h4>基本配置</h4>
        <div class="region">
          <el-form-item label="额度区间" prop="name">
            <el-input placeholder="最小值/千" v-model="shapeData.name"></el-input>
          </el-form-item>
          <el-form-item label="额度区间" prop="name">
            <el-input placeholder="最大值/千" v-model="shapeData.name"></el-input>
          </el-form-item>
        </div>
        <div class="region">
          <el-form-item label="单笔贷款区间" prop="region">
            <el-input placeholder="最小值/千" v-model="shapeData.region"></el-input>
          </el-form-item>
          <el-form-item label="单笔贷款区间" prop="region">
            <el-input placeholder="最大值/千" v-model="shapeData.region"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="贷款期限" prop="name">
          <el-input placeholder="分期数，自然月，英文逗号分隔" v-model="shapeData.name"></el-input>
        </el-form-item>
        <el-form-item label="定日方式" prop="object">
          <el-input placeholder="请输入" v-model="shapeData.object"></el-input>
        </el-form-item>
        <el-form-item label="循环授信" prop="object">
          <el-radio-group v-model="shapeData.object">
            <el-radio label="支持"></el-radio>
            <el-radio label="不支持"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提前还款" prop="object">
          <el-radio-group v-model="shapeData.object">
            <el-radio label="支持"></el-radio>
            <el-radio label="不支持"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="提前结清" prop="object">
          <el-radio-group v-model="shapeData.object">
            <el-radio label="支持"></el-radio>
            <el-radio label="不支持"></el-radio>
          </el-radio-group>
        </el-form-item>
      </section>
      <section>
        <h4>还款配置 <span class="cm-color">添加组</span></h4>
        <el-form-item label="还款方式" prop="object">
          <el-select v-model="shapeData.object" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日利率" prop="object">
          <el-input placeholder="请输入" v-model="shapeData.object"></el-input>
        </el-form-item>
      </section>
      <section>
        <h4>逾期配置</h4>
        <el-form-item label="罚息日利率" prop="object">
          <el-input placeholder="请输入，单位%" v-model="shapeData.object"></el-input>
        </el-form-item>
        <el-form-item label="宽限期" prop="object">
          <template slot="label">
            宽限期
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位天" v-model="shapeData.object"></el-input>
        </el-form-item>
        <el-form-item label="逾期违约金比例" prop="object">
           <template slot="label">
            逾期违约金比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位天" v-model="shapeData.object"></el-input>
        </el-form-item>
      </section>
      <section>
        <h4>提前还款配置</h4>
        <el-form-item label="提前还款征收点" prop="object">
          <template slot="label">
            提前还款征收点
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="shapeData.object"></el-input>
        </el-form-item>
        <el-form-item label="提前还款违约金比例" prop="object">
           <template slot="label">
            提前还款违约金比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="shapeData.object"></el-input>
        </el-form-item>
      </section>
      <section>
        <h4>提前结清配置</h4>
        <el-form-item label="提前结清费用比例" prop="object">
          <template slot="label">
            提前结清费用比例
            <el-tooltip popper-class="shapeEdit" class="tip" effect="light" content="Top Left 提示文字" placement="top-start">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
          <el-input placeholder="请输入，单位%" v-model="shapeData.object"></el-input>
        </el-form-item>
      </section>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
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
      rules: {
        name: [{
          required: true, trigger: 'blur'
        }],
        object: [{
          required: true, trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    showDialog1: {
      get () { return this.showDialog },
      set (val) { this.$emit('update:showDialog', val) }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('handleSubmit')
    }
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
