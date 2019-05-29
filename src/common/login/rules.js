export default {
  data () {
    return {
      errorCodeObj: {
        '211206': { type: 'verificationCode', msg: '短信验证码不正确' },
        '211200': { type: 'user', msg: '账号不存在' },
        '211202': { type: 'user', connect: 'password', msg: '账号或密码不正确，操作5次后将被锁定' },
        '211211': { type: 'user', msg: '该账号已被禁止登录，请联系管理员' },
        '211308': { type: 'user', msg: '该账号未被授权外网访问，请联系管理员' },
        '211201': { type: 'user', msg: '该账号已被停用，请联系管理员' }
      },
      rules: {
        user: [{ required: true, trigger: 'blur', validator: this.validateUser }],
        password: [{ required: true, trigger: 'blur', validator: this.validatePassword }],
        verificationCode: [{ required: true, trigger: 'blur', validator: this.validateCode }]
      },
      passwordrules: {
        user: [{ required: true, trigger: 'blur', validator: this.validateUser }],
        password: [
          { required: true, trigger: 'blur', message: '请输入新密码' },
          { validator: this.checkPassword, message: '请输入6-20位数字+字母的密码', trigger: ['blur', 'change'] }
        ],
        telephone: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { validator: this.checkTel, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        verificationCode: [{ required: true, trigger: 'blur', validator: this.validateCode }]
      }
    }
  },
  methods: {
    checkPassword (rule, value, callback) {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('请输入6-20位数字+字母的密码'))
      } else {
        callback()
      }
    },
    checkTel (rule, value, callback) {
      let reg = /^1[34578]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    },
    // 验证用户名
    validateUser (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入账号'))
      }
      let code = this.nowErrorCode
      if (code && this.errorCodeObj[code].type === 'user') {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    },
    // 验证密码
    validatePassword (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入密码'))
      }
      let code = this.nowErrorCode
      if (code && this.errorCodeObj[code].type === 'password') {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    },
    // 验证验证码
    validateCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入短信验证码'))
      }
      let code = this.nowErrorCode
      if (code && this.errorCodeObj[code].type === 'verificationCode') {
        return callback(new Error(this.errorCodeObj[this.nowErrorCode].msg))
      }
      callback()
    }
  }
}
