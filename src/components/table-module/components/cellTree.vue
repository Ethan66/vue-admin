<template>
  <el-table-column
    :min-width="item.width"
    :prop="item.prop"
    :label="item.label"
    :fixed="item.fixed"
    header-align="center">
    <template slot-scope="scope">
      <span class="menuNameWrap"
        @click.prevent="handleToggle(scope.$index, scope.row)"
        :style="handleStyle(scope.row)"
      >
        <i :class="iconClass(scope.row)"></i>{{scope.row.menuName}}
      </span>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'cell-tree',
  props: {
    item: Object,
    tableData: Array
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
      return {'padding-left': row.level * 25 + 'px'}
    },
    // 打开（关闭）树结构
    handleToggle (index, row) {
      if (!row.list) return false
      let tableData = JSON.parse(JSON.stringify(this.tableData))
      if (!row.expand) { // 未展开
        if (row.list) {
          tableData = tableData.splice(0, index + 1).concat(row.list).concat(tableData)
        }
      } else { // 展开
        tableData = tableData.splice(0, index + 1).concat(tableData.slice(row.list.length))
      }
      tableData[index].expand = !tableData[index].expand
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
      display: inline-block; width: 12px; height:12px;
      position: relative;
      &:before{
        display: inline-block; content: ''; width: 0; height: 0;
        border: 4.5px solid transparent; border-left-color: #333;
        position: absolute; left: 2px; top: 3px;
      }
      &.arrowDown:before{
        transform: rotate(90deg);
        left: 0; top: 4px;
      }
      &.arrowRight:before{
        border-left-color: #333;
      }
    }
  }
}
</style>
