<template>
  <div class="searchContent">
    <h3>查询条件<span class="cm-btn-color">高级搜索</span></h3>
    <el-form :inline="true" :model="searchValues" size="small">
      <div class="searchWrap">
        <template v-for="(item, i) in searchItem">
          <el-form-item :label="item.label" :key="i" v-if="item.type!=='date'">
            <el-input
              clearable
              v-if="item.type === 'input' || !item.type"
              v-model="searchValues[item.key]"
              :placeholder="item.placeholder || ''"
              :disabled = "item.disabled || false"
              @change="handleChange(item.changeFn)"
            ></el-input>
            <el-select
              clearable
              filterable
              v-if="item.type === 'select'"
              v-model="searchValues[item.key]"
              :placeholder="item.placeholder || ''"
              :disabled = "item.disabled || false"
              @change="handleChange(item.changeFn)"
            ><el-option
                v-for="(pro, index) in item.options" :key="index" :label="pro.label" :value="pro.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="item.type === 'date'" :label="item.label" :key="i">
            <template v-if="item.key.length === 2">
              <el-col>
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  v-model="dateObj[item.key.join()]"
                  style="width: 100%;"></el-date-picker>
              </el-col>
            </template>
          </el-form-item>
        </template>
      </div>
      <el-form-item class="noMarginBottom">
        <el-button type="primary" icon="el-icon-search" @click.native.prevent="handleSearch()">查 询</el-button>
        <el-button class="el-delete" type="primary" icon="el-icon-delete" @click.native.prevent="handleClear()" v-if="showReset">重 置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'searchModule',
  props: {
    searchItem: {
      type: Array,
      required: true
    },
    searchValues: {
      type: Object,
      required: true
    },
    // 是否展示重置
    showReset: {
      type: Boolean,
      default: true
    },
    // 默认搜索条件
    searchDefaultObj: Object
  },
  data () {
    return {
      dateObj: {} // 存储选择的日期范围
    }
  },
  watch: {
    searchItem (val) {
      let result = {}
      val.filter(item => {
        if (item.type === 'date') return true
      }).forEach(item => {
        result[item.key.join()] = ['', '']
      })
      this.dateObj = result
    }
  },
  created () {
    this.initSearchValues()
  },
  methods: {
    initSearchValues () {
      this.searchItem.forEach(item => {
        if (Array.isArray(item.key)) {
          item.key.forEach(item1 => {
            this.$set(this.searchValues, item1, '')
          })
        } else {
          this.$set(this.searchValues, [item.key], '')
        }
      })
    },
    handleClear () {
      this.initSearchValues()
      this.searchItem.forEach(item => {
        if (Array.isArray(item.key)) {
          this.$set(this.dateObj, item.key.join(), ['', ''])
        }
      })
    },
    handleChange (fn) {
      if (fn) {
        let i = 0
        let parent = this.$parent
        while (!parent[fn]) {
          parent = parent.$parent
          i++
          if (i === 5) break
        }
        parent[fn]()
      }
    },
    handleSearch () {
      for (let key in this.dateObj) {
        key.split(',').forEach((item, i) => {
          this.dateObj[key][i] && (this.searchValues[item] = this.$format(this.dateObj[key][i]))
        })
      }
      Object.prototype.toString.call(this.searchDefaultObj) === '[object Object]' &&
        Object.assign(this.searchValues, this.searchDefaultObj)
      console.log(this.searchValues)
      this.$emit('handleSearch', this.searchValues)
    }
  }
}
</script>

<style lang="less">
  .searchContent{
    .el-date-editor .el-range-separator{
      width: auto;
    }
    .el-form .el-form-item .el-form-item__content input, .el-form .el-form-item .el-input input{
      &.el-range-input{
        width: 39%;
        min-width: 75px;
      }
      .el-icon-date{
        width: 14px;
      }
      .el-range__close-icon{
        width: 14px;
      }
    }
    .el-form .el-form-item .el-form-item__content .el-range-editor{
      input.el-range-input{
        width: 39%;
        min-width: 75px;
      }
      .el-icon-date{
        width: 14px;
      }
      .el-range__close-icon{
        width: 8px;
      }
    }
    .el-button--export{
      background: #19A2F9;
      color: #fff;
    }
    padding: 20px 15px;
    background: #fff;
    h3{
      font-size: 16px;
      margin-bottom: 25px;
      span{
        font-size: 14px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
    .searchWrap{
      display: flex;
      flex-wrap: wrap;
    }
    .el-form{
      .el-form-item--small{
        display: flex;
        flex-basis: 280px;
        flex-grow: 1;
        max-width: 310px;
        margin-right: 20px;
        .el-form-item__label{
          min-width: 80px; font-weight: 400;
          padding-right: 10px;
        }
        .el-form-item__content{
          flex-basis: 200px;
          flex-grow: 1;
          max-width: 230px;
        }
        .el-select--small{
          width: 100%;
        }
        .el-input__inner{
          width: 100%;
        }
        &.el-date-editor .el-input__inner{
          width: 100%;
        }
      }
      .el-input--prefix .el-input__inner{
        padding-right: 15px;
      }
      .el-delete{
        background:#F7BF5E;
        border-color:#F7BF5E;
      }
    }
    .width{
      min-width: 24px; text-align: center;
    }
    .noMarginBottom{
      margin-bottom: 0;
    }
  }
</style>
