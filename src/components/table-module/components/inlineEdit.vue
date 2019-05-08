<template>
  <el-input v-model="row[prop]" class="edit-input" size="small" />
</template>

<script>
export default {
  name: 'inline-edit',
  props: {
    row: Object,
    prop: String
  },
  mounted () {
    document.querySelector('.tableModule .edit-input input').focus()
  }
}
</script>

<style lang="less">
  .inline-edit-table{
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
