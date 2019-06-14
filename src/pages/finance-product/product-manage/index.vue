<template>
  <div class="product-manage substance">
    <header>
      <h2>金融产品</h2>
      <button
        v-if="$authBtn('product-manage-create')"
        class="cm-color"
        @click="handleCreateData"
      >{{ $authBtn('product-manage-create') }}</button>
    </header>
    <ul class="productList">
      <li v-for="(item, i) in productList" :key="i">
        <div class="header cm-bg-color">
          <h3>{{ item.name }}</h3>
          <p class="btn">
            <button
              v-if="$authBtn('product-manage-edit')"
              @click="handleEditData(item)"
            >{{ $authBtn('product-manage-edit') }}</button>
            <button
              v-if="$authBtn('product-manage-delete')"
              @click="handleDeleteData(item)"
            >{{ $authBtn('product-manage-delete') }}</button>
          </p>
        </div>
        <div class="info">
          <div class="yesterday">
            <div class="lend">
              <p>{{ item.lendingAmount }}万</p>
              <p class="title">昨日在贷(元)</p>
            </div>
            <div class="lend">
              <p>{{ item.lendAmount }}万</p>
              <p class="title">昨日放贷(元)</p>
            </div>
          </div>
          <div class="lend total">
            <p>{{ item.total }}万</p>
            <p class="title">昨日累计放贷</p>
          </div>
          <div class="shape">
            <p>启用的形态{{ item.num }}个</p>
            <button
              class="cm-color"
              v-if="$authBtn('product-manage-watch')"
              @click="handleGoShape(item)"
            >{{ $authBtn('product-manage-watch') }}></button>
          </div>
        </div>
      </li>
    </ul>
    <dialog-module
      ref="dialog"
      :dialog-title="dialogTitle"
      :showDialogForm.sync="showDialogForm"
      :edit-data="editData"
      :dialog-item="dialogItem"
      :dialog-btn="dialogBtn"
      :rules="rules"
    />
  </div>
</template>

<script>
import { productManage } from '../mixin'
import basicMethod from '@/config/mixins'

export default {
  mixins: [basicMethod, productManage],
  data () {
    return {
      productList: [
        { id: 1, name: '百凌白条', creater: '系统1', gmtCreate: '时间1', lendingAmount: 87.77, lendAmount: 1.65, total: 65.65, num: 6 },
        { id: 2, name: '百凌白条', creater: '系统2', gmtCreate: '时间2', lendingAmount: 345.77, lendAmount: 9.65, total: 12.65, num: 6 },
        { id: 3, name: '百凌白条', creater: '系统3', gmtCreate: '时间3', lendingAmount: 12.77, lendAmount: 76.65, total: 435.65, num: 6 },
        { id: 4, name: '百凌白条', creater: '系统4', gmtCreate: '时间4', lendingAmount: 54233.77, lendAmount: 1823.65, total: 113.65, num: 6 }
      ]
    }
  },
  methods: {
    // 新建产品
    handleCreateData () {
      this.editData = { name: '' }
      this.dialogItem[1].show = false
      this.dialogItem[2].show = false
      this.showDialogForm = true
    },
    // 编辑产品
    handleEditData (item) {
      this.dialogItem[1].show = true
      this.dialogItem[2].show = true
      this.editData = JSON.parse(JSON.stringify(item))
      this.showDialogForm = true
    },
    // 对话框点击确定
    handleSubmit () {
      console.log(this.editData)
    },
    // 删除产品
    handleDeleteData (item) {
      this.$confirm('确定删除该金融产品？删除后该金融产品下的所有形态也将被删除。', '温馨提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: action => {
          if (action === 'confirm') {
            console.log(item)
          }
        }
      })
    },
    // 去形态
    handleGoShape (item) {
      this.$router.push({
        path: '/finance-product/product-manage/shape-manage/index',
        query:{
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less">
  .product-manage{
    background: #fff;
    header{
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 15px;
      h2{
        font-size: 16px;
      }
      button{
        border: 1px solid;
        height: 30px;
        line-height: 30px;
        padding: 0 14px;
        border-radius: 2px;
        font-size: 12px;
      }
    }
    .productList{
      padding: 16px;
      display: flex;
      flex-wrap: wrap;
      li{
        margin: 0 33px 25px 0;
        width: 300px;
        min-width: 300px;
        height: 250px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.2);
        .header{
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 52px;
          color: #fff;
          h3{
            font-size: 16px;
          }
          .btn{
            button{
              font-size: 14px;
              color:#fff;
              &+button:before{
                display: inline-block;
                content: '|';
                padding: 0 8px;
              }
            }
          }
        }
        .lend{
          p:first-child{
            font-size: 22px;
            line-height: 16px;
            font-weight: bold;
          }
          .title{
            margin-top: 6px;
            color: #999;
            font-size: 12px;
            line-height: 16px;
          }
        }
        .yesterday{
          padding: 16px 16px 0;
          display: flex;
          justify-content: space-between;
        }
        .total{
          padding: 0 16px;
          margin-top: 30px;
        }
        .shape{
          padding: 0 16px;
          margin-top: 30px;
          border-top: 1px solid #e8e8e8;
          height: 46px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            font-size: 14px;
            color:#666;
          }
          button{
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
