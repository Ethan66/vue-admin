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
import ListForm from './components/listForm'
import StartNodeForm from './components/startNodeForm'
import NodeNodeForm from './components/nodeNodeForm'
import IfNodeForm from './components/ifNodeForm'
import ExpandNodeForm from './components/expandNodeForm'
import Draggable from './components/Draggable'
import { FLOW_ITEM_TYPE, FLOW_ALL_LIST, FLOW_TYPE } from './config'
import { jsPlumb } from 'jsplumb'
import mixins from './methods/mixins'

export default {
  components: { Draggable, ListForm, StartNodeForm, NodeNodeForm, IfNodeForm, ExpandNodeForm },
  mixins: [mixins],
  data () {
    return {
      flowTypeConstant: FLOW_TYPE,
      flowAllList: FLOW_ALL_LIST,
      flowList: [],
      flowItemTypeConstant: FLOW_ITEM_TYPE,
      jsPlumbInit: false,
      dragConfig: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'sortable-ghost' // dragging class
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
      }
    }
  },
  computed: {
    dialogFlowItemComponent () {
      return this.dialogObj.editType + 'Form'
    }
  },
  mounted () {
    this.initJsPlumb()
    this.initFlow()
    /* this.flowList = [{"type":"startNode","className":"step-start","name":"start","groupType":"flow","hidden":true,"prev":[],"next":["9d8589f5-cb94-436a-8db0-acbe51d98e24"],"formData":{},"left":507,"top":30,"uuid":"8b298bf8-3fc1-46f4-8939-04353fd38958"},{"type":"nodeNode","className":"step-tag","name":"节点","groupType":"action","prev":["8b298bf8-3fc1-46f4-8939-04353fd38958"],"next":["349ca26e-17d4-432d-8274-9f2b3f17eec8"],"formData":{"stepName":"节点"},"left":510,"top":154,"uuid":"9d8589f5-cb94-436a-8db0-acbe51d98e24"},{"type":"tempNode","className":"step-temp","name":"temp","groupType":"temp","prev":["9d8589f5-cb94-436a-8db0-acbe51d98e24"],"next":[],"formData":{},"left":507,"top":270,"uuid":"349ca26e-17d4-432d-8274-9f2b3f17eec8"}]
    this.flowList.forEach(item => {
      if (item.uuid && item.prev.length) {
        this.$nextTick(() => {
            this.$options.jsPlumb.draggable(item.uuid, {})
            this.draggableFlowConnect(item.prev[0], item.uuid)
            if (item.type !== 'tempNode') {
              setTimeout(() => {
                this.createFlowConnectionLabel(item.prev, item.uuid)
              }, 1000)
            }
          })
        }
      }) */
  },
  methods: {
    initJsPlumb () {
      this.$options.jsPlumb = jsPlumb.getInstance()
      this.$options.jsPlumb.ready(() => {
        this.jsPlumbInit = true
        this.$options.jsPlumb.importDefaults({
          ConnectionsDetachable: false,
          LogEnabled: true
        })
      })
    },
    initFlow () {
      const startFlowUuid = this.createFlowItem(FLOW_ITEM_TYPE.startNode)
      // console.log(11, JSON.parse(JSON.stringify(this.flowList)))
      this.addTempFlowItem(startFlowUuid)
    },
    // 点击节点出现弹窗编辑
    handleEditFlowItem (flowItem, event) {
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
    showDialog (obj) {
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
    handleSelectFlowItem (flowItem) {
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
      })
    },
    // 初始化弹窗: 弹窗取消确定按钮触发
    initDialog () {
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
      debugger
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
    // 移动添加的节点mouseDown 记录按下时间
    handleFlowMoveDown (evt) {
      const target = evt.currentTarget
      target.dataset.firstTime = new Date().getTime()
    },
    // 移动添加的节点mouseUp 记录移动位置和up时间
    handleChangeFlowPosition (flowItem, evt) {
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
    handleDeleteFlowItem (flowItem) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFlowItem(flowItem)
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
// jsPlumb样式优化
@import "~@/assets/scss/workflow";
.demo{
  background: #fff;
}
</style>
