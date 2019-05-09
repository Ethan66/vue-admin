<template>
  <div class="bl-login">
    <el-form
      ref="login"
      :model="loginForm"
      :rules="rules"
    >
      <h3>百凌管理系统</h3>
      <el-form-item prop="userName">
        <el-input
          autofocus
          v-model="loginForm.userName"
          placeholder="账号"
          @blur="handleBlur('userName')"
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
          @click="handleGetCode"
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
      <p class="forgetPwd cm-hover-color">忘记密码？</p>
    </el-form>
  </div>
</template>

<script>
import { apiUserLogin, apiGetSmsCode, apiGetButtonsByUserId, apiGetIp, apiCheckIp } from '@/api/login'
import MD5 from 'js-md5'
import rules from './rules'
export default {
  mixins: [rules],
  data () {
    return {
      hasSendCode: false,
      time: 0,
      loginForm: { userName: '', password: '', verificationCode: '' },
      ipIsTrue: false,
      nowErrorCode: '',
      isLoading: false
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
        if (this.errorCodeObj[code] && this.errorCodeObj[code].type === type) {
          this.nowErrorCode = ''
        }
      }
    },
    // 校验IP
    handleCheckIp () {
      apiGetIp().then(res => {
        res && (this.ip = res.match(/[\d.]+/g).join())
      }).then(() => {
        apiCheckIp({ loginIp: this.ip }).then(res => {
          if (res.code === '208999') {
            this.ipIsTrue = res.resultMap.data
          }
        })
      })
    },
    // 获取验证码
    handleGetCode () {
      let { userName, password } = this.loginForm
      this.$refs['login'].validateField(['userName', 'password'])
      if (userName.trim() && password.trim()) {
        let params = { userName, password }
        params.password = MD5(params.password)
        apiGetSmsCode(params).then(res => {
          if (res.code === '208999') {
            this.time = 60
            this.hasSendCode = true
            this.timer = setInterval(() => {
              if (this.time === 0) {
                clearInterval(this.timer)
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
    // 提交
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = true
          this.nowErrorCode = ''
          let params = Object.assign({}, this.loginForm)
          params.password = MD5(params.password)
          params.loginIp = this.ip
          apiUserLogin(params).then(res => {
            if (res.code === '208999') {
              sessionStorage.setItem('userInfo', JSON.stringify(res.resultMap))
              this.$router.push('/')
            } else {
              if (!this.handleSpeciaCode(res.code)) {
                this.$message.error(res.message)
              }
            }
          }).then(res => {
            apiGetButtonsByUserId({}).then(res => {
              if (res.code === '208999') {
                sessionStorage.setItem('btnList', JSON.stringify(res.resultMap.buttonList))
              }
            })
          })
        }
      })
    },
    // 特殊code码进行提示
    handleSpeciaCode (code) {
      if (Object.keys(this.errorCodeObj).includes(code)) {
        this.nowErrorCode = code
        this.$refs['login'].validateField([this.errorCodeObj[code].type])
        return true
      }
      return false
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
