<template>
  <div class="bl-login">
    <!-- 登录 -->
    <template v-if="isLogin">
      <el-form
        ref="login"
        :model="loginForm"
        key="login"
        :rules="rules">
        <h3>百凌管理系统</h3>
        <el-form-item prop="user">
          <el-input
            autofocus
            v-model="loginForm.user"
            placeholder="账号"
            @blur="handleBlur('user')"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            @blur="handleBlur('password')"
          />
        </el-form-item>

        <el-form-item
          v-if="!ipIsTrue"
          prop="verificationCode"
          class="codeWrap"
        >
          <el-input
            v-model="loginForm.verificationCode"
            placeholder="短信验证码"
            @blur="handleBlur('verificationCode')"
          />
          <span
            class="sendCode cm-color"
            v-if="!hasSendCode"
            @click="handleGetCode('login')"
          >获取验证码</span>
          <span
            class="sendCode"
            v-else
          >重新发送({{time}}S)</span>
        </el-form-item>

        <el-form-item class="noMargin">
          <el-button
            :loading="isLoading"
            class="cm-bg-color"
            type="primary"
            @click.native.prevent="submitForm('login')"
          >登 录</el-button>
        </el-form-item>
        <p class="forgetPwd cm-hover-color" @click="handlePassword">忘记密码？</p>
      </el-form>
    </template>

    <!-- 忘記密碼 -->
    <template v-else>
      <el-form
        ref="password"
        key="password"
        :model="passwordForm" :rules="passwordrules">
        <h3>百凌管理系统</h3>
        <el-form-item prop="user">
          <el-input autofocus v-model="passwordForm.user"
            placeholder="账号" @blur="handleBlur('user')" />
        </el-form-item>

        <el-form-item prop="telephone">
          <el-input v-model="passwordForm.telephone"
            placeholder="手机号" @blur="handleBlur('telephone')" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="passwordForm.password"
            placeholder="新密码" @blur="handleBlur('password')"/>
        </el-form-item>

        <el-form-item prop="verificationCode" class="codeWrap">
          <el-input
            v-model="passwordForm.verificationCode" placeholder="短信验证码"
            @blur="handleBlur('verificationCode')" />
          <span class="sendCode cm-color"
            v-if="!passwordHasSendCode" @click="handlePasswordGetCode('password')">获取验证码</span>
          <span class="sendCode" v-else>重新发送({{passwordtime}}S)</span>
        </el-form-item>

        <el-form-item class="noMargin">
          <el-button
            :loading="isLoading" class="cm-bg-color"
            type="primary" @click.native.prevent="submitForm('password')"
          >确 认</el-button>
        </el-form-item>
        <p class="forgetPwd cm-hover-color" @click="handleLogin">去登录？</p>
      </el-form>
    </template>
  </div>
</template>

