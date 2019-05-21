export default {
  data () {
    return {
      typeDialogTitle: '编辑类型',
      formData: {},
      typeDialogRules: {
        resourceParentId: [
          { required: true, message: '请选择所属分类', trigger: 'blur' }
        ],
        roleName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        sortNo: [
          { required: true, message: '请输入显示排序', trigger: 'blur' }
        ]
      },
      typeDialogBtn: [
        { label: '取 消', type: 'delete', clickfn: 'handleTypeDialogRefuse' },
        { label: '确 认', type: 'edit', color: 'primary', clickfn: 'handleTypeDialogSubmit' }
      ],
      formItem: [
        { label: '分类名称', key: 'name', type: 'input' },
        { label: '显示排序', key: 'srot', type: 'input' },
        { label: '创建人', type: 'text', content: '系统' },
        { label: '创建时间', type: 'text', content: '2019/04/26 15:23' }
      ],
      typeDialogVisible: false,
      isEdit: false,
      isClassify: 0 // 0：角色，1：角色分类
    }
  }
}
