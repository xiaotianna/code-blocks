<template>
  <div
    :class="classes"
    :style="[style, displayStyle]"
  >
    <h2
      style="font-size: 24px"
      class="text"
      :class="{ 'no-value': !text }"
    >
      {{ text }}
    </h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('h2')

export default defineComponent({
  name,
  props,
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user'
    }
  },
  computed: {
    classes() {
      return [
        n(),
        {
          'platform-user': this.platform === 'user'
        }
      ]
    },
    display() {
      const display = this.data?.display?.[this.viewport]
      return typeof display === 'boolean' ? display : true
    },
    text() {
      return this.data?.text?.[this.viewport] || ''
    },
    style() {
      return { color: this.data?.color?.[this.viewport] }
    },
    displayStyle() {
      if (this.platform === 'editor') {
        return !this.display ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !this.display ? { display: 'none' } : {}
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
