<template>
  <div class="tableModule">
    <slot name="btn"></slot>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px;" class="tableTree"
              ref="menuTable"
              v-loading="tableLoading"
              @selection-change="handleSelectChange"
              @select="handleSelect">
      <template v-for="(item, i) in tableItem">
        <el-table-column
          v-if="item.type==='selection' && item.show"
          :key="`selection${i}`"
          :width="item.width"
          align="center"
          type="selection"
        />
        <el-table-column
          v-if="item.type==='tree'"
          :key="`tree${i}`"
          :min-width="item.width"
          :prop="item.prop"
          :label="item.label"
          header-align="center">
          <template slot-scope="scope">
          <span class="menuNameWrap" @click.prevent="handleToggle(scope.$index, scope.row)" :style="handleStyle(scope.row)">
            <i :class="iconClass(scope.row)"></i>{{scope.row.menuName}}
          </span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type!=='btn' && item.type!=='selection' && item.type!=='tree'"
          :key="`content${i}`"
          :min-width="item.width"
          :prop="item.prop"
          :label="item.label"
          align="center"
        />
        <el-table-column
          v-if="item.type==='btn'"
          :key="`btn${i}`"
          :label="item.label || '操作'"
          :width="item.width"
          :header-align="item.align || 'center'"
          :fixed="item.fixed || 'right'"
        >
         <template slot-scope="scope">
            <template v-for="(child, index) in tableBtn">
              <el-tooltip
                :key="i + index"
                v-if="child.show || (scope.row.showBtn && scope.row.showBtn.includes(child.name))"
                :disabled="child.disabled || (scope.row.disabledBtn && scope.row.disabledBtn.includes(child.name))"
                effect="dark"
                :content="child.name"
                placement="top-start">
                <i
                  :class="'el-icon el-icon-' + child.icon"
                  @click="handleBtnClick(child.clickFn, scope.row, child.name)"></i>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="total"></slot>
  </div>
</template>

<script>
export default {
  name: 'tableTree',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableItem: {
      type: Array,
      required: true
    },
    tableBtn: {
      type: Array,
      default () {
        return []
      }
    },
    handSelect: { // 是否要执行@select或@selection-change
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableLoading () {
      return this.$parent.$parent.tableLoading
    }
  },
  created () {
    this.$setItem(this.tableItem, 'table')
  },
  mounted () {
    this.$nextTick(() => {
      if (this.tableItem[0].type === 'selection' && this.tableItem[0].show) {
        const node = '.tableTree .el-table__header-wrapper thead tr th:first-child .cell'
        document.querySelector(node).style.display = 'none'
      }
    })
  },
  methods: {
    // 点击按钮触发
    handleBtnClick (fn, row, btnName) {
      if (btnName === '删除') {
        this.$alert('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              if (this.$parent.$parent[fn]) {
                this.$parent.$parent[fn](row)
              } else if (this.$parent) {
                this.$parent[fn](row)
              }
            }
          }
        })
      } else {
        if (this.$parent.$parent[fn]) {
          this.$parent.$parent[fn](row)
        } else if (this.$parent[fn]) {
          this.$parent[fn](row)
        }
      }
    },
    // 箭头clsName
    iconClass (row) {
      let res = []
      if (row.list) {
        res.push('arrow')
      }
      row.expand ? res.push('arrowDown') : res.push('arrowRight')
      return res
    },
    handleStyle (row) {
      return { 'padding-left': row.level * 25 + 'px' }
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
      this.$emit('update:tableData', tableData)
    },
    // 手动勾选（取消勾选）
    handleSelect (val, row) {
      if (row.list) { // 勾选父菜单时判断有无子菜单，并弹出子菜单
        const index = this.tableData.findIndex((item, index) => item.id === row.id)
        let checked = true
        // totalChooseIdArr包含row.id说明原先已选中
        if (this.$parent.$parent.totalChooseIdArr) {
          if (this.$parent.$parent.totalChooseIdArr.includes(row.id)) {
            checked = false
          }
        } else {
          if (this.$parent.totalChooseIdArr) {
            if (this.$parent.totalChooseIdArr.includes(row.id)) {
              checked = false
            }
          }
        }
        if (checked && !this.tableData[index].expand) { // 已勾选且未展开
          this.handleToggle(index, row)
        }
      }
      this.$emit('handleSelect', val, row)
    },
    // 事件：选中一条数据后保存选中状态按钮
    handleSelectChange (val) {
      if (!this.handSelect) {
        if (this.$parent.$parent.chooseDataArr) {
          this.$parent.$parent.chooseDataArr = val
        } else if (this.$parent.chooseDataArr) {
          this.$parent.chooseDataArr = val
        }
      }
    }
  }
}
</script>

<style lang="less">
  .tableTree{
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