<script>
import { apiUserLogin, apiGetSmsCode, apiGetIp, apiCheckIp, apiUserForgetVerificationCode, apiUserForgetPassword } from '@/api/login'
import MD5 from 'js-md5'
import rules from './rules'
export default {
  mixins: [rules],
  data () {
    return {
      hasSendCode: false,
      passwordHasSendCode: false,
      time: 0,
      passwordtime: 0,
      systemObj: {
        system: '',
        browser: 'IE'
      },
      loginForm: { user: '', password: '', verificationCode: '' },
      passwordForm: { user: '', password: '', telephone: '', verificationCode: '' },
      ipIsTrue: false,
      nowErrorCode: '',
      isLoading: false,
      ipAddress: '',
      isLogin: true
    }
  },
  created () {
    this.timer && clearInterval(this.timer)
    this.handleCheckIp()
  },
  methods: {
    // 失焦
    handleBlur (type) {
      let code = this.nowErrorCode
      if (code) {
        let obj = this.errorCodeObj[code]
        if (obj && (obj.type === type || (obj.connect && obj.connect === type))) {
          this.nowErrorCode = ''
        }
      }
    },
    // 校验IP
    handleCheckIp () {
      let version = navigator.userAgent
      let systemObj = this.systemObj
      systemObj.system = version.replace(/.+(Windows ).+?([\d\.]+).+/g, '$1$2')
      if (!systemObj.system) { // mac版本
        systemObj.system = version.replace(/.+(Mac.+?)\).+/g, RegExp.$1)
        if (navigator.vendor.incldes('Google')) {
          systemObj.browser = 'Chrome'
        }
      }
      if (systemObj.browser === 'IE') {
        let arr = ['Chrome', 'Firefox', 'Opera', 'Safari'].filter(item => version.includes(item))
        arr && (systemObj.browser = arr[0])
      }
      apiGetIp().then(res => {
        console.log(res)
        if (res) {
          let city = res.match(/(?!当前).[\u4e00-\u9fa5]\s/g)
          let ip = res.match(/[\d.]+/g).join()
          this.ip = ip
          city[0] = ''
          city[city.length - 1] = ''
          try {
            city = city.join('')
            this.ipAddress = `${ip} ${city}`
          } catch (error) { console.log('ipAddress' + error) }
        }
      }).then(() => {
        apiCheckIp({ loginIp: this.ip, operatingSystem: systemObj.system, terminal: systemObj.browser }).then(res => {
          if (res.code === '208999') {
            this.ipIsTrue = res.resultMap.data
          }
        })
      })
    },
    // 获取验证码
    handleGetCode () {
      let { user, password } = this.loginForm
      this.$refs['login'].validateField(['user', 'password'])
      if (user.trim() && password.trim()) {
        let params = { user, password }
        params.password = MD5(params.password)
        apiGetSmsCode(params).then(res => {
          if (res.code === '208999') {
            this.time = 60
            this.hasSendCode = true
            this.timer = setInterval(() => {
              if (this.time === 0) {
                this.hasSendCode = false
              }
              this.time--
            }, 1000)
          } else {
            if (!this.handleSpeciaCode(res.code)) {
              this.$message.error(res.message)
            }
          }
        })
      }
    },
    // 忘记密码获取验证码
    handlePasswordGetCode () {
      let { user, telephone } = this.passwordForm
      this.$refs['password'].validateField(['user', 'telephone'])
      if (user.trim() && telephone.trim()) {
        this.handleApiUserForgetVerificationCode(user, telephone)
      }
    },
    handleApiUserForgetVerificationCode (user, telephone) {
      let params = {
        user: user,
        loginIp: this.ip,
        telephone: telephone
      }
      apiUserForgetVerificationCode(params).then(res => {
        if (res.code === '208999') {
          this.passwordtime = 60
          this.passwordHasSendCode = true
          this.timer = setInterval(() => {
            if (this.passwordtime === 0) {
              clearInterval(this.timer)
              this.passwordHasSendCode = false
            }
            this.passwordtime--
          }, 1000)
        } else {
          if (!this.handleSpeciaCode(res.code, 'password')) {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 提交
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (form === 'login') {
            this.isLoading = true
            this.nowErrorCode = ''
            let params = Object.assign({}, this.loginForm)
            params.password = MD5(params.password)
            params.loginIp = this.ip
            params.ipAdress = this.ipAddress,
            params.operatingSystem = this.systemObj.system
            params.terminal = this.systemObj.browser
            apiUserLogin(params).then(res => {
              if (res.code === '208999') {
                res.resultMap.data && delete res.resultMap.data.errorNum
                localStorage.setItem('userInfo', JSON.stringify(res.resultMap.data))
                this.$router.push('/')
              } else {
                if (!this.handleSpeciaCode(res.code)) {
                  this.$message.error(res.message)
                }
                throw new Error()
              }
            }).catch(e => {
              this.isLoading = false
            })
          } else {
            this.isLoading = true
            this.nowErrorCode = ''
            let params = {
              user: this.passwordForm.user,
              newPassword: MD5(this.passwordForm.password),
              loginIp: this.ip,
              telephone: this.passwordForm.telephone,
              verificationCode: this.passwordForm.verificationCode
            }
            apiUserForgetPassword(params).then(res => {
              if (res.code === '208999') {
                this.isLoading = false
                this.$message.success('重置密码成功')
                this.isLogin = true
              } else {
                if (!this.handleSpeciaCode(res.code)) {
                  this.$message.error(res.message)
                }
                throw new Error()
              }
            }).catch(e => {
              this.isLoading = false
            })
          }
        }
      })
    },
    // 特殊code码进行提示
    handleSpeciaCode (code, form = 'login') {
      if (Object.keys(this.errorCodeObj).includes(code)) {
        this.nowErrorCode = code
        this.$refs[form].validateField([this.errorCodeObj[code].type])
        return true
      }
      return false
    },
    handlePassword () {
      this.isLogin = false
      this.$refs['login'].resetFields()
    },
    handleLogin () {
      this.isLogin = true
      this.$refs['password'].resetFields()
    }
  }
}
</script>

<style lang="less">
  .bl-login{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/Bitmap.png');
    background-size: cover;
    &:before{
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .56;
    }
    h3{
      margin-bottom: 25px;
      font-size: 20px;
      color: #4a4a4a;
      text-align: center;
    }
    .el-form{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      padding: 30px;
      border-radius: 4px;
      background: #fff;
    }
    .el-form-item.noMargin{
      margin-bottom: 8px;
    }
    .el-button.cm-bg-color{
      width: 100%;
      height: 40px;
      padding: 0;
      border: none;
      line-height: 40px;
    }
    .codeWrap{
      position: relative;
      .sendCode{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        color: #ddd;
      }
    }
    .forgetPwd{
      margin: 0;
      font-size: 13px;
      text-align: center;
    }
  }
</style>
