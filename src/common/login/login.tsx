import { Component, Prop } from 'vue-property-decorator'
import { apiLogin } from '@/api/login'
import MD5 from 'js-md5'
import { mixins } from 'vue-class-component'
import { IapiLoginParams } from '@/types/api-params'
import { IsystemObj } from './index'
import Rule from './rules'
import { ElForm } from 'element-ui/types/form'

@Component
export default class Login extends mixins(Rule) {
  @Prop() readonly systemObj!: IsystemObj
  @Prop() readonly ipAddress!: string

  loginForm: { user: string; password: string } = { user: '', password: '' }
  isLoading = false

  private submitForm(form: string): void {
    (this.$refs[form] as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.isLoading = true
        this.nowErrorCode = ''
        const params: IapiLoginParams = Object.assign(
          { ipAddress: '', operatingSystem: '', terminal: '' },
          this.loginForm
        )
        params.password = MD5(params.password)
        params.ipAddress = this.ipAddress
        params.operatingSystem = this.systemObj.system
        params.terminal = this.systemObj.browser
        apiLogin(params).then((res: any) => {
          this.isLoading = false
          if (res.code === '000000') {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            // this.$router.push('/')
          } else {
            /* if (!this.handleSpeciaCode(res.code)) {
              this.$message.error(res.msg)
            } */
          }
        })
      }
    })
  }

  protected render() {
    return (
      <el-form ref="login" {...{ props: { model: this.loginForm } }} key="login" rules={this.rules}>
        <h3>{this.$systemConfig.name}</h3>
        <el-form-item prop="user">
          <el-input
            autofocus
            v-model={this.loginForm.user}
            placeholder="账号"
            onblur={this.handleBlur.bind(this, 'user')}
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model={this.loginForm.password}
            placeholder="密码"
            onBlur={this.handleBlur.bind(this, 'password')}
          />
        </el-form-item>

        <el-form-item class="noMargin">
          <el-button
            loading={this.isLoading}
            class="cm-bg-color"
            type="primary"
            onClick={this.submitForm.bind(this, 'login')}
          >
            登 录
          </el-button>
        </el-form-item>
        <p class="forgetPwd" onClick={this.$emit('handleChangeComponent', 'register')}>
          注册
        </p>
      </el-form>
    )
  }
}
