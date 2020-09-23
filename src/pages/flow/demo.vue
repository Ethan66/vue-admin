<template>
  <div class="demo">
    <div class="flow-layout">
      <div class="flow-editor">
        <div class="canvas-container">
          <div id="campaignCanvas" ref="campaignCanvas">
             <template v-for="(flowItem,index) in flowList">
                <div class="node-content-wrap"
                  :key="index"
                  @mousedown="handleFlowMoveDown"
                  @mouseup="(event)=>{handleChangeFlowPosition(flowItem,event)}"
                  :id="flowItem.uuid"
                  @click.stop="(event)=>{handleEditFlowItem(flowItem,event)}"
                  :style="{left:flowItem.left+'px',top:flowItem.top+'px'}">
                    <div class="node-content">
                      <draggable class="node-temp-small" :ref="flowItem.uuid"
                                  :group="{name:'sortable', pull:false, put: true }">
                      </draggable>
                      <template v-if="flowItem.groupType === flowTypeConstant.action">
                        <div class="flow-item node">
                            <div class="step-img" :class="flowItem.className"></div>
                            <div class="step-title">{{flowItem.name}}</div>
                        </div>
                        <!--flow text-->
                        <div class="flow-text">
                            <div class="text-line">
                                <span>{{flowItem.formData && flowItem.formData.stepName}}</span>
                                <i class="el-icon-close flow-delete"
                                    @click.stop="handleDeleteFlowItem(flowItem)"></i>
                            </div>
                        </div>
                        <!--    -->
                      </template>
                      <template v-else-if="flowItem.groupType === flowTypeConstant.condition">
                        <div class="flow-item node-square">
                          <div class="square">
                            <div class="step-img" :class="flowItem.className"></div>
                          </div>
                        </div>
                        <div class="flow-text">
                          <div class="text-line">
                            <span>{{flowItem.formData && flowItem.formData.stepName}}</span>
                            <i class="el-icon-close flow-delete"
                                @click.stop="handleDeleteFlowItem(flowItem)"></i>
                          </div>
                          <div class="text-line1">
                            <template v-if="flowItem.formData && flowItem.formData.ifNodeTitle">
                              <span class="text-content">{{flowItem.formData.ifNodeTitle}}</span>
                            </template>
                          </div>
                        </div>
                      </template>
                        <!-- flow -->
                        <template v-else-if="flowItem.groupType === flowTypeConstant.flow">
                          <div class="flow-item node node-circle">
                            <div class="step-img" :class="flowItem.className"></div>
                          </div>
                          <div class="flow-text">
                            <div class="text-line">
                              <span>{{flowItem.formData && flowItem.formData.stepName}}</span>
                              <i class="el-icon-close flow-delete"
                                v-if="flowItem.type !== flowItemTypeConstant.startNode"
                                @click.stop="handleDeleteFlowItem(flowItem)"></i>
                            </div>
                          </div>
                        </template>
                        <!--  temp node -->
                        <template v-if="flowItem.groupType === flowTypeConstant.temp ">
                          <draggable class="flow-item node-temp node-temp-img"
                            ref="tempNode"
                            :id="flowItem.uuid"
                            :group="{name:'sortable', pull:false, put: true }">
                          </draggable>
                        </template>
                    </div>
                </div>
            </template>
          </div>
        </div>
        <!-- <div class="flow-editor-sidebar">
          <template v-for="(flowItem,index) in flowAllList">
              <draggable class="items-box"
                          :key="index"
                          :list="flowItem.children"
                          :group="{name:'sortable', pull: 'clone', put: false }"
                          v-bind="dragConfig"
                          :move="handleFlowMoveItem"
                          @start="handleFlowMoveStart"
                          @end="handleFlowMoveEnd"
                          :sort="false"
                          :ref="flowItem.ref">
                  <template v-for="(item,index) in flowItem.children">
                      <template v-if="flowItem.type === flowTypeConstant.action">
                          <div class="node" :key="index" :title="item.name" :data-id="item.id"
                                :data-type="item.type"
                                :data-group="item.groupType"
                                v-if="!item.hidden">
                              <div class="step-img" :class="item.className"></div>
                              <div class="step-title">{{item.name}}</div>
                          </div>
                      </template>
                      <template v-else-if="flowItem.type === flowTypeConstant.flow">
                          <div class="node node-circle" :key="index" :title="item.name" :data-id="item.id"
                                :data-type="item.type"
                                :data-group="item.groupType"
                                v-if="!item.hidden">
                              <div class="step-img" :class="item.className"></div>
                          </div>
                      </template>
                      <template v-else-if="flowItem.type === flowTypeConstant.condition">
                          <div class="node-square" :key="index" :title="item.name" :data-id="item.id"
                                :data-type="item.type"
                                :data-group="item.groupType"
                                v-if="!item.hidden">
                              <div class="square">
                                  <div class="step-img" :class="item.className"></div>
                              </div>
                          </div>
                      </template>
                  </template>
              </draggable>
          </template>
        </div> -->
      </div>
    </div>
    <el-dialog
      class="dialog-wrap"
      :visible.sync="dialogObj.visible"
      :show-close=false
      width="500px">
      <template v-if="dialogObj.editType === flowItemTypeConstant.list">
        <list-form @handleCheck="handleSelectFlowItem"></list-form>
      </template>
      <template v-else>
        <div slot="title" class="dialog-title">
          <i class="el-icon-arrow-left" v-if="dialogObj.editType !== flowItemTypeConstant.startNode"
            @click="handleGoList"></i>
          <span class="desc">{{dialogObj.editType}}</span>
        </div>
        <div class="dialog-body">
          <template v-if="dialogObj.editType">
            <component v-bind:is="dialogFlowItemComponent" ref="flowEditComponent"
                        :editItem.sync="dialogObj.editForm"></component>
          </template>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="initDialog" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleCreateFlowFormData" size="mini"
          v-if="dialogObj.editType !== flowItemTypeConstant.list">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const FLOW_STEP_LENGTH = 120
