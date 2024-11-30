<template>
  <div
    :class="classes"
    :style="displayStyle"
  >
    <div
      v-if="height"
      class="blank"
      :style="styles"
    ></div>
    <div
      v-else
      class="no-blank"
    >
      <cb-empty description="暂无数值，请选择" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import CbEmpty from '../empty'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('blank')

export default defineComponent({
  name,
  props,
  components: {
    CbEmpty
  },
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user'
    }
  },
  computed: {
    classes() {
      return [n()]
    },
    display() {
      const display = this.data?.display?.[this.viewport]
      return typeof display === 'boolean' ? display : true
    },
    height() {
      return this.data?.height?.[this.viewport] || ''
    },
    styles() {
      return { height: this.height + 'px' }
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
