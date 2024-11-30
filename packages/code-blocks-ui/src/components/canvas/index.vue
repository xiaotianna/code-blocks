<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item" :style="[itemStyles]">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('canvas')

export default defineComponent({
  name,
  props,
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user',
    }
  },
  computed: {
    classes() {
      return [n()]
    },
    itemComputed() {
      return this.children[0] || []
    },
    display() {
      const display = this.data?.display?.[this.viewport]
      return typeof display === 'boolean' ? display : true
    },
    background() {
      return this.data?.background?.[this.viewport] || ''
    },
    height() {
      return this.data?.height?.[this.viewport] || ''
    },
    styles() {
      return [{ background: this.background }]
    },
    itemStyles() {
      return [{ height: this.height }]
    },
    displayStyle() {
      if (this.platform === 'editor') {
        return !this.display ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !this.display ? { display: 'none' } : {}
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
