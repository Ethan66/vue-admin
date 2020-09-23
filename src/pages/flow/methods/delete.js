import { FLOW_ITEM_TYPE } from '../config'

export default {
  methods: {
    // 删除下一个节点
    deleteNextFlowItem (flowUuid) {
      let flowItem = this.getFlow(flowUuid)
      let index = this.getFlowIndex(flowUuid)
      if (!flowItem) {
        return
      }
      this.flowList.splice(index, 1)
      this.$nextTick(() => {
        this.$options.jsPlumb.removeAllEndpoints(flowItem.uuid)
      })
      flowItem.next.forEach((id) => {
        this.deleteNextFlowItem(id)
      })
    },
    // 删除节点
    deleteFlowItem (flowItem) {
      let index = this.getFlowIndex(flowItem.uuid)
      // 删除普通节点和结束节点
      if (this.isOnePreOneNext(flowItem) || this.isEndFlowItem(flowItem)) {
        this.handleDeleteOnePrevOneNextFlowItem(flowItem, index)
      } else if (this.isHasMoreNextFlowItem(flowItem)) {
        // 其他节点
        this.deleteNextFlowItem(flowItem.uuid)
        this.addTempFlowItem(flowItem.prev[0])
      }
    },
    // 删除普通节点和结束节点
    handleDeleteOnePrevOneNextFlowItem (flowItem, idx) {
      let prevFlowList = []
      let nextFlowList = []
      let deleteFlowItem = this.flowList[idx]
      // prev flow list
      // next flow list
      this.flowList.forEach((item) => {
        if (item.prev.length > 0 && item.prev.indexOf(flowItem.uuid) !== -1) {
          nextFlowList.push(item)
        } else if (item.next.length > 0 && item.next.indexOf(flowItem.uuid) !== -1) {
          prevFlowList.push(item)
        }
      })
      let expandFlowItem = {}
      if (flowItem.type === FLOW_ITEM_TYPE.endNode && prevFlowList[0].type === FLOW_ITEM_TYPE.expandNode) {
        expandFlowItem = this.getExpandFlowItem(prevFlowList[0], flowItem.uuid)
      }
      // next flow item delete perv id
      nextFlowList.forEach((item) => {
        let index = item.prev.indexOf(flowItem.uuid)
        item.prev.splice(index, 1)
      })
      // prev flow item delete next id
      prevFlowList.forEach((item) => {
        let index = item.next.indexOf(flowItem.uuid)
        item.next.splice(index, 1)
      })
      // delete self
      this.flowList.splice(idx, 1)
      this.$nextTick(function () {
        // delete self
        this.$options.jsPlumb.removeAllEndpoints(flowItem.uuid)

        let preFlowItem = prevFlowList[0]
        let nextFlowItem = nextFlowList[0]

        if (preFlowItem && nextFlowItem) {
            // add new id
          preFlowItem.next.push(nextFlowItem.uuid)
          nextFlowItem.prev.push(preFlowItem.uuid)
          // drag connection
          this.draggableFlowConnect(preFlowItem.uuid, nextFlowItem.uuid, true)
          // connection label
          if (nextFlowItem.type !== FLOW_ITEM_TYPE.tempNode) {
            this.createFlowConnectionLabel(preFlowItem.uuid, nextFlowItem.uuid)
          }
          // if prev is ifNode or expandNode need add flow label
          if (this.isIfFlowItem(preFlowItem.type)) {
            let isIf = preFlowItem.nextIfId === flowItem.uuid
            if (isIf) {
              preFlowItem.nextIfId = nextFlowItem.uuid
            } else {
              preFlowItem.nextElseId = nextFlowItem.uuid
            }
            this.createFlowItemLabel(preFlowItem.uuid, nextFlowItem.uuid, isIf ? '是' : '否')
          } else if (this.isExpandFlowItem(preFlowItem.type)) {
              // need update rule group list;
            let ruleGroupItem = this.getExpandFlowItem(preFlowItem, deleteFlowItem.uuid)
            if (ruleGroupItem) {
              ruleGroupItem.nextStep = nextFlowItem.uuid
            }
            this.createFlowItemLabel(preFlowItem.uuid, nextFlowItem.uuid, ruleGroupItem.name)
          }
        }
        // if delete end node
        if ((flowItem.type === FLOW_ITEM_TYPE.endNode)) {
          if (preFlowItem) {
          // if prev is ifNode or expandNode need add flow label
            if (this.isIfFlowItem(preFlowItem.type)) {
              let isIf = preFlowItem.nextIfId === flowItem.uuid
              //  create one flow item
              let tempFlowUuid = this.addIfOneTempFlowItem(preFlowItem.uuid, isIf)
              if (isIf) {
                preFlowItem.nextIfId = tempFlowUuid
              } else {
                preFlowItem.nextElseId = tempFlowUuid
              }
            } else if (this.isExpandFlowItem(preFlowItem.type)) {
              // create one flow item
              let tempFlowUuid = this.addExpandOneTempFlowItem(preFlowItem, flowItem.left, expandFlowItem.name)
              expandFlowItem.nextStep = tempFlowUuid
            } else {
              // add temp flow item
              this.addTempFlowItem(preFlowItem.uuid)
            }
          }
        }
      })
    }
  }
}
