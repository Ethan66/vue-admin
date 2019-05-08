<template>
  <div class="table-btn">
    <template v-if="!isInlineEdit">
      <el-tooltip
        v-if="btn.show || (row.showBtn && row.showBtn.includes(btn.name))"
        :disabled="btn.disabled || (row.disabledBtn && row.disabledBtn.includes(btn.name))"
        effect="dark"
        :content="btn.name"
        placement="top-start">
        <i
          :class="'el-icon el-icon-' + btn.icon"
          @click="handleBtnClick(btn.clickFn, row, index, btn.name)"></i>
      </el-tooltip>
    </template>
    <template v-if="isInlineEdit">
      <el-tooltip
        v-if="btn.show || (row.showBtn && row.showBtn.includes(btn.name))"
        :disabled="btn.disabled || (row.disabledBtn && row.disabledBtn.includes(btn.name))"
        effect="dark"
        :content="handleSetInlineShowName(btn, row)"
        placement="top-start">
        <i
          :class="'el-icon el-icon-' + btn.icon"
          @click="handleBtnClick(btn.clickFn, row, index, btn.name)"></i>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    btn: Object,
    row: Object,
    index: Number,
    isInlineEdit: Boolean,
    tableItem: Array,
    rowOrignData: Array
  },
  data () {
    return {
      firstInit: true,
      parent: ''
    }
  },
  methods: {
    handleSetInlineShowName (btn, row) {
      return btn.name === '编辑' && row.editBtnName ? row.editBtnName : btn.name
    },
    // 点击按钮触发
    handleBtnClick (fn, row, index, btnName) {
      // 判断父组件
      if (this.firstInit) {
        let i = 0
        let parent = this.$parent
        while (!parent[fn]) {
          parent = parent.$parent
          i++
          if (i === 5) break
        }
        this.parent = parent
        this.firstInit = false
      }
      if ((!this.isInlineEdit && !fn) || (this.isInlineEdit && !fn && btnName !== '取消')) return
      if (btnName === '删除') {
        this.$alert('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              this.parent[fn](row)
            }
          }
        })
      } else if (!this.isInlineEdit) { // 非行内编辑
        this.parent[fn](row)
      } else if (this.isInlineEdit) { // 行内编辑
        if (btnName === '编辑' && !row.editBtnName) { // 点击编辑按钮
          this.rowOrignData[index] = JSON.parse(JSON.stringify(row))
          row.editStatus = true
          row.editBtnName = '保存'
          row.editBtnColor = 'success'
          this.$emit('handleInlineEditTableData', index, row)
        } else if (btnName === '编辑' && row.editBtnName === '保存') { // 点击保存按钮
          row.editStatus = false
          row.editBtnName = undefined
          row.editBtnColor = undefined
          this.$emit('handleInlineEditTableData', index, row)
          this.parent[fn](row)
        } else if (btnName === '取消') { // 点击取消
          if (!row.editStatus) return
          row.editStatus = false
          this.tableItem.forEach(item => {
            if (item.isEdit) {
              row[item.prop] = this.rowOrignData[index][item.prop]
            }
          })
          row.editBtnName = row.editBtnColor = undefined
          this.$emit('handleInlineEditTableData', index, row)
          fn && this.parent[fn](row)
        } else {
          this.parent[fn](row)
        }
      }
    }
  }
}
</script>

<style lang="less">
  .table-btn{
    display: inline-block;
    & + .table-btn{
      margin-left: 12px;
    }
  }
</style>
