<template>
  <div class="edit-block">
    <!-- 左侧菜单 -->
    <div class="left">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        :class="{ 'is-active': index === activeMenu }"
        @click="activeMenu = index"
      >
        <v-icon
          class="menu-icon"
          :icon="
            index === activeMenu
              ? icon[item.iconActive as ConfigIcon]
              : icon[item.icon as ConfigIcon]
          "
        />
        <div class="menu-name">{{ item.name }}</div>
      </div>
    </div>
    <!-- 物料区域：可拖拽 -->
    <div class="right">
      <el-collapse v-model="activeNames" v-show="activeMenu === 0">
        <el-collapse-item title="基础组件" name="1" v-show="!isCanvasCurrentSelect">
          <editor-block-drag
            :list="baseBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item title="高级组件" name="2" v-show="!isCanvasCurrentSelect">
          <editor-block-drag
            :list="seniorBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <!-- 画布组件：用于渲染canvas组件可选择的物料 -->
        <el-collapse-item title="画布组件 (点击选择)" name="3" v-show="isCanvasCurrentSelect">
          <editor-block-canvas :list="canvasBlockList" />
        </el-collapse-item>
        <el-collapse-item title="Markdown组件" name="4" v-show="!isCanvasCurrentSelect">
          <editor-block-drag
            :list="MdBlockList"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
      </el-collapse>
      <editor-block-package v-if="activeMenu === 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import vIcon from '@/components/base/v-icon.vue'
import editorBlockDrag from './editor-block-drag.vue'
import editorBlockCanvas from './editor-block-canvas.vue'
import editorBlockPackage from './editor-block-package.vue'
import { baseBlocks, seniorBlocks, markdownBlocks, canvasBlocks } from '@/config/block'
import icon, { type ConfigIcon } from '@/config/icon'
import { dragGroup } from './nested'
import { computed, ref } from 'vue'
import { useEditStore } from '@/stores/editor'

const edit = useEditStore()

const menuList = ref([
  {
    icon: 'block',
    iconActive: 'blockActive',
    name: '组件'
  },
  {
    icon: 'kit',
    iconActive: 'kitActive',
    name: '套件'
  }
])

const activeMenu = ref(0)
const activeNames = ref(['1', '2', '3', '4'])

const isCanvasCurrentSelect = computed(() => edit.currentSelect?.code === 'canvas')

// 物料区块
// 基础组件
const baseBlockList = ref(baseBlocks)
// 高级组件
const seniorBlockList = ref(seniorBlocks)
// 画布组件
const canvasBlockList = ref(canvasBlocks)
// Markdown组件
const MdBlockList = ref(markdownBlocks)
</script>

<style lang="scss" scoped>
.edit-block {
  position: fixed;
  top: var(--edit-header-height);
  left: 0;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-start;
  width: var(--edit-block-width);
  .left {
    width: 70px;
    height: calc(100vh - var(--edit-header-height));
    border-right: 1px solid var(--color-border);
    padding-top: 7.5px;
    overflow-y: auto;
    .menu-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding: 5.5px 0;
      border-radius: var(--border-radius);
      cursor: pointer;
      margin: 10px 5px;
      &.is-active,
      &:hover {
        background: var(--color-block-hover);
        border-radius: var(--border-radius);
      }
      .menu-icon {
        width: 25px;
        height: 25px;
        margin: 0 auto;
      }
      .menu-name {
        font-size: 14px;
        line-height: 14px;
        padding-top: 4px;
      }
    }
  }
  .right {
    flex: 1;
    height: calc(100vh - var(--edit-header-height));
    overflow: auto;
  }
  :deep(.el-collapse) {
    border: 0;
  }
  :deep(.el-collapse-item__header) {
    padding-left: 14px;
    font-size: 14px;
  }
  :deep(.el-collapse-item__content) {
    padding-left: 14px;
    padding-right: 14px;
    padding-bottom: 14px;
  }
}
</style>
