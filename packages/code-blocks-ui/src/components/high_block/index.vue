<template>
  <div
    :class="classes"
    :style="[displayStyle]"
  >
    <div class="content">
      <div
        class="box"
        :style="[style]"
        :class="{ 'no-value': !text }"
      >
        <div
          class="prefix-icon"
          v-if="prefixIcon"
        >
          {{ prefixIcon }}
        </div>
        <div class="text">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('high_block')

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
    displayStyle() {
      if (this.platform === 'editor') {
        return !this.display ? { opacity: 0.4, filter: 'brightness(0.7)' } : {}
      } else {
        return !this.display ? { display: 'none' } : {}
      }
    },
    prefixIcon() {
      return this.data?.prefixIcon?.[this.viewport] || ''
    },
    text() {
      return this.data?.text?.[this.viewport] || ''
    },
    color() {
      return this.data?.color?.[this.viewport] || ''
    },
    background() {
      return this.data?.background?.[this.viewport] || '#fff5eb'
    },
    borderColor() {
      return this.data?.borderColor?.[this.viewport] || '#fed4a4'
    },
    style() {
      return {
        color: this.color,
        background: this.background,
        borderColor: this.borderColor
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
