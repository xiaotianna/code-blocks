<template>
  <div :class="classes" :style="styles">
    <div class="item" v-for="(item, index) in cols" :key="index" :style="itemStyle(item)">
      <slot :item="itemComputed(index)"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('column')

export default defineComponent({
  name,
  props,
  computed: {
    classes() {
      return [n()]
    },
    itemComputed() {
      return (index: number) => this.children?.[index] || []
    },
    cols() {
      return this.data?.cols?.[this.viewport] || [0.5, 0.5]
    },
    background() {
      return this.data?.background?.[this.viewport] || ''
    },
    styles() {
      return { background: this.background }
    },
    itemStyle() {
      return (item: number | string) => ({
        width: Number(item) * 100 + '%',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
