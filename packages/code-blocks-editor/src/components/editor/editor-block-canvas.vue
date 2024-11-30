<template>
  <div class="edit-block-drag">
    <div
      v-for="(element, index) in list"
      :key="index"
      class="block-item"
      @click="handleClick(element)"
    >
      <v-icon class="block-icon" :icon="icon[element.icon as ConfigIcon]" />
      <div class="block-name" v-html="element.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseBlock } from '@/types/editor'
import { clone, findNodeById } from './nested'
import { useEditStore } from '@/stores/editor'
import type { PropType } from 'vue'
import { cloneDeep } from 'lodash-es'
import icon, { type ConfigIcon } from '@/config/icon'

const edit = useEditStore()

defineProps({
  list: {
    type: Array as PropType<BaseBlock[]>,
    required: true,
    default: () => []
  }
})

const handleClick = (element: BaseBlock) => {
  if (!edit.currentSelect) return
  const newBlockConfig = findNodeById(edit.blockConfig, edit.currentSelect.id!, (params) => {
    const { array, node, index } = params
    const newNode = cloneDeep(node)
    newNode.children![0].push(clone(element))
    array[index] = newNode
    edit.setCurrentSelect(newNode)
  })
  edit.setBlockConfig(newBlockConfig)
}
</script>

<style lang="scss" scoped>
.edit-block-drag {
  display: flex;
  flex-wrap: wrap;
  .block-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    width: 33.333%;
    aspect-ratio: 1 / 1;
    text-align: center;
    padding: 10px;
    border-radius: var(--border-radius);

    &:hover {
      background: var(--color-block-hover);
      border: 1px solid var(--color-border);
    }
    .block-icon {
      width: 20px;
      height: 20px;
      margin: 0 auto;
    }
    .block-name {
      font-size: 14px;
      line-height: 14px;
      padding-top: 4px;
      white-space: nowrap;
    }
  }
}
.ghost-class {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  background: var(--color-active-bg);
  border: 1px solid var(--color-active-text);
  img,
  svg {
    width: 20px;
    height: 20px;
    margin: 0 auto;
  }
}
</style>
