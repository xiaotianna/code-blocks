<template>
  <component v-if="layout" :is="layout">
    <slot />
  </component>
  <slot v-else />
</template>

<script setup lang="ts">
import { batchDynamicComponents } from '@/utils'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = ref()

watch(
  () => route.meta.layout,
  (value: string | unknown) => {
    const name = value ? 'layout-' + value : ''
    const component = batchDynamicComponents(name, import.meta.glob('@/components/layout/**/*.vue'))
    layout.value = component
  },
  { immediate: true }
)
</script>
