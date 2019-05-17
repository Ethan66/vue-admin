import { apiCreateConsoleRole, apiEditeConsoleRole, apiDelConsoleRole, apiGetAllRoleRequestTree, apiPageQueryUserRole } from '@/api/role'
export default {
  data () {
    return {
      typeDialogTitle: '编辑类型',
      formData: {},
      typeDialogRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        srot: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
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
      isRole: 0 // 0：角色，1：角色分类
    }
  },
  methods: {
    handleApiCreateConsoleRole () {
      let params = {
        departmentId: '', // 部门id
        roleName: '', // 角色或者分类名称
        resourceType: this.isRole // 资源类型 0:角色，1:角色分类
      }
      apiCreateConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiEditeConsoleRole () {
      let params = {}
      apiEditeConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleApiDelConsoleRole () {
      let params = {
        departmentId: '', // 部门id
        id: '', // 记录id
        resourceType: this.isRole // 资源类型
      }
      apiGetAllRoleRequestTree(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取角色分类树
    handleApiGetAllRoleRequestTree () {
      let params = {
        withUserFlag: 1
      }
      apiDelConsoleRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取表格数据
    handleApiPageQueryUserRole () {
      let params = {
        departmentId: '',
        id: '',
        roleName: '',
        resourceType: this.isRole
      }
      apiPageQueryUserRole(params).then(res => {
        if (res.code === '208999') {

        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
