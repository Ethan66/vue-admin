<template>
  <el-dialog :title="dialogTitle" :visible.sync="showDialogForm1" class="dialogModule" :close-on-click-modal="false">
    <el-form :model="editData" :rules="rules" ref="editData">
      <el-row v-for="(item, i) in dialogItem" :key="i" :class="handleClass(item.span)">
        <el-col :class="item.clsName || ''">
          <el-form-item :label="item.label" :prop="item.key">
            <el-select v-model="editData[item.key]"
                       :placeholder="item.placeholder || ''"
                       filterable
                       @change="handleChange(item.changeFn, editData[item.key])"
                       :disabled="item.disabled || allRead"
                       v-if="item.type==='select'">
              <el-option v-for="(child, k) in item.options" :label="child.label" :value="child.value" :key="k"></el-option>
            </el-select>
            <el-select v-model="editData[item.key]"
                       :placeholder="item.placeholder || ''"
                       multiple
                       @change="handleChange(item.changeFn, editData[item.key])"
                       :disabled="item.disabled || allRead"
                       v-if="item.type==='selectMore'">
              <el-option v-for="(child, k) in item.options" :label="child.label" :value="child.value" :key="k"></el-option>
            </el-select>
            <el-input v-model="editData[item.key]"
                      :placeholder="item.placeholder || ''"
                      :disabled="item.disabled || allRead"
                      @input="handleChange(item.changeFn, editData[item.key])"
                      v-if="item.type==='input' || !item.type">
            </el-input>
            <el-input v-model="editData[item.key]"
                      :placeholder="item.placeholder || ''"
                      :disabled="item.disabled || allRead"
                      @blur="handleJudgeNum(item.key, editData[item.key])"
                      type="number"
                      v-if="item.type==='number'">
            </el-input>
            <el-input v-model="editData[item.key]" type="password"
                      :placeholder="item.placeholder || ''"
                      :disabled="item.disabled || allRead"
                      @change="handleChange(item.changeFn, editData[item.key])"
                      v-if="item.type==='password'">
            </el-input>
            <el-input v-model="editData[item.key]" type="textarea"
                      :placeholder="item.placeholder || ''"
                      :disabled="item.disabled || allRead"
                      :rows="item.rows"
                      :maxlength="item.maxlength"
                      @change="handleChange(item.changeFn, editData[item.key])"
                      v-if="item.type==='textarea'">
            </el-input>
            <el-radio-group v-model="editData[item.key]" v-if="item.type==='radio'" :disabled="item.disabled || allRead" size="small">
              <el-radio v-for="(child, k) in item.options" @change="handleChange(item.changeFn, editData[item.key])" :label="child.label" :key="k" border>{{child.label}}</el-radio>
            </el-radio-group>
            <el-date-picker type="datetime" :placeholder="item.placeholder || ''" style="width: 100%;"
                            format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="editData[item.key]"
                            @change="handleChange(item.changeFn, editData[item.key])"
                            :clearable="false"
                            v-if="item.type==='date'">
            </el-date-picker>
            <my-switch v-model="editData[item.key]" v-if="item.type==='switch'">
            </my-switch>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <template v-for="(item, i) in dialogBtn">
      <el-button :key="i"
                 v-if="item.show"
                 :type="item.color"
                 :disabled="item.disabled"
                 @click="handleFn(item.type, item.clickFn || '')">{{item.name}}</el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
