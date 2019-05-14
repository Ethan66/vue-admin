<template>
  <div class="tableModule">
    <!-- 头部按钮 -->
    <slot name="btn"></slot>
    <el-table
      :data="tableData"
      :max-height="tableHeight"
      v-loading="tableLoading"
      :header-cell-class-name="handleSetCellClass"
      :cell-class-name="handleSetCellClass"
      border
      stripe
      style="width: 100%;"
      class="table"
      @sort-change="handleSort"
      @selection-change="handleSelectChange"
    >
      <template v-for="(item, i) in tableItem">
        <el-table-column
          v-if="item.type==='selection' && item.show"
          :key="`selection${i}`"
          :width="item.width"
          :selectable="handleSelect"
          align="center"
          type="selection"
          :fixed="item.fixed"
        />
        <el-table-column
          v-if="item.type === 'cell' || item.type === 'input'"
          :key="`content${i}`"
          :min-width="item.width"
          :sortable="item.sortStatus || false"
          :show-overflow-tooltip="item.overflow || true"
          :label="item.label"
          :align="item.align || 'left'"
          :fixed="item.fixed"
        >
        <template slot-scope="scope">
          <inline-edit
            v-if="item.type === 'input' && scope.row.editStatus"
            :row="scope.row"
            :prop="item.prop"
          />
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
        </el-table-column>
        <cell-tree
          v-if="item.type==='tree'"
          :key="`tree${i}`"
          :item="item"
          :tableData="tableData"
          @handAddTableData="handAddTableData"
        >
        </cell-tree>
        <table-btn
          v-if="item.type==='btn'"
          :key="`btn${i}`"
          :item="item"
          :i="i"
          :tableBtn="tableBtn"
          :isInlineEdit="isInlineEdit"
          :tableItem="tableItem"
          :rowOrignData="rowOrignData"
          @handleInlineEditTableData="handleInlineEditTableData"
        />
        <el-table-column
          v-if="item.type==='setting'"
          :key="`selection${i}`"
          width="30"
          align="center"
          fixed="right"
          filter-placement="bottom-end"
        >
      </el-table-column>
      </template>
    </el-table>
    <!-- 底部统计数据 -->
    <slot name="total"></slot>
    <!-- 页码 -->
    <div
      class="right"
      v-if="tablePages.current"
    >
      <el-pagination
        :current-page="tablePages.current"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="tablePages.pageSize"
        :total="tablePages.total"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 自定义表头 -->
    <user-define-head-list
      v-if="showTableHeadSetting"
      :totalSetHeadList="totalSetHeadList"
      :choosedHeadList="choosedHeadList"
      @handleSendHead="handleSendHead"
    />
  </div>
</template>

<script>
import userDefineHeadList from './components/userDefineHeadList' // 自定义表头设置模块
import tableBtn from './components/tableBtn' // 按钮模块
import inlineEdit from './components/inlineEdit' // 行内编辑
import cellTree from './components/cellTree'
import { getTableHeight, getCellClass, setHeadIcon, setInitTableStyle } from './config/method'
import { setTimeout, clearTimeout } from 'timers';
import { debuglog } from 'util';
export default {
  name: 'tableModule',
  components: { userDefineHeadList, tableBtn, inlineEdit, cellTree },
  props: {
    // 全部的自定义表头
    totalSetHeadList: Array,
    // 已勾选的自定义表头
    choosedHeadList: Array,
    // 已经处理过的表格数据
    tableData: {
      type: Array,
      required: true
    },
    // 初始化表头映射关系
    tableItem: {
      type: Array,
      required: true
    },
    // 是否为行内编辑
    isInlineEdit: Boolean,
    // 默认总高度为菜单高度
    totalHeightClsName: {
      type: String,
      default: '.layout-index'
    },
    // 需要减掉的高度
    reduceHeightClsNameList: Array,
    // 按钮
    tableBtn: Array,
    // 分页
    tablePages: {
      type: Object,
      default () {
        return {}
      }
    },
    // 排序方法
    sortFn: String,
    partShowBtn: Boolean,
    // 判断哪几行需要勾选
    selectableFn: Function
  },
  data () {
    return {
      tableHeight: 10000,
      rowOrignData: [], // 行内编辑编辑时保存的原始数据
      parent: ''
    }
  },
  computed: {
    // 表头过滤tableItem
    newTableItem () {
      return this.tableItem
    },
    // 是否展示自定义表头
    showTableHeadSetting () {
      if (this.tableItem.findIndex(item => item.type === 'setting') > -1) {
        return true
      }
      return false
    },
    tableLoading () {
      let parent = this.$parent
      let i = 0
      while (!typeof parent.tableLoading === 'undefined') {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      this.parent = parent
      return parent.tableLoading
    }
  },
  watch: {
    tableLoading (val) {
      if (!val) {
        setInitTableStyle()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.showTableHeadSetting && setHeadIcon()
      let timer = setTimeout(() => {
        this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
        clearTimeout(timer)
      }, 100)
    })
    window.onresize = () => {
      setInitTableStyle()
      this.showTableHeadSetting && setHeadIcon()
      this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
    }
  },
  methods: {
    // 发送自定义表头
    handleSendHead (val) {
      this.$emit('handleSendHead', val)
    },
    // 自定义设置列样式
    handleSetCellClass (row) {
      return getCellClass(row, this.newTableItem)
    },
    // 监听排序
    handleSort (column, prop, order) {
      if (!this.sortFn) return
      this.parent[this.sortFn](column, prop, order)
    },
    // 判断此行是否要勾选
    handleSelect (row, index) {
      if (this.selectableFn) {
        if (this.selectableFn(row, index)) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    // 行内编辑点击编辑按钮时修改tableData
    handleInlineEditTableData (index, row) {
      this.$set(this.tableData, index, row)
    },
    // 树表格修改tableData
    handAddTableData (tableData) {
      this.$emit('update:tableData', tableData)
    },
    // 事件：选中一条数据后保存选中状态按钮
    handleSelectChange (val) {
      let i = 0
      let parent = this.$parent
      while (!parent.chooseDataArr) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      parent.chooseDataArr = val
    },
    // 事件：每页几条
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.tablePages.pageSize = val
      this.handleCurrentChange(this.tablePages.current)
    },
    // 事件：page改变
    handleCurrentChange (val) {
      this.$emit('table-jump', val)
      this.tablePages.current = val
    }
  }
}
</script>
