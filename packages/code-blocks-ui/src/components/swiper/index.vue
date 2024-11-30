<template>
  <div
    :class="classes"
    :style="displayStyle"
  >
    <swiper-container v-if="swiper && swiper.length">
      <swiper-slide
        v-for="(item, index) in swiper"
        :key="index"
      >
        <img
          v-bind="$attrs"
          :src="item.src"
          class="image"
          :style="styles"
        />
      </swiper-slide>
    </swiper-container>
    <div
      v-else
      class="no-swiper"
    >
      <cb-empty description="暂无数据，请选择" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { props } from './props'
import CbEmpty from '../empty'
import { createNameSpace } from '@/utils/create-namespace'
import { register } from 'swiper/element/bundle'

register()

const { name, n } = createNameSpace('swiper')

export default defineComponent({
  name,
  props,
  components: {
    CbEmpty,
    SwiperContainer: Swiper,
    SwiperSlide
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
    swiper() {
      return (
        this.data?.swiper?.[this.viewport].filter((item) => {
          return item.src
        }) || []
      )
    },
    styles() {
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
