<template>
  <div class="inline-edit">
    <template v-if="type === 'input'">
      <el-input v-model="row[prop]" class="edit-input" size="small" />
    </template>
    <template v-if="['select', 'selectMore'].includes(type)">
      <el-select
                v-model="row[prop]"
                :placeholder="row.placeholder"
                :filterable="type === 'select'"
                :multiple="type === 'selectMore'"
                @change="handleChange(row.changeFn, row[prop])"
    >
      <el-option v-for="(child, k) in item.options" :label="child.label" :value="child.value" :key="k"></el-option>
    </el-select>
    </template>
  </div>
</template>

<script>
export default {
  name: 'inline-edit',
  props: {
    type: {
      type: String,
      validator: function (val) {
        return ['input', 'select', 'selectMore'].includes(val)
      }
    },
    item: Object,
    row: Object,
    prop: String
  },
  data () {
    return {
      inputWidth: ['35', '47', '61', '74', '88', '100'],
      selectWidth: ['51']
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleInitInputWidth(this.$el)
    })
  },
  methods: {
    // 初始化计算input宽度
    handleInitInputWidth (parent) {
      let input = this.type === 'input' ? parent.children[0].children[0] : parent.children[0].children[0].children[0]
      let length = input.value.length
      let width = this.type === 'input' ? this.inputWidth : this.selectWidth
      if (length === 0) {
        input.style.width = '100%'
      } else {
        input.style.width = `${width[length - 1]}px`
      }
    },
    handleChange () {
    }
  }
}
</script>

<style lang="less">
  .inline-edit{
    .el-input--small .el-input__inner{
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      text-align: center;
    }
    .el-input--suffix{
      .el-input__inner{
        padding: 0 25px 0 10px;
        height: 28px;
        line-height: 28px;
      }
      .el-input__icon{
        line-height: 28px;
      }
    }
  }
</style>
