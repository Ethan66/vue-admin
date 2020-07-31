import { Vue, Component } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'

@Component
export default class Rule extends Vue {
  nowErrorCode = ''
  errorCodeObj = {
    '000001': { type: 'user', msg: '账号已存在' },
    '000002': { type: 'user', msg: '账号不存在' },
    '000003': { type: 'user', connect: 'password', msg: '账号或密码不正确，操作5次后将被锁定' },
    '000004': { type: 'user', msg: '该账号已被锁定，请1分钟后再试' },
    '000005': { type: 'user', msg: '该账号已被删除' },
    '000006': { type: 'user', msg: '该账号已被停用，请联系管理员' }
  }

  rules = {
    user: [{ required: true, trigger: 'blur', validator: this.validateUser }],
    password: [{ required: true, trigger: 'blur', validator: this.validatePassword }]
  }

  passwordrules = {
    user: [{ required: true, trigger: 'blur', validator: this.validateUser }],
    userName: [{ required: true, trigger: 'blur', validator: this.validateUserName }],
    password1: [{ required: true, validator: this.checkPassword1, trigger: 'blur' }],
    password2: [{ required: true, validator: this.checkPassword2.bind(this, 'passwordForm'), trigger: 'blur' }]
  }

  protected checkPassword1(rule, value, callback) {
    if (!value.trim()) {
      return callback(new Error('请输入密码'))
    }

    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (!reg.test(value)) {
      // callback(new Error('请输入6-20位数字+字母的密码'))
      callback()
    } else {
      callback()
    }
  }

  checkPassword2(key, rule, value, callback) {
    if (!value.trim()) {
      return callback(new Error('请输入密码'))
    }
    if (this[key].password1 !== this[key].password2) {
      callback(new Error('两次输入密码不一致，请重新输入'))
    } else {
      callback()
    }
  }

  // 验证账号
  protected validateUser(rule, value, cb) {
    if (!value.trim()) {
      return cb(new Error('请输入账号'))
    }

    const code = this.nowErrorCode
    if (code && this.errorCodeObj[code].type === 'user') {
      return cb(new Error(this.errorCodeObj[this.nowErrorCode].msg))
    }
    cb()
  }

  // 验证用户名
  protected validateUserName(rule, value, callback) {
    if (!value.trim()) {
      return callback(new Error('请输入用户名'))
    }
    callback()
  }

  // 验证密码
  protected validatePassword(rule, value, cb) {
    if (!value.trim()) {
      return cb(new Error('请输入密码'))
    }
    cb()
  }

  // 失焦取消错误code码
  protected handleBlur(type) {
    const code = this.nowErrorCode
    if (code) {
      const obj = this.errorCodeObj[code]
      if (obj && (obj.type === type || (obj.connect && obj.connect === type))) {
        this.nowErrorCode = ''
      }
    }
  }

  // 特殊code码进行提示
  protected handleSpeciaCode(code, form = 'login') {
    if (Object.keys(this.errorCodeObj).includes(code)) {
      this.nowErrorCode = code
      ;(this.$refs[form] as ElForm).validateField([this.errorCodeObj[code].type])
      return true
    }
    return false
  }
}
