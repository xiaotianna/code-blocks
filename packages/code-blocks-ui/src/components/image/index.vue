<template>
  <div
    :class="classes"
    :style="[displayStyle, positionStyle]"
  >
    <cb-link
      v-if="src"
      :to="link"
      target="_blank"
    >
      <img
        v-bind="$attrs"
        :src="src"
        class="image"
        :style="styles"
      />
    </cb-link>
    <div
      v-else
      class="no-image"
    >
      <cb-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import CbEmpty from '../empty'
import CbLink from '../link'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('image')

export default defineComponent({
  name,
  props,
  components: {
    CbEmpty,
    CbLink
  },
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user'
    }
  },
  computed: {
    inCanvas() {
      return this.parent === 'canvas'
    },
    classes() {
      return [
        n(),
        {
          'in-canvas': this.inCanvas,
          'platform-user': this.platform === 'user'
        }
      ]
    },
    display() {
      const display = this.data?.display?.[this.viewport]
      return typeof display === 'boolean' ? display : true
    },
    src() {
      return this.data?.src?.[this.viewport] || ''
    },
    link() {
      return this.data?.link?.[this.viewport] || ''
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
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
