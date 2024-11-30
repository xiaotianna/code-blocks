<template>
  <div :class="classes" :style="displayStyle">
    <template v-if="src">
      <video
        v-bind="$attrs"
        :src="src"
        :autoplay="autoplay"
        :muted="muted"
        :controls="false"
        playsinline
        class="video"
        :style="styles"
      />
    </template>
    <div v-else class="no-video">
      <cb-empty description="暂无视频，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import CbEmpty from '../empty'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('video')

export default defineComponent({
  name,
  props,
  components: {
    CbEmpty,
  },
  data() {
    return {
      platform: localStorage.getItem('$platform') || 'user',
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
    src() {
      return this.data?.src?.[this.viewport] || ''
    },
    autoplay() {
      return this.data?.autoplay?.[this.viewport] || false
    },
    muted() {
      return this.data?.muted?.[this.viewport] || false
    },
    width() {
      return this.data?.width?.[this.viewport] || ''
    },
    height() {
      return this.data?.height?.[this.viewport] || ''
    },
    styles() {
      return { width: this.width, height: this.height }
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
