import { FLOW_ITEM_TYPE, FLOW_LEFT_STEP_LENGTH } from '../config'

export default {
  methods: {
    // 对话框点击确定更新节点
    handleUpdateFlowItem (options) {
      let {flowItemType, tempFlowId} = options

      let preFlowItem = this.getFlow(tempFlowId)
      let isPrevHasMoreNext = false
      // update new flow item
      let newFlowItem = this.updateFlowItem(flowItemType, tempFlowId)
      // if update new flow type
      if (flowItemType !== preFlowItem.type) {
        // update old flow item
        if (this.isHasMoreNextFlowItem(preFlowItem)) {
          isPrevHasMoreNext = true
          preFlowItem.next.forEach((id) => {
            this.deleteNextFlowItem(id)
          })
        }
        if (this.isIfFlowItem(flowItemType)) {
          this.handleUpdateIfFlowItem(newFlowItem)
        } else if (this.isExpandFlowItem(flowItemType)) {
          this.handleUpdateExpandFlowItem(newFlowItem)
        } else {
          if (isPrevHasMoreNext) {
            this.addTempFlowItem(newFlowItem.uuid)
          }
        }
      } else {
        // update self item
        // compare groupList and next
        // todo: 待完成
        if (this.isExpandFlowItem(flowItemType)) {
          const ruleGroupList = newFlowItem.formData.ruleGroupList
          const nextList = newFlowItem.next
          const newNextList = []

          const addRuleGroupList = []
          let deleteUUidList = []
          //
          ruleGroupList.forEach((ruleGroupItem) => {
            const nextStep = ruleGroupItem.nextStep
            if (nextStep) {
              newNextList.push(nextStep)
              //  update group item label name;
              this.createFlowItemLabel(newFlowItem.uuid, nextStep, ruleGroupItem.name)
            } else {
              addRuleGroupList.push(ruleGroupItem)
            }
          })
          // delete item
          deleteUUidList = nextList.filter(item => !newNextList.includes(item))
          if (deleteUUidList.length > 0) {
            // update next
            newFlowItem.next = newNextList
            deleteUUidList.forEach((uuid) => {
              this.deleteNextFlowItem(uuid)
            })
          }

          if (addRuleGroupList.length > 0) {
            let leftPosition = 0
            newFlowItem.next.forEach((uuid) => {
              let flowItem = this.getFlow(uuid)
              if (leftPosition < flowItem.left) {
                leftPosition = flowItem.left
              }
            })
            // need last left
            addRuleGroupList.forEach((ruleGroupItem, index) => {
              let left = leftPosition + (index + 1) * (FLOW_LEFT_STEP_LENGTH * 2)
              let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, newFlowItem.uuid, {left})
              this.draggableFlowConnect(newFlowItem.uuid, tempFlowUuid)
              this.createFlowItemLabel(newFlowItem.uuid, tempFlowUuid, ruleGroupItem.name)
              ruleGroupItem.nextStep = tempFlowUuid
            })
          }
        }
      }
    }
  }
}
