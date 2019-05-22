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
          v-if="item.type==='selection' && item.show !== false"
          :key="`selection${i}`"
          :width="item.width"
          :selectable="handleSelect"
          align="center"
          type="selection"
          :fixed="item.fixed"
        />
        <el-table-column
          v-if="['cell', 'input', 'select'].includes(item.type)"
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
            v-if="scope.row.editStatus && ['input', 'select'].includes(item.type)"
            :item="item"
            :type="item.type"
            :row="scope.row"
            :prop="item.prop"
          />
          <span
            v-else
            :class="[handleSetStatusClsName(item.clsName || '', scope.row[item.prop]), { canClick: item.clickFn !== undefined }]"
            @click="handleCellClick(item.clickFn, scope.row)"
          >
            <i :class="handleSetStatusClsName(item.clsName || '', scope.row[item.prop], 'i')"></i>
            {{ scope.row[item.prop] }}
          </span>
        </template>
        </el-table-column>
        <cell-tree
          v-if="item.type==='tree'"
          :key="`tree${i}`"
          :item="item"
          :tableData="tableData"
          :tableTreeOpenNum="tableTreeOpenNum"
          @handAddTableData="handAddTableData"
        >
        </cell-tree>
        <table-btn
          v-if="item.type==='btn' && item.show !== false"
          :key="`btn${i}`"
          :item="item"
          :i="i"
          :tableBtn="tableBtn"
          :isInlineEdit="isInlineEdit"
          :inlineEditBtnClick="inlineEditBtnClick"
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
import cellTree from './components/cellTree' // 表格树
import statusClsName from './config/defaultStatusClsName'
import { getTableHeight, getCellClass, setHeadIcon, setInitTableStyle } from './config/method'
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
    // 表格树保存打开状态
    tableTreeOpenNum: Object,
    // 初始化表头映射关系
    tableItem: {
      type: Array,
      required: true
    },
    // 自定义最大高度
    maxHeight: String,
    // 是否为行内编辑
    isInlineEdit: Boolean,
    inlineEditBtnClick: String,
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
       if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      let timer = setTimeout(() => {
        this.handleSetTableHeight()
        clearTimeout(timer)
      }, 100)
    })
    window.onresize = () => {
      setInitTableStyle()
      if (this.maxHeight) {
        this.tableHeight = this.maxHeight
        return false
      }
      this.showTableHeadSetting && setHeadIcon()
      this.handleSetTableHeight()
    }
  },
  methods: {
    // 设置表格高度
    handleSetTableHeight () {
      this.tableHeight = getTableHeight(this.totalHeightClsName, this.reduceHeightClsNameList)
    },
    // 设置状态clsName
    handleSetStatusClsName (type, value, i) {
      if (type) {
        if (i && statusClsName[type]) {
          return ['status-i', type, statusClsName[type][value]]
        } else if (statusClsName[type]) {
          return ['status', type, value]
        }
        return [type, value]
      }
    },
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
      this.parent.chooseDataArr = val
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
    },
    handleCellClick (fn, row) {
      this.parent[fn] && this.parent[fn](row)
    }
  }
}
</script>
