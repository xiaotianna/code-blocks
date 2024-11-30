<template>
  <div
    :class="classes"
    :style="[displayStyle]"
  >
    <ol :class="{ 'no-value': list.length === 0 }">
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="bullet-dot">{{ `${index + 1}.` }}</div>
        <div
          class="li-content"
          :style="{ color: item.color }"
        >
          {{ item.text }}
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('ol')

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
    list() {
      return (
        this.data?.list?.[this.viewport].filter((item) => {
          return item.text
        }) ||
        [
          //   {
          //     text: 'hello',
          //     color: 'red'
          //   },
          //   {
          //     text: 'world',
          //     color: 'blue'
          //   }
        ]
      )
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
