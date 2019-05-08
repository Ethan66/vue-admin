<template>
  <div class="inlineEditTable tableModule">
    <el-table :data="tableData" border style="width: 100%;"
              stripe
              :max-height="tableHeight"
              v-loading="tableLoading"
              @sort-change="handleSort"
              @selection-change="handleSelectChange">
      <template v-for="(item, i) in tableItem">
        <el-table-column
          v-if="item.type==='selection' && item.show"
          :key="`selection${i}`"
          :width="item.width"
          type="selection"
          align="center"
        />
        <el-table-column
          v-if="item.type!=='btn'&&item.type!=='selection'"
          :key="`content${i}`"
          :align="item.align || 'center'"
          :sortable="item.sortStatus || false"
          :show-overflow-tooltip="item.overflow || true"
          :label="item.label"
          :min-width="item.width"
          header-align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.editStatus && item.isEdit">
              <el-input v-model="scope.row[item.prop]" class="edit-input" size="small" />
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type==='btn'"
          :key="`btn${i}`"
          :width="item.width"
          :label="item.label || '操作'"
          :fixed="item.fixed || 'right'"
          header-align="center"
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
                  @click="handleBtnClick(child.clickFn, scope.row, scope.$index, child.name)"></i>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="right">
      <el-pagination v-if="tablePages.current"
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
  </div>
</template>

<script>
export default {
  name: 'inlineEditTable',
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
    tablePages: {
      type: Object,
      default () {
        return {}
      }
    },
    sortFn: {
      type: String
    },
    partShowBtn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableHeight: 10000,
      rowOrignData: null
    }
  },
  created () {
    this.$setItem(this.tableItem, 'table')
  },
  mounted () {
    this.handleSetTableHeight()
    window.onresize = () => {
      this.handleSetTableHeight()
    }
  },
  computed: {
    tableLoading () {
      let parent = this.$parent
      let i = 0
      while (!typeof parent.tableLoading === 'undefined') {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      return parent.tableLoading
    }
  },
  methods: {
    // 设置table的max-height
    handleSetTableHeight () {
      this.tableHeight = document.querySelector('#app .sidebar-container').clientHeight - 195
      if (document.querySelector('.searchContent')) {
        this.tableHeight -= document.querySelector('.searchContent').clientHeight
      }
      if (document.querySelector('.centerMargin')) {
        this.tableHeight -= document.querySelector('.centerMargin').clientHeight
      }
    },
    // 获取按钮名称
    handleGetBtnName (row, item) {
      return (item.name === '编辑' && row.editBtnName) || item.name
    },
    // 点击按钮触发
    handleBtnClick (fn, row, index, btnName) {
      if (!fn && btnName !== '取消') return
      let i = 0
      let parent = this.$parent
      while (!parent[fn]) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      if (btnName === '删除') {
        this.$alert('是否确认删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              parent[fn](row)
            }
          }
        })
      } else if (btnName === '编辑' && !row.editBtnName) {
        this.rowOrignData = JSON.parse(JSON.stringify(row))
        row.editStatus = true
        row.editBtnName = '保存'
        row.editBtnColor = 'success'
        this.$set(this.tableData, index, row)
        this.$nextTick(() => {
          document.querySelector('.inlineEditTable .edit-input input').focus()
        })
      } else if (btnName === '编辑' && row.editBtnName === '保存') {
        row.editStatus = false
        row.editBtnName = undefined
        row.editBtnColor = undefined
        this.$set(this.tableData, index, row)
        parent[fn](row)
      } else if (btnName === '取消') {
        if (!row.editStatus) return
        row.editStatus = false
        this.tableItem.forEach(item => {
          if (item.isEdit) {
            row[item.prop] = this.rowOrignData[item.prop]
          }
        })
        row.editBtnName = row.editBtnColor = undefined
        this.$set(this.tableData, index, row)
        fn && parent[fn](row)
      } else {
        parent[fn](row)
      }
    },
    // 监听排序
    handleSort (column, prop, order) {
      let i = 0
      let parent = this.$parent
      while (!parent[this.sortFn]) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      parent[this.sortFn](column, prop, order)
    },
    // 事件：选中一条数据后保存选中状态按钮
    handleSelectChange (val) {
      let i = 0
      let parent = this.$parent
      while (!parent[this.sortFn]) {
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
    },
    // 事件：page改变
    handleCurrentChange (val) {
      this.$emit('table-jump', val)
      this.tablePages.current = val
    }
  }
}
</script>

<style lang="less">
  .inlineEditTable{
    .el-table td{
      padding: 10px 0;
    }
    .right{
      position: relative; height: 25px; margin: 20px 0;
      .el-pagination{
        position: absolute; right: 0;
      }
    }
  }
</style>
