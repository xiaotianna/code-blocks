<template>
  <div :class="classes" :style="styles">
    <cb-container-child :block="block" :viewport="viewport" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import CbContainerChild from './child.vue'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('container')

export default defineComponent({
  name,
  props,
  components: {
    CbContainerChild,
  },
  computed: {
    classes() {
      return [n()]
    },
    block() {
      return this.content?.block || []
    },
    page() {
      return this.content?.page || {}
    },
    styles() {
      return { background: this.page?.background[this.viewport] }
    },
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