const FLOW_LEFT_STEP_LENGTH = 80
import Draggable from './components/Draggable'
import ListForm from './components/listForm'
import StartNodeForm from './components/startNodeForm'
import NodeNodeForm from './components/nodeNodeForm'
import IfNodeForm from './components/ifNodeForm'
import ExpandNodeForm from './components/expandNodeForm'
import {FLOW_ITEM_TYPE, FLOW_ALL_LIST, FLOW_LIST, FLOW_TYPE} from './config'
import {clone, getUUID} from '@/utils'
import { jsPlumb } from 'jsplumb'


export default {
  components: { Draggable, ListForm, StartNodeForm, NodeNodeForm, IfNodeForm, ExpandNodeForm },
  data () {
    return {
      flowTypeConstant: FLOW_TYPE,
      flowAllList: FLOW_ALL_LIST,
      flowList: [],
      flowItemTypeConstant: FLOW_ITEM_TYPE,
      jsPlumbInit: false,
      dragConfig: {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "sortable-ghost" // dragging class
      },
      movingFlowItem: undefined, // moving
      movedFlowItem: undefined, //  moved
      dialogObj: {
        visible: false,
        editType: undefined,
        flowUUid: undefined,
        editForm: undefined,
        isBetween: false,
        flowPreUuid: undefined,
        flowNextUuid: undefined
      },
      canvasDataRoom: 100
    }
  },
  computed: {
    dialogFlowItemComponent() {
      return this.dialogObj.editType + 'Form'
    },
    canvasRoomMinusEnable() {
      return this.canvasDataRoom > 50
    },
    canvasRoomPlusEnable() {
      return this.canvasDataRoom < 100
    },
    canvasRoomScaleStyle() {
      return {
        transform: 'scale(' + this.canvasDataRoom / 100 + ')'
      };
    }
  },
  created () {
  },
  mounted () {
    this.initJsPlumb()
    this.initFlow()
  },
  methods: {
    initJsPlumb() {
      this.$options.jsPlumb = jsPlumb.getInstance()
      this.$options.jsPlumb.ready(() => {
        this.jsPlumbInit = true
        this.$options.jsPlumb.importDefaults({
          ConnectionsDetachable: false,
          LogEnabled: true
        })
      })
    },
    initFlow() {
      const startFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.startNode)
      // console.log(11, JSON.parse(JSON.stringify(this.flowList)))
      this.addTempFlowItem(startFlowUuid)
    },
    // 创建节点
    createFlowItem(type, prev, options) {
      options = options || {}
      let _uuid = getUUID()
      let flowItem = this.getFlowItemByType(type)
      // console.log('flowItem:', JSON.stringify(flowItem))
      let lastItemList = []
      if (flowItem) {
        flowItem.prev = []
        flowItem.next = []
        flowItem.formData = {}
        flowItem.left = (function (){
          const dom = this.$refs.campaignCanvas
          let width = window.getComputedStyle ? parseInt(window.getComputedStyle(dom).width) : dom.style.width
          if (width === 'auto') {
            width = dom.offsetWidth
          }
          return width ? width / 2 : 500
        }).call(this)
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
    draggableFlowConnect(source, target, isNow) {
      let that = this
      function doDraw() {
        if (that.jsPlumbInit) {
          that.$options.jsPlumb.connect({
            source: source,
            target: target,
            endpoint: 'Dot',
            // 连接线的样式
            connectorStyle: {strokeStyle: "#ccc", joinStyle: "round", outlineColor: "#ccc"}, // 链接 style
            // 连接线配置，起点可用
            connector: ["Flowchart", {
              stub: [10, 20],
              gap: 1,
              cornerRadius: 2,
              alwaysRespectStubs: true
            }], //  链接
            //
            endpointStyle: {fill: 'transparent', outlineStroke: 'transparent', outlineWidth: 2},
            // 线的样式
            paintStyle: {stroke: 'lightgray', strokeWidth: 2},
            // 锚点的位置
            anchor: ['BottomCenter', 'TopCenter'],
            // 遮罩层-设置箭头
            overlays: [
              ['PlainArrow', {width: 10, length: 10, location: 1}],
              ['Custom', {
                  location: .5,
                  id: 'nodeTempSmall',
                  create: function () {
                      let $el = that.$refs[target][0].$el
                      $el.dataset.target = target
                      $el.dataset.source = source
                      return $el
                  },
                  visible: false
              }],
              ['Label', {location: 1, id: "flowItemDesc", cssClass: "node-item-label", visible: true}]
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
    },
   /*  // moving
    handleFlowMoveStart (evt) {
      let dataset = evt.item.dataset
      this.movingFlowItem = {
        group: dataset.group,
        type: dataset.type
      }
    },
    // 移动到可添加区域mouseUp展示弹窗
    handleFlowMoveEnd (evt) {
      const originalEvent = evt.originalEvent
      if (this.movedFlowItem) {
        this.movedFlowItem.classList.remove('is-active')
        if (originalEvent.toElement !== this.movedFlowItem) {
          this.movedFlowItem = undefined
          this.movingFlowItem = undefined
          return
        }
        let obj = { flowItemType: this.movingFlowItem.type, flowUuid: this.movedFlowItem.id }
        if (this.movedFlowItem.dataset.source && this.movedFlowItem.dataset.target) {
          obj.isBetween = true
          obj.flowPreUuid = this.movedFlowItem.dataset.source
          obj.flowNextUuid = this.movedFlowItem.dataset.target
          delete obj.flowUuid
        }
        this.showDialog(obj)
      }
      this.movedFlowItem = undefined
      this.movingFlowItem = undefined
    },
    // 将新增节点移动到可添加区域
    handleFlowMoveItem (evt) {
      let $to = evt.to
      let $dragged = evt.dragged
      if ($dragged.dataset.id === FLOW_ITEM_TYPE.startNode) {
        return false
      }
      if (!this.movedFlowItem) {
        this.movedFlowItem = $to
        $to.classList.add('is-active')
      }
      // change target item
      else if (this.movedFlowItem && this.movedFlowItem !== $to) {
        this.movedFlowItem.classList.remove('is-active')
        this.movedFlowItem = $to
        $to.classList.add('is-active')
      }
    }, */
    // 点击节点出现弹窗编辑
    handleEditFlowItem(flowItem, event) {
      let target = event.currentTarget
      if (target.dataset.isClick === 'true') {
        this.showDialog({
          flowItemType: flowItem.type,
          flowUuid: flowItem.uuid,
          flowFormData: flowItem.formData
        })
      }
    },
    // 展示弹窗
    showDialog(obj) {
      if (obj.isBetween) {
        // 往中间添加节点
        this.dialogObj.isBetween = true
        this.dialogObj.flowPreUuid = obj.flowPreUuid
        this.dialogObj.flowNextUuid = obj.flowNextUuid
        this.dialogObj.editType = obj.flowItemType || FLOW_ITEM_TYPE.list
      } else {
        if (obj.flowItemType === FLOW_ITEM_TYPE.endNode) {
          // 添加结束节点
          this.handleAddFlowItem(obj.flowItemType, obj.flowUuid)
          return
        }
        this.dialogObj.editType = obj.flowItemType
        this.dialogObj.flowUUid = obj.flowUuid
        if (obj.flowFormData) {
          // 点击节点编辑
          this.dialogObj.editForm = obj.flowFormData
        }
        if (obj.flowItemType === FLOW_ITEM_TYPE.tempNode) {
          // 点击temp编辑
          this.dialogObj.editType = FLOW_ITEM_TYPE.list
        }
      }
      this.dialogObj.visible = true
    },
    // 点击temp区域展示对话框选择节点触发
    handleSelectFlowItem(flowItem) {
      if (flowItem.type === FLOW_ITEM_TYPE.endNode) {
        if (this.dialogObj.isBetween) {
          // add end flow item and remove next all
          let prevFlowId = this.dialogObj.flowPreUuid
          let nextFlowId = this.dialogObj.flowNextUuid
          this.deleteNextFlowItem(nextFlowId)

          this.$nextTick(() => {
            // temp
            let tempFlowUuid = this.addTempFlowItem(prevFlowId)
            this.$nextTick(() => {
                this.handleAddFlowItem(flowItem.type, tempFlowUuid)
            })
          })
        } else {
          this.handleAddFlowItem(flowItem.type, this.dialogObj.flowUUid)
        }
        this.initDialog()
        return
      }
      this.showDialog({
          flowItemType: flowItem.type,
          flowUuid: this.dialogObj.flowUUid
      });
    },
    // 初始化弹窗: 弹窗取消确定按钮触发
     initDialog() {
      this.dialogObj.visible = false
      this.dialogObj.flowUUid = undefined
      this.dialogObj.editType = undefined
      this.dialogObj.isBetween = false
      this.dialogObj.flowPreUuid = undefined
    },
    // dialog
    handleGoList () {
      this.dialogObj.editType = FLOW_ITEM_TYPE.list
    },
    // 对话框提交
    handleCreateFlowFormData () {
      let $flowEditComponent = this.$refs.flowEditComponent
      if (!$flowEditComponent || !$flowEditComponent.validateFormData) {
        return
      }
      $flowEditComponent.validateFormData().then(() => {
        let formData = $flowEditComponent.formData()
        // 往中间添加节点
        if (this.dialogObj.isBetween) {
          this.handleAddBetweenFlowItem({
              flowItemType: this.dialogObj.editType,
              preFlowId: this.dialogObj.flowPreUuid,
              nextFlowId: this.dialogObj.flowNextUuid,
              formData
          })
        } else {
          let flowItem = this.getFlow(this.dialogObj.flowUUid)
          flowItem.formData = formData
          if (flowItem.type === FLOW_ITEM_TYPE.tempNode) { // tempNode
            // 新增节点
            this.handleAddFlowItem(this.dialogObj.editType, flowItem.uuid)
          } else {
            // 更新节点
            this.handleUpdateFlowItem({
              flowItemType: this.dialogObj.editType,
              tempFlowId: flowItem.uuid
            })
          }
        }
        this.initDialog()
      })
    },
    // 中间添加节点
    handleAddBetweenFlowItem(options) {
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
    // 新增节点: 判断添加哪种节点
    handleAddFlowItem(flowItemType, tempFlowId) {
      let newFlowItem = this.updateFlowItem(flowItemType, tempFlowId)
      this.createFlowConnectionLabel(newFlowItem.prev, newFlowItem.uuid)
      if (this.isOnePreOneNext(newFlowItem)) {
        // 节点
        this.addTempFlowItem(tempFlowId)
      } else if (newFlowItem.groupType === FLOW_TYPE.condition) {
        if (this.isIfFlowItem(flowItemType)) {
          // 条件判断
          this.addIfTempFlowItem(tempFlowId)
        }
        else if (this.isExpandFlowItem(flowItemType)) {
          // 条件分组
          this.addExpandTempFlowItem(tempFlowId, newFlowItem.formData.ruleGroupList)
        }
      }
      return newFlowItem
    },
    // 更新节点
    updateFlowItem(type, preId) {
      // old
      let tempFlowItem = this.getFlow(preId)
      // new
      let newFlowItem = this.getFlowItemByType(type)
      for (let key in newFlowItem) {
          tempFlowItem[key] = newFlowItem[key]
      }
      return tempFlowItem
    },
    createFlowConnectionLabel(sourceList, target) {
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
    // 添加tmp节点
    addTempFlowItem(preUuid) {
      let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid)
      // console.log(22, JSON.parse(JSON.stringify(this.flowList)))
      this.draggableFlowConnect(preUuid, tempFlowUuid)
      return tempFlowUuid
    },
    // 添加条件判断节点
     addIfTempFlowItem (preUuid) {
      let preTempItem = this.getFlow(preUuid)
      let tempFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, {offsetLeft: -FLOW_LEFT_STEP_LENGTH})
      this.draggableFlowConnect(preUuid, tempFlowUuid)
      this.createFlowItemLabel(preUuid, tempFlowUuid, '是')
      preTempItem.nextIfId = tempFlowUuid
      let tempFlowUuid2 = this.createFlowItem(FLOW_ITEM_TYPE.tempNode, preUuid, {offsetLeft: FLOW_LEFT_STEP_LENGTH})
      this.draggableFlowConnect(preUuid, tempFlowUuid2)
      this.createFlowItemLabel(preUuid, tempFlowUuid2, '否')
      preTempItem.nextElseId = tempFlowUuid2
    },
    // 添加条件分组节点
    addExpandTempFlowItem(preUuid, ruleGroups) {
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
    // 中间添加普通节点
    handleAddBetweenCommonFlowItem(opts) {
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
    // 对话框点击确定更新节点
    handleUpdateFlowItem(options) {
      let {flowItemType, tempFlowId} = options

      let preFlowItem = this.getFlow(tempFlowId)
      let isPrevHasMoreNext = false
      // update new flow item
      let newFlowItem = this.updateFlowItem(flowItemType, tempFlowId)
      // if update new flow type
      if (flowItemType !== preFlowItem.type) {
        // update old flow item
        if (this.isHasMoreNextFlowItem(preFlowItem)) {
          isPrevHasMoreNext = true;
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
    },
    // 中间添加普通节点更新
    updateBetweenFlowItem(flowItemUuid, nextFlowId, preFlowId) {
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
    removeFlowConnection(source, target) {
      let lines = this.$options.jsPlumb.getConnections({
        source: source,
        target: target
      })
      lines.forEach((line) => {
        this.$options.jsPlumb.deleteConnection(line, {force: true})
      })
    },
    // 中间添加普通节点连接
    addFlowItemConnect(prevId, nextId) {
      this.draggableFlowConnect(prevId, nextId, true)
      this.createFlowConnectionLabel(prevId, nextId)
    },
    createFlowItemLabel (source, target, label) {
      this.$nextTick(() => {
        let lines = this.$options.jsPlumb.getConnections({
          source: source,
          target: target
        })
        if (lines.length > 0) {
          lines[0].getOverlay("flowItemDesc").setLabel(`<span class="node-item-title" title="${label}">${label}</span>`)
        }
      })
    },
    // 中间添加普通节点移动next节点
    moveFlowItem(flowUuid) {
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
    plumbRepaintEverything() {
      this.$nextTick(() => {
        this.$options.jsPlumb.repaintEverything()
      })
    },
    // 删除下一个节点
    deleteNextFlowItem(flowUuid) {
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
    // 移动添加的节点mouseDown 记录按下时间
     handleFlowMoveDown(evt) {
      const target = evt.currentTarget
      target.dataset.firstTime = new Date().getTime()
    },
    // 移动添加的节点mouseUp 记录移动位置和up时间
    handleChangeFlowPosition(flowItem, evt) {
      const target = evt.currentTarget
      let left = ('' + target.style.left).replace('px', '')
      let top = ('' + target.style.top).replace('px', '')
      flowItem.left = Number(left)
      flowItem.top = Number(top)
      let firstTime = target.dataset.firstTime
      let lastTime = new Date().getTime()
      target.dataset.isClick = lastTime - firstTime < 200
    },
    // 点击删除按钮
    handleDeleteFlowItem(flowItem) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFlowItem(flowItem)
      }).catch(() => {})
    },
    // 删除节点
    deleteFlowItem(flowItem) {
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
    handleDeleteOnePrevOneNextFlowItem(flowItem, idx) {
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
      });
      // prev flow item delete next id
      prevFlowList.forEach((item) => {
        let index = item.next.indexOf(flowItem.uuid)
        item.next.splice(index, 1)
      });
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
    },
    // 获取节点初始配置
    getFlowItemByType (type) {
      let result = null
      for(let key in FLOW_LIST) {
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
    getFlow(flowUuid) {
      return this.flowList.find((item) => item.uuid === flowUuid)
    },
    // find index
    getFlowIndex(flowUuid) {
      return  this.flowList.findIndex((item) => item.uuid === flowUuid)
    },
    // 是条件判断节点和条件分组节点
    isHasMoreNextFlowItem(flowItem) {
      return this.isIfFlowItem(flowItem.type) || this.isExpandFlowItem(flowItem.type)
    },
    // 是条件判断节点
    isIfFlowItem(flowItemType) {
      return flowItemType === FLOW_ITEM_TYPE.ifNode
    },
    // 是条件分组节点
    isExpandFlowItem(flowItemType) {
      return flowItemType === FLOW_ITEM_TYPE.expandNode
    },
    // 是普通节点
    isOnePreOneNext(flowItem) {
      return flowItem.groupType === FLOW_TYPE.action || flowItem.type === FLOW_ITEM_TYPE.waitNode
    },
    // 是结束节点
    isEndFlowItem(flowItem) {
      return flowItem.type === FLOW_ITEM_TYPE.endNode
    }
  }
}
</script>

<style lang="scss">
// jsPlumb样式优化
@import "~@/assets/scss/workflow";
</style>