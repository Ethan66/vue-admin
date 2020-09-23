import { FLOW_ITEM_TYPE, FLOW_TYPE, FLOW_STEP_LENGTH, FLOW_LEFT_STEP_LENGTH } from '../config'

function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

export default {
  methods: {
    // 新增节点: 判断添加哪种节点
    handleAddFlowItem (flowItemType, tempFlowId) {
      let newFlowItem = this.updateFlowItem(flowItemType, tempFlowId)
      this.createFlowConnectionLabel(newFlowItem.prev, newFlowItem.uuid)
      if (this.isOnePreOneNext(newFlowItem)) {
      // 节点
        this.addTempFlowItem(tempFlowId)
      } else if (newFlowItem.groupType === FLOW_TYPE.condition) {
        if (this.isIfFlowItem(flowItemType)) {
          // 条件判断
          this.addIfTempFlowItem(tempFlowId)
        } else if (this.isExpandFlowItem(flowItemType)) {
          // 条件分组
          this.addExpandTempFlowItem(tempFlowId, newFlowItem.formData.ruleGroupList)
        }
      }
      return newFlowItem
    },
    // 添加tmp节点
    addTempFlowItem (preUuid) {
      let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid)
      // console.log(22, JSON.parse(JSON.stringify(this.flowList)))
      this.draggableFlowConnect(preUuid, tempFlowUuid)
      return tempFlowUuid
    },
    // 添加条件判断节点
    addIfTempFlowItem (preUuid) {
      let preTempItem = this.getFlow(preUuid)
      let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, { offsetLeft: -FLOW_LEFT_STEP_LENGTH })
      this.draggableFlowConnect(preUuid, tempFlowUuid)
      this.createFlowItemLabel(preUuid, tempFlowUuid, '是')
      preTempItem.nextIfId = tempFlowUuid
      let tempFlowUuid2 = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, { offsetLeft: FLOW_LEFT_STEP_LENGTH })
      this.draggableFlowConnect(preUuid, tempFlowUuid2)
      this.createFlowItemLabel(preUuid, tempFlowUuid2, '否')
      preTempItem.nextElseId = tempFlowUuid2
    },
    // 添加条件分组节点
    addExpandTempFlowItem (preUuid, ruleGroups) {
      let length = ruleGroups.length
      // is even
      let isEven = length % 2 === 0
      let centerIndex = parseInt(length / 2, 10)
      centerIndex = isEven ? centerIndex - 1 : centerIndex
      let tempItem
      let options = {}
      // left
      for (let i = 0; i <= centerIndex; i++) {
        tempItem = ruleGroups[i]
        let tempLength = isEven ? (centerIndex - i) : (centerIndex - i)
        let leftLength = tempLength * (FLOW_LEFT_STEP_LENGTH * 2)
        if (isEven) {
          leftLength = leftLength + FLOW_LEFT_STEP_LENGTH
        }
        options.offsetLeft = -leftLength
        let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, options)
        this.draggableFlowConnect(preUuid, tempFlowUuid)
        this.createFlowItemLabel(preUuid, tempFlowUuid, tempItem.name)
        tempItem.nextStep = tempFlowUuid
      }
      // right
      for (let i = centerIndex + 1; i < length; i++) {
        tempItem = ruleGroups[i]
        let tempLength = isEven ? (i - (centerIndex + 1)) : (i - centerIndex)
        let leftLength = tempLength * (FLOW_LEFT_STEP_LENGTH * 2)
        if (isEven) {
          leftLength = leftLength + FLOW_LEFT_STEP_LENGTH
        }
        options.offsetLeft = leftLength
        let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, options)
        this.draggableFlowConnect(preUuid, tempFlowUuid)
        this.createFlowItemLabel(preUuid, tempFlowUuid, tempItem.name)
        tempItem.nextStep = tempFlowUuid
      }
    },
    // 创建节点
    createFlowItem (type, prev, options) {
      options = options || {}
      let _uuid = getUUID()
      let flowItem = this.getFlowItemByType(type)
      // console.log('flowItem:', JSON.stringify(flowItem))
      let lastItemList = []
      if (flowItem) {
        flowItem.prev = []
        flowItem.next = []
        flowItem.formData = {}
        var fn = function () {
          const dom = this.$refs.campaignCanvas
          let width = window.getComputedStyle ? parseInt(window.getComputedStyle(dom).width) : dom.style.width
          if (width === 'auto') {
            width = dom.offsetWidth
          }
          return width ? width / 2 : 500
        }
        flowItem.left = fn.call(this)
        flowItem.top = 30
        flowItem.uuid = _uuid
        flowItem.stepCount = -1
        if (prev) {
          prev = !Array.isArray(prev) && [prev]
          flowItem.prev = prev
          prev.forEach((p) => {
            let lastItem = this.flowList.find((item) => item.uuid === p)
            if (lastItem) {
              lastItemList.push(lastItem)
              if (lastItem.next.indexOf(_uuid) === -1) {
                lastItem.next.push(_uuid)
              }
            }
          })
        }
        if (lastItemList.length > 0) {
          if (lastItemList.length === 1) {
            let prevItem = lastItemList[0]

            if (options.offsetLeft) {
              flowItem.left = prevItem.left + options.offsetLeft
            } else if (options.left) {
              flowItem.left = options.left
            } else {
              flowItem.left = prevItem.left
            }
            flowItem.top = prevItem.top + FLOW_STEP_LENGTH
          }
        }
        this.flowList.push(flowItem)
        this.$nextTick(() => {
          this.$options.jsPlumb.draggable(_uuid, {})
        })
      }
      return flowItem ? _uuid : null
    },
    // 将节点连接
    draggableFlowConnect (source, target, isNow) {
      let that = this
      function doDraw () {
        if (that.jsPlumbInit) {
          that.$options.jsPlumb.connect({
            source: source,
            target: target,
            endpoint: 'Dot',
            // 连接线的样式
            connectorStyle: { strokeStyle: '#ccc', joinStyle: 'round', outlineColor: '#ccc' }, // 链接 style
            // 连接线配置，起点可用
            connector: ['Flowchart', {
              stub: [10, 20],
              gap: 1,
              cornerRadius: 2,
              alwaysRespectStubs: true
            }], //  链接
            //
            endpointStyle: { fill: 'transparent', outlineStroke: 'transparent', outlineWidth: 2 },
            // 线的样式
            paintStyle: { stroke: 'lightgray', strokeWidth: 2 },
            // 锚点的位置
            anchor: ['BottomCenter', 'TopCenter'],
            // 遮罩层-设置箭头
            overlays: [
              ['PlainArrow', { width: 10, length: 10, location: 1 }],
              ['Custom', {
                location: 0.5,
                id: 'nodeTempSmall',
                create: function () {
                  let $el = that.$refs[target][0].$el
                  $el.dataset.target = target
                  $el.dataset.source = source
                  return $el
                },
                visible: false
              }],
              ['Label', { location: 1, id: 'flowItemDesc', cssClass: 'node-item-label', visible: true }]
            ]
          })
        }
      }
      if (isNow) {
        doDraw()
      } else {
        this.$nextTick(() => {
          doDraw()
        })
      }
    }
  }
}
