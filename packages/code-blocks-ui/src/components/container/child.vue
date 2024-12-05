<template>
  <component
    :is="renderComponentCode(element)"
    v-for="(element, index) in block"
    :key="index"
    :data="element.formData"
    :parent="element.parent"
    :children="element.children"
    :viewport="viewport"
  >
    <template #default="{ item }">
      <cb-container-child
        :block="item"
        :viewport="viewport"
      />
    </template>
  </component>
</template>

<script lang="ts">
import { BaseBlock, ComponentViewport } from '@/types/component'
import { createNameSpace } from '@/utils/create-namespace'
import { renderComponentCode } from '@/utils/render-component'
import { defineComponent, PropType } from 'vue-demi'

const { name } = createNameSpace('container-child')

export default defineComponent({
  name,
  props: {
    block: {
      type: Array as PropType<BaseBlock[]>,
      default: () => []
    },
    viewport: {
      type: String as PropType<ComponentViewport>,
      default: 'desktop',
      validator(val: string) {
        return ['desktop', 'mobile'].includes(val)
      }
    }
  },
  methods: {
    renderComponentCode
  }
})
</script>
