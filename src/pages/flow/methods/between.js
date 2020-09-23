import { FLOW_STEP_LENGTH, FLOW_LEFT_STEP_LENGTH } from '../config'

export default {
  methods: {
    // 中间添加节点：判断添加哪种节点
    handleAddBetweenFlowItem (options) {
      let {flowItemType, preFlowId, nextFlowId, formData} = options
      // 添加的是非普通节点
      if (this.isIfFlowItem(flowItemType) || this.isExpandFlowItem(flowItemType)) {
        this.deleteNextFlowItem(nextFlowId)
        this.$nextTick(() => {
          let tempFlowUuid = this.addTempFlowItem(preFlowId)
          let tempFlowItem = this.getFlow(tempFlowUuid)
          tempFlowItem.formData = formData
          this.$nextTick(() => {
            this.handleAddFlowItem(flowItemType, tempFlowUuid)
          })
        })
      } else {
        // 添加的是普通节点
        this.handleAddBetweenCommonFlowItem(options)
      }
    },
    // 中间添加普通节点
    handleAddBetweenCommonFlowItem (opts) {
      let {flowItemType, preFlowId, nextFlowId, formData} = opts
      // update flow position
      let prevFlowItem = this.getFlow(preFlowId)
      let options = {}
      //
      let flowItemUuid = this.createFlowItem(flowItemType, preFlowId, options)
      // prev flow item is if flow item
      if (this.isIfFlowItem(prevFlowItem.type)) {
        let nextFlowItem = this.getFlow(nextFlowId)
        let isIf = prevFlowItem.nextIfId === nextFlowItem.uuid
        if (isIf) {
          prevFlowItem.nextIfId = flowItemUuid
          options.offsetLeft = -FLOW_LEFT_STEP_LENGTH
        } else {
          prevFlowItem.nextElseId = flowItemUuid
          options.offsetLeft = FLOW_LEFT_STEP_LENGTH
        }
      } else if (this.isExpandFlowItem(prevFlowItem.type)) {
        let nextFlowItem = this.getFlow(nextFlowId)
        options.offsetLeft = nextFlowItem.left - prevFlowItem.left
      }

      let flowItem = this.getFlow(flowItemUuid)
      flowItem.formData = formData
      flowItem.next.push(nextFlowId)
      //
      this.$nextTick(() => {
        this.updateBetweenFlowItem(flowItemUuid, nextFlowId, preFlowId)

        if (this.isIfFlowItem(prevFlowItem.type)) {
          this.createFlowItemLabel(preFlowId, flowItemUuid, options.offsetLeft > 0 ? '是' : '否`')
        } else if (this.isExpandFlowItem(prevFlowItem.type)) {
          let name = this.getExpandFlowItemName(prevFlowItem, flowItemUuid)
          this.createFlowItemLabel(preFlowId, flowItemUuid, name)
        }
      })
    },
    // 中间添加普通节点更新
    updateBetweenFlowItem (flowItemUuid, nextFlowId, preFlowId) {
      // prev flow item
      let preFlowItem = this.getFlow(preFlowId)
      // pre flow item remove next next flow
      let preNextIndex = preFlowItem.next.indexOf(nextFlowId)
      if (preNextIndex !== -1) {
        preFlowItem.next.splice(nextFlowId, 1)
      }
      // prev flow item add current flow
      let flowItemIndex = preFlowItem.next.indexOf(flowItemUuid)
      if (flowItemIndex === -1) {
        preFlowItem.next.push(flowItemUuid)
      }
      // has one prev
      let nextFlowItem = this.getFlow(nextFlowId)
      nextFlowItem.prev = [flowItemUuid]
      // remove flow connection
      this.removeFlowConnection(preFlowId, nextFlowId)
      this.addFlowItemConnect(preFlowId, flowItemUuid)
      this.addFlowItemConnect(flowItemUuid, nextFlowId)
      // move flow
      this.moveFlowItem(nextFlowId)
      this.plumbRepaintEverything()
    },
     // 中间添加普通节点删除
    removeFlowConnection (source, target) {
      let lines = this.$options.jsPlumb.getConnections({
        source: source,
        target: target
      })
      lines.forEach((line) => {
        this.$options.jsPlumb.deleteConnection(line, {force: true})
      })
    },
    // 中间添加普通节点连接
    addFlowItemConnect (prevId, nextId) {
      this.draggableFlowConnect(prevId, nextId, true)
      this.createFlowConnectionLabel(prevId, nextId)
    },
    // 中间添加普通节点移动next节点
    moveFlowItem (flowUuid) {
      let flowItem = this.getFlow(flowUuid)
      if (flowItem.prev.length > 0) {
        let prevItem = this.getFlow(flowItem.prev[0])
        flowItem.top = prevItem.top + FLOW_STEP_LENGTH
      }
      flowItem.next.forEach((id) => {
        this.moveFlowItem(id)
      })
    },
    // 中间添加普通节点重新绘画
    plumbRepaintEverything () {
      this.$nextTick(() => {
        this.$options.jsPlumb.repaintEverything()
      })
    }
  }
}
