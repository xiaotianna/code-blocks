<template>
  <div
    :class="classes"
    :style="[displayStyle]"
  >
    <div class="content">
      <div
        class="code-box"
        :class="{ 'no-value': !language && !text }"
      >
        <div
          class="language"
          v-if="language"
        >
          {{ language }}
        </div>
        <div
          class="code"
          v-highlight
          v-if="text"
        >
          <pre>
            <div class="pre-number">
            <span
              v-for="(_item, index) in text.split('\n').length"
              :key="index"
              >{{ index + 1 }}</span
            >
          </div>
            <code>{{ text }}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { props } from './props'
import { createNameSpace } from '@/utils/create-namespace'

const { name, n } = createNameSpace('code')

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
    language() {
      return this.data?.language?.[this.viewport] || ''
    },
    text() {
      return this.data?.text?.[this.viewport] || ''
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
