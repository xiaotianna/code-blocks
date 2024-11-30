<template>
  <div :class="classes">
    <img :src="src" class="image" />
    <div class="description" v-html="description" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import noDataIcon from '@/assets/images/no-data.png'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace';

const { name, n } = createNameSpace('empty')

export default defineComponent({
  name,
  props,
  computed: {
    classes() {
      return [n()]
    },
    src() {
      return this.image || noDataIcon
    },
  },
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
