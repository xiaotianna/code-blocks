<template>
  <div class="edit-render-drag" ref="box">
    <template v-for="(element, index) in list" :key="index">
      <editor-render-canvas-item :box="box" :element="element" :parent="parent" />
    </template>
  </div>
</template>

<script setup lang="ts">
import editorRenderCanvasItem from './editor-render-canvas-item.vue'
import type { BaseBlock } from '@/types/editor'
import { ref, type PropType } from 'vue'

defineProps({
  list: {
    type: Array as PropType<BaseBlock[]>,
    required: true,
    default: () => []
  },
  parent: {
    type: String,
    default: ''
  }
})

const box = ref<HTMLElement>()
</script>

<style lang="scss" scoped>
.edit-render-drag {
  width: 100%;
  height: 100%;
  .element {
    position: relative;
  }
}
.nested-item {
  border: 1px solid var(--color-edit-render-block-border);
  height: 100%;
  min-height: inherit;
  & + .nested-item {
    border-left: 0;
  }
}
.block-nested-render,
.block-render {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.block-nested-render {
  &:hover,
  &.is-active {
    // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
    border: 1px dashed var(--color-edit-render-block-border-hover);
  }
}
.block-render {
  position: relative;
  &:hover,
  &.is-active {
    // 在表面蒙上一层，加上边框，防止组件可以交互
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--color-edit-render-block-border-hover);
    }
  }
}
</style>
