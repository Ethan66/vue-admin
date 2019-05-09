export default {
  data () {
    return {
      errorCodeObj: {
        '211206': { type: 'verificationCode', msg: '短信验证码不正确' },
        '211200': { type: 'userName', msg: '账号不存在' },
        '211202': { type: 'userName', msg: '账号或密码不正确，操作5次后将被锁定' }
        // '211202': { type: 'userName', msg: '该账号已被禁止登录，请联系管理员' },
        // '211202': { type: 'userName', msg: '该账号未被授权外网访问，请联系管理员' },
        // '211202': { type: 'userName', msg: '该账号已被停用，请联系管理员' }
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', validator: this.validateUserName }],
        password: [{ required: true, trigger: 'blur', validator: this.validatePassword }],
        verificationCode: [{ required: true, trigger: 'blur', validator: this.validateCode }]
      }
    }
  },
  methods: {
    // 验证用户名
    validateUserName (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入账号'))
      }
      if (this.nowErrorCode) {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    },
    // 验证密码
    validatePassword (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入密码'))
      }
      if (this.nowErrorCode) {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    },
    // 验证验证码
    validateCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入短信验证码'))
      }
      if (this.nowErrorCode) {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    }
  }
}
