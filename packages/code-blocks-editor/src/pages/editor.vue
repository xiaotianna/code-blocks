<template>
  <div class="editor">
    <!-- 头部 -->
    <editor-header />
    <!-- 主体 -->
    <div class="container" :class="classes">
      <!-- block 物料区 -->
      <editor-block />
      <!-- render 渲染区 -->
      <editor-render />
      <!-- config 配置区 -->
      <editor-config />
    </div>
  </div>
</template>

<script setup lang="ts">
import editorHeader from '@/components/editor/editor-header.vue'
import editorBlock from '@/components/editor/editor-block.vue'
import editorRender from '@/components/editor/editor-render.vue'
import editorConfig from '@/components/editor/editor-config.vue'
import { computed } from 'vue'
import { useEditStore } from '@/stores/editor'

const edit = useEditStore()

const classes = computed(() => {
  return { 'mobile-background': edit.isMobileViewport }
})
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --edit-header-height: 64px;
  --edit-block-width: 300px;
  .container {
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
