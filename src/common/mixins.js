export const login = {
  data () {
    return {
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
        return callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    },
    // 验证密码
    validatePassword (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    },
    // 验证验证码
    validateCode (rule, value, callback) {
      if (!value.trim()) {
        return callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }
  }
}
