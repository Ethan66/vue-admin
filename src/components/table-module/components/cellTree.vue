<template>
  <el-table-column
    :min-width="item.width"
    :prop="item.prop"
    :label="item.label"
    :fixed="item.fixed"
    header-align="left">
    <template slot-scope="scope">
      <span class="menuNameWrap"
        @click.prevent="handleToggle(scope.$index, scope.row)"
        :style="handleStyle(scope.row)"
      >
        <i :class="iconClass(scope.row)"></i>{{scope.row[item.prop]}}
      </span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'cell-tree',
  props: {
    item: Object,
    tableData: Array,
    treeInitLevel: {
      type: Number,
      default: 0
    },
    tableTreeOpenNum: Object,
    getTreeDataByPost: Boolean
  },
  methods: {
    // 树状样式箭头clsName
    iconClass (row) {
      let res = []
      if (row.list) {
        res.push('arrow')
      }
      row.expand ? res.push('arrowDown') : res.push('arrowRight')
      return res
    },
    // 设置树状样式
    handleStyle (row) {
      return {'padding-left': (row.level - this.treeInitLevel) * 25 + 'px'}
    },
    // 打开（关闭）树结构
    handleToggle (index, row) {
      if (this.getTreeDataByPost) {
        this.$emit('clickGetTreeData', row, index)
        return
      }
      if (!row.list) return false
      let tableData = JSON.parse(JSON.stringify(this.tableData))
      if (!row.expand) { // 未展开
        if (row.list) {
          tableData = tableData.splice(0, index + 1).concat(row.list).concat(tableData)
        }
      } else { // 展开
        tableData = tableData.splice(0, index + 1).concat(tableData.slice(row.list.length))
      }
      this.tableTreeOpenNum[row.id] = tableData[index].expand = !tableData[index].expand
      this.$emit('handAddTableData', tableData)
    },
  }
}
</script>

<style lang="less">
.tableModule{
  .menuNameWrap{
    padding: 0 10px;
    .arrow{
      display: inline-block; width: 14px; height:12px;
      position: relative;
      &:before{
        display: inline-block; content: ''; width: 0; height: 0;
        border: 5px solid transparent; border-left-color: #b2b2b2;
        position: absolute; left: 0; top: 2px;
      }
      &.arrowDown:before{
        transform: rotate(90deg);
        left: -2px; top: 4px;
      }
      &.arrowRight:before{
        border-left-color: #b2b2b2;
      }
    }
  }
}
</style>
