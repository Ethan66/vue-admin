import {FLOW_ITEM_TYPE, FLOW_LIST, FLOW_TYPE} from '../config'
import { clone } from '@/config/utils'
import create from './create'
import between from './between'
import deleteFlow from './delete'
import update from './update'

export default {
  mixins: [create, between, deleteFlow, update],
  methods: {
    // 更新节点
    updateFlowItem (type, preId) {
      // old
      let tempFlowItem = this.getFlow(preId)
      // new
      let newFlowItem = this.getFlowItemByType(type)
      for (let key in newFlowItem) {
        tempFlowItem[key] = newFlowItem[key]
      }
      return tempFlowItem
    },
    createFlowConnectionLabel (sourceList, target) {
      if (!Array.isArray(sourceList)) {
        sourceList = [sourceList]
      }
      sourceList.forEach((source) => {
        let lines = this.$options.jsPlumb.getConnections({
          source: source,
          target: target
        })
        lines.forEach((line) => {
          line.getOverlay('nodeTempSmall').setVisible(true)
          line.bind('click', function (label) {
            if (!label.component) return
            const { sourceId, targetId } = label.component
            this.showDialog({
              isBetween: true,
              flowPreUuid: sourceId,
              flowNextUuid: targetId
            })
          }.bind(this))
        })
      })
    },
    createFlowItemLabel (source, target, label) {
      this.$nextTick(() => {
        let lines = this.$options.jsPlumb.getConnections({
          source: source,
          target: target
        })
        if (lines.length > 0) {
          lines[0].getOverlay('flowItemDesc').setLabel(`<span class="node-item-title" title="${label}">${label}</span>`)
        }
      })
    },
    // 获取节点初始配置
    getFlowItemByType (type) {
      for (let key in FLOW_LIST) {
        const arr = FLOW_LIST[key]
        if (Array.isArray(arr)) {
          const index = arr.findIndex(item => item.type === type)
          if (index > -1) {
            return clone(arr[index])
          }
        }
      }
    },
    // find item
    getFlow (flowUuid) {
      return this.flowList.find((item) => item.uuid === flowUuid)
    },
    // find index
    getFlowIndex (flowUuid) {
      return this.flowList.findIndex((item) => item.uuid === flowUuid)
    },
    // 是条件判断节点和条件分组节点
    isHasMoreNextFlowItem (flowItem) {
      return this.isIfFlowItem(flowItem.type) || this.isExpandFlowItem(flowItem.type)
    },
    // 是条件判断节点
    isIfFlowItem (flowItemType) {
      return flowItemType === FLOW_ITEM_TYPE.ifNode
    },
    // 是条件分组节点
    isExpandFlowItem (flowItemType) {
      return flowItemType === FLOW_ITEM_TYPE.expandNode
    },
    // 是普通节点
    isOnePreOneNext (flowItem) {
      return flowItem.groupType === FLOW_TYPE.action || flowItem.type === FLOW_ITEM_TYPE.waitNode
    },
    // 是结束节点
    isEndFlowItem (flowItem) {
      return flowItem.type === FLOW_ITEM_TYPE.endNode
    }
  }
}
