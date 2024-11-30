<template>
  <div :class="classes" :style="[displayStyle, positionStyle]">
    <div v-html="text" class="text ql-editor" :style="styles" :class="{ 'no-value': !text }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('text')

export default defineComponent({
  name,
  props,
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user',
    }
  },
  computed: {
    inCanvas() {
      return this.parent === 'canvas'
    },
    classes() {
      return [n(), { 'in-canvas': this.inCanvas, 'platform-user': this.platform === 'user' }]
    },
    display() {
      const display = this.data?.display?.[this.viewport]
      return typeof display === 'boolean' ? display : true
    },
    text() {
      return this.data?.text?.[this.viewport] || ''
    },
    width() {
      return this.data?.width?.[this.viewport] || ''
    },
    height() {
      return this.data?.height?.[this.viewport] || ''
    },
    top() {
      return this.data?.top?.[this.viewport] || ''
    },
    left() {
      return this.data?.left?.[this.viewport] || ''
    },
    styles() {
      return { width: this.width, height: this.height }
    },
    positionStyle() {
      if (this.platform !== 'editor') {
        return { top: this.top, left: this.left }
      }
      return {}
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
