export default {
  data () {
    let checkSortNo = (rule, value, callback) => {
      let reg = /^[0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的数值'))
      } else {
        callback()
      }
    }
    return {
      typeDialogTitle: '编辑类型',
      formData: {
        cloneRoleIds: []
      },
      typeDialogRules: {
        resourceParentId: [
          { required: true, message: '请选择所属分类', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '请输入显示排序', trigger: 'blur' },
          { validator: checkSortNo, message: '请输入正确的数值', trigger: ['blur', 'change'] }
        ]
      },
      typeDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleTypeDialogRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleTypeDialogSubmit' }
      ],
      formItem: [],
      typeDialogVisible: false,
      isEdit: false,
      isClassify: 0 // 0：角色，1：角色分类
    }
  }
}
