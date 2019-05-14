<template>
  <div class="staff-admin">
    <el-row>
      <el-col span="4">
        <div class="tree-box">
          <h2>组织架构</h2>
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col span="20">
        <search-module
          class="searchContent"
          :search-item="searchItem"
          :search-values="searchValues"
          :search-default-obj="defaultSearchObj"
          @handleSearch="handleSearch"
        />
        <table-module
          :table-data="tableData"
          :table-item="tableItem"
          :table-btn="tableBtn"
          :table-pages="tablePages"
          @handleSendHead="handleSendHead"
          @table-jump="handleJump">
          <div class="btn-content" slot="btn">
            <span>已选择 <i>{{ chooseDataArr.length }}</i> 条</span>
            <el-button @click="handleAdd">新 增</el-button>
            <el-button @click="$router.push({ path: '/main/auth-config/menu/newpage' })">跳 转</el-button>
          </div>
          <div class="total-content" slot="total">
            <b>统计数据</b>
            <span>借款人数 517 人，借款本金 340,000.00 元，待还本金 140,000.00 元</span>
          </div>
        </table-module>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { staff } from '@/createData/auth-config/mixins'
import basicMethod from '@/config/mixins'
export default {
  mixins: [basicMethod, staff],
  data () {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="less">
  .staff-admin {
    .tree-box {
      background: #fff;
      margin-right: 10px;
      .el-tree {
        .el-tree-node {
          .el-tree-node__content {
            .el-icon-caret-right {
              color: #ccc;
            }
          }
        }
      }
    }
  }
</style>
