import { Component, Emit, Mixins } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import Rule from './rules'
import MD5 from 'js-md5'
import { apiRegister } from '@/api/login'

@Component
export default class Register extends Mixins(Rule) {
  passwordForm = { user: '', userName: '', password1: '', password2: '' }
  isLoading = false

  private submitForm(form) {
    ;(this.$refs[form] as ElForm).validate((valid) => {
      if (valid) {
        this.isLoading = true
        this.nowErrorCode = ''
        const params = {
          user: this.passwordForm.user,
          userName: this.passwordForm.userName,
          password: MD5(this.passwordForm.password1)
        }
        apiRegister(params)
          .then((res) => {
            if (res.code === '000000') {
              this.isLoading = false
              this.$message.success('注册成功')
              this.$emit('handleChangeComponent', 'login')
            } else {
              if (!this.handleSpeciaCode(res.code, 'register')) {
                this.$message.error(res.msg)
              }
              throw new Error()
            }
          })
          .catch(() => {
            this.isLoading = false
          })
      }
    })
  }

  @Emit('changeComponent')
  private onChangeComponent() {
    return 'login'
  }

  private render() {
    return (
      <el-form ref="register" key="password" {...{ props: { model: this.passwordForm } }} rules={this.passwordrules}>
        <h3>{this.$systemConfig.name}</h3>
        <el-form-item prop="user">
          <el-input
            autofocus
            v-model={this.passwordForm.user}
            placeholder="账号"
            onBlur={this.handleBlur.bind('user')}
          />
        </el-form-item>
        <el-form-item prop="userName">
          <el-input
            autofocus
            v-model={this.passwordForm.userName}
            placeholder="用户名"
            onBlur={this.handleBlur.bind('userName')}
          />
        </el-form-item>

        <el-form-item prop="password1">
          <el-input type="password" v-model={this.passwordForm.password1} placeholder="密码" />
        </el-form-item>

        <el-form-item prop="password2">
          <el-input type="password" v-model={this.passwordForm.password2} placeholder="确认密码" />
        </el-form-item>

        <el-form-item class="noMargin">
          <el-button
            loading={this.isLoading}
            class="cm-bg-color"
            type="primary"
            onClick={this.submitForm.bind(this, 'register')}
          >
            确 认
          </el-button>
        </el-form-item>
        <p class="forgetPwd" onClick={this.onChangeComponent}>
          去登录？
        </p>
      </el-form>
    )
  }
}
