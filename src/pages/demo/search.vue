<template>
  <div>
  <search-module
      :search-item="searchItem"
      :search-values="searchValues"
      @handleSearch="handleSearch"
    ></search-module>
    <tree-select :height="400"
      :width="200"
      :data="data"
      :defaultProps="defaultProps"
      clearable
      multiple
      collapseTags
      :nodeKey="nodeKey"
      :defaultCheckedKeys="defaultCheckedKeys"
      @popoverHide="popoverHide">
    </tree-select>
  </div>
</template>

<script>
import { search } from './mixins'
import treeSelect from '@/components/modules/tree-select'
import basicMethod from '@/config/mixins'
export default {
  components: {treeSelect},
  data () {
    return {
      data: [{
          id: 1,
          name: '一级 1',
          noClick: true,
          children: [{
            id: 4,
            name: '二级 1-1',
            children: [{
              id: 9,
              name: '三级 1-1-1'
            }, {
              id: 10,
              name: '三级 1-1-2'
            }]
          }, {
            id: 20,
            name: '二级 1-2',
            children: [{
              id: 21,
              name: '三级 1-2-1'
            }, {
              id: 22,
              name: '三级 1-2-2'
            }]
          }]
        }, {
          id: 2,
          name: '一级 2',
          children: [{
            id: 5,
            name: '二级 2-1'
          }, {
            id: 6,
            name: '二级 2-2'
          }]
        }, {
          id: 3,
          name: '一级 3',
          children: [{
            id: 7,
            name: '二级 3-1'
          }, {
            id: 8,
            name: '二级 3-2'
          }]
        }],
      defaultProps: {
        label: 'name',
        children: 'children',
        disabled: 'noClick'
      },
      nodeKey: 'id',
      defaultCheckedKeys: [8]
    }
  },
  mixins: [basicMethod, search],
  methods: {
    handleChangeName () {
      console.log(11)
    },
    handleChangeStatus () {
      console.log(222)
    },
    popoverHide () {
      console.log(111, arguments)
    }
  }
}
</script>

<style lang="less">

</style>