import mySwitch from '@/components/modules/switch'
export default {
  name: 'dialogModule',
  components: {mySwitch},
  props: {
    dialogTitle: {
      type: String,
      required: true
    },
    dialogItem: {
      type: Array,
      required: true
    },
    editData: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    },
    showDialogForm: {
      type: Boolean,
      default: false
    },
    dialogBtn: {
      type: Array
    },
    allRead: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showDialogForm1: false,
      oldEditData: null
    }
  },
  watch: {
    showDialogForm (val) {
      if (val === true) {
        this.showDialogForm1 = true
        this.handleInieEditData()
        this.oldEditData = JSON.parse(JSON.stringify(this.editData))
      }
    },
    showDialogForm1 (val) {
      if (val === false) {
        this.$nextTick(() => {
          this.$refs.editData.resetFields()
        })
        this.$emit('update:showDialogForm', false)
      }
    }
  },
  created () {
    // this.$setItem(this.dialogItem, 'dialog')
  },
  methods: {
    handleClass (span = 12) {
      return ['width', `width${span}`]
    },
    // 对editData多选项进行初始化操作
    handleInieEditData () {
      // 找出多选的选项，转化为数组
      this.dialogItem.forEach(item => {
        if (item.type === 'selectMore') {
          let parent = this.$parent
          let i = 0
          while (!typeof parent.isEdit === 'number') {
            parent = parent.$parent
            i++
            if (i === 5) break
          }
          if (parent.isEdit === 0) {
            this.editData[item.key] = []
          } else if (parent.isEdit === 1) {
            if (this.editData[item.key] === '') {
              this.editData[item.key] = []
            } else {
              this.editData[item.key] = this.editData[item.key].split(',')
            }
          }
        }
      })
    },
    // 点击按钮事件
    handleFn (type, clickFn = '') {
      let parent = this.$parent
      let i = 0
      while (!parent[clickFn]) {
        parent = parent.$parent
        i++
        if (i === 5) break
      }
      if (type === 'delete') {
        if (clickFn === '') {
          this.showDialogForm1 = false
          return true
        } else {
          parent[clickFn]()
          return true
        }
      } else if (type === 'edit') {
        if (this.allRead) {
          this.showDialogForm1 = false
          return false
        }
        if (this.handleConfirmEdit('editData') === false) return false
        if (clickFn === '') {
          this.showDialogForm1 = false
          parent.apiCreateData(this.editData)
          return true
        }
        parent[clickFn]()
      }
    },
    // 失去焦点判断输入框的值
    handleJudgeNum (key, num) {
      if (parseInt(num) >= 0) {
        return true
      } else {
        this.$notify({
          message: '金额不得小于0',
          type: 'error'
        })
        this.editData.actualPaymentAmount = ''
        return false
      }
    },
    handleChange (fn, val) {
      if (fn) {
        let parent = this.$parent
        let i = 0
        while (!parent[fn]) {
          parent = parent.$parent
          i++
          if (i === 5) break
        }
        parent[fn](val)
      }
    },
    // 点击确认时校验
    handleConfirmEdit (formName) {
      if (JSON.stringify(this.oldEditData) === JSON.stringify(this.editData)) {
        this.$message.error('您未修改或添加任何数据')
        return false
      }
      // 校验规则
      let result
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          result = false
          return false
        }
        result = true
      })
      if (result === false) return false
      return true
    }
  }
}
</script>

<style lang="less">
  .dialogModule {
    .el-dialog{
      min-width: 700px;
      border-radius: 4px;
      .el-dialog__header{
        padding: 15px 15px 10px;
        border-bottom: 1px solid #e8e8e8;
        .el-dialog__title{
          font-size: 16px;
          font-weight: bold;
        }
      }
      .el-dialog__body{
        padding: 28px 30px 0;
        .el-form{
          min-width: 570px;
          .el-form-item{
            margin-bottom: 30px;
          }
        }
        .el-form-item__label {
          width: 100px;
          line-height: 30px;
          font-weight: normal;
          color: #1c1c1c;
        }
        .el-form-item__content {
          margin-left: 100px;
          line-height: 30px;
          .el-input__inner{
            height: 30px;
            border-color: #e8e8e8;
            line-height: 30px;
          }
          .el-input__icon{
            line-height: 30px;
          }
        }
      }
       .el-dialog__footer{
        height: 60px;
        padding: 14px 15px;
        border-top: 1px solid #e8e8e8;
        .el-button{
          width: 60px;
          height: 32px;
          padding: 0;
          line-height: 32px;
        }
      }
    }
    .el-radio--small.is-bordered{
      padding: 11px 15px 0 10px;
      height: 40px;
    }
    .el-button{
      padding: 10px 20px;
    }
    .width{
      display: inline-block;
      vertical-align: middle;
      .el-col{
        width: 100%;
      }
    }
    .width12{
      width: 50%;
    }
    .width24{
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .longText {
      .el-form-item__content{
        margin-left: 140px;
      }
      label {
        width: 140px;
      }
    }
  }
</style>
