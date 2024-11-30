<template>
  <div class="edit-config" :class="{ 'is-show': edit.configPanelShow }">
    <div class="icon-group">
      <v-icon-tooltip
        :icon="icon.expand"
        :content="edit.configPanelShow ? '收起侧边栏' : '展开侧边栏'"
        @click="panelSwitch"
      />
    </div>
    <div class="content">
      <!-- 动画组件：transition-group -->
      <transition-group name="fade">
        <div class="title" v-if="edit.currentSelect?.id">{{ edit.currentSelect.name }}组件</div>
        <div class="title" v-else>页面</div>
        <editor-config-block v-if="edit.currentSelect?.id" />
        <editor-config-page v-else />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/editor'
import vIconTooltip from '@/components/base/v-icon-tooltip.vue'
import editorConfigBlock from './editor-config-block.vue'
import editorConfigPage from './editor-config-page.vue'
import icon from '@/config/icon'
import { watch } from 'vue'
import type { BaseBlock } from '@/types/editor'

const edit = useEditStore()

const panelSwitch = () => {
  edit.setConfigPanelShow(!edit.configPanelShow)
}

// 当前选中渲染区组件时，打开编辑面板
watch(
  () => edit.currentSelect,
  (value: BaseBlock | null) => {
    if (value?.id) {
      edit.setConfigPanelShow(true)
    }
  },
  { deep: true }
)

watch(
  () => edit.configPanelShow,
  (value: boolean) => {
    if (!value) edit.setCurrentSelect({})
  }
)

// 移动端自动打开配置面板
watch(
  () => edit.isMobileViewport,
  (value: boolean) => {
    if (value) edit.setConfigPanelShow(true)
  }
)
</script>

<style lang="scss" scoped>
.edit-config {
  position: fixed;
  z-index: 200;
  top: var(--edit-header-height);
  right: -280px;
  width: 280px;
  background: white;
  border-left: 1px solid var(--color-border);
  transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  height: calc(100vh - var(--edit-header-height));

  &.is-show {
    right: 0;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  }

  .icon-group {
    position: absolute;
    left: -48px;
    top: 16px;
    .icon {
      cursor: pointer;
      width: 32px;
      height: 32px;
      padding: 3px;
      border-radius: var(--border-radius);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      transition: all 0.2s linear;
      border: 1px solid var(--color-border);
      background: white;
      & + .icon {
        margin-top: 10px;
      }
      &:hover {
        background: var(--color-icon-hover);
        transition: all 0.2s linear;
      }
    }
  }

  .content {
    overflow-y: auto;
    width: 100%;
    height: 100%;

    .title {
      padding: 14px;
      font-size: 20px;
      font-weight: 600;
    }

    :deep(.el-tabs--border-card) {
      border: 0;
    }
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
}
</style>
