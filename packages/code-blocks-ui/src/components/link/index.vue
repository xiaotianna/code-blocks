<template>
  <component :is="tag" :class="classes" v-bind="$attrs" :href="to" :to="to" :target="target">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('link')

export default defineComponent({
  name,
  props,
  computed: {
    classes() {
      return [n()]
    },
    isExternalLink() {
      return this.to.match(/^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/)
    },
    tag() {
      if (!this.to) return 'span'
      return this.isExternalLink ? 'a' : 'router-link'
    },
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
