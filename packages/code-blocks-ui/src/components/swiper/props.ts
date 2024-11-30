import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbSwiperPropsData = {
  /**
   * 幻灯片是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 幻灯片数据
   */
  swiper?: {
    desktop: { src?: string; link?: string }[]
    mobile: { src?: string; link?: string }[]
  }
}

export const props = {
  data: {
    type: Object as PropType<CbSwiperPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      swiper: {
        desktop: [],
        mobile: []
      }
    })
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
