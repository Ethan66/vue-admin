<template>
  <div class="searchContent">
    <h3>查询条件<span class="cm-btn-color" @click="handleShowAll" v-if="searchItem.length > 6">更多搜索</span></h3>
    <el-form :inline="true" :model="searchValues" size="small">
      <div class="searchWrap" :class="{ onlyTwoSearchItem: searchItem1.length < 3 }">
        <template v-for="(item, i) in searchItem1">
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
            <tree-select
              v-if="item.type === 'selectTree'"
              ref="selectTree"
              clearable
              collapseTags
              :checkStrictly="item.checkStrictly"
              :searchItemKey="item.key"
              :multiple="item.treeMultiple"
              width="100%"
              :height="item.treeHeight || 400"
              :data="item.data"
              :defaultProps="item.defaultProps"
              nodeKey="id" :defaultCheckedKeys="item.treeDefaultCheckedValue"
              @popoverHide="popoverHide"
            />
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
        <el-button type="primary" icon="el-icon-search" @click.native.prevent="handleSearch()">查询</el-button>
        <el-button class="el-delete" type="primary" icon="el-icon-delete" @click.native.prevent="handleClear()" v-if="showReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import treeSelect from '@/components/modules/tree-select'
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
    // 搜索默认值
    searchDefaultObj: Object
  },
  data () {
    return {
      dateObj: {}, // 存储选择的日期范围
      defaultShowNumber: 6, // 默认展示的搜索条数
      showAll: false
    }
  },
  computed: {
    searchItem1 () {
      if (this.showAll) {
        return this.searchItem
      } else {
        return this.searchItem.slice(0, this.defaultShowNumber)
      }
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
    this.initSearchValues('start')
  },
  methods: {
    // 初始化searchValues
    initSearchValues (type) {
      if (type === 'start') {
        let temp = JSON.parse(sessionStorage.getItem('activedSearchValues'))
        if (temp && temp.searchValues) {
          Object.keys(temp.searchValues).forEach(key => {
            this.$set(this.searchValues, key, temp.searchValues[key])
          })
        }
        return
      }
      if (type === 'end') {
        sessionStorage.removeItem('activedSearchValues')
      }
      this.searchItem.forEach(item => {
        if (Array.isArray(item.key)) {
          item.key.forEach(item1 => {
            this.$set(this.searchValues, item1, undefined)
          })
        } else {
          this.$set(this.searchValues, [item.key], undefined)
        }
      })
      Object.prototype.toString.call(this.searchDefaultObj) === '[object Object]' &&
        Object.assign(this.searchValues, this.searchDefaultObj)
    },
    // 清空搜索数据
    handleClear () {
      this.initSearchValues('end')
      this.$refs.selectTree && (this.$refs.selectTree[0].clearHandle())
      this.searchItem.forEach(item => {
        if (Array.isArray(item.key)) {
          this.$set(this.dateObj, item.key.join(), [undefined, undefined])
        }
      })
    },
    // 监听输入框数据变化
    handleChange (fn) {
      if (fn) {
        if (!this.parent) {
          let i = 0
          parent = this.$parent
          while (!parent[fn]) {
            parent = parent.$parent
            i++
            if (i === 5) break
          }
        this.parent = parent
        }
        this.parent[fn]()
      }
    },
    // 是否展示全部
    handleShowAll () {
      this.$parent.showAll = true
      this.showAll = true
    },
    // 搜索
    handleSearch () {
      for (let key in this.dateObj) {
        key.split(',').forEach((item, i) => {
          this.dateObj[key][i] && (this.searchValues[item] = this.$format(this.dateObj[key][i]))
        })
      }
      Object.keys(this.searchValues).forEach(key => {
        this.searchValues[key] === '' && (this.searchValues[key] = undefined)
      })
      console.log(this.searchValues)
      this.$emit('handleSearch', this.searchValues)
    },
    // 拿到选择树的值
    popoverHide (checkedIds, checkedData, searchItemKey) {
      this.$set(this.searchValues, searchItemKey, checkedIds)
      this.$emit('handleSelectTreeValue', checkedData)
    }
  },
  components: {
    treeSelect
  }
}
</script>

<style lang="less">
  .searchContent{
    .el-button--mini, .el-button--small{
      font-size: 14px;
    }
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
    padding: 20px 15px 25px;
    background: #fff;
    h3{
      font-size: 16px;
      margin-bottom: 25px;
      span{
        cursor: pointer;
        font-size: 14px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
    .searchWrap{
      display: flex;
      flex-wrap: wrap;
      &.onlyTwoSearchItem{
        .el-form-item__label{
          min-width: 0 !important;
        }
      }
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
      margin-top: 10px;
    }
  }
</style>
