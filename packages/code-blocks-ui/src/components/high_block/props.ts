import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbHighBlockPropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 前缀图标
   */
  prefixIcon?: {
    desktop: string
    mobile: string
  }
  /**
   * 文本
   */
  text?: {
    desktop: string
    mobile: string
  }
  /**
   * 文本颜色
   */
  color?: {
    desktop: string
    mobile: string
  }
  /**
   * 背景颜色
   */
  background?: {
    desktop: string
    mobile: string
  }
  /**
   * 边框颜色
   */
  borderColor?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<CbHighBlockPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      prefixIcon: {
        desktop: '',
        mobile: ''
      },
      text: {
        desktop: '',
        mobile: ''
      },
      color: {
        desktop: '',
        mobile: ''
      },
      background: {
        desktop: '',
        mobile: ''
      },
      borderColor: {
        desktop: '',
        mobile: ''
      }
    })
  },
  parent: {
    type: String,
    default: ''
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator: (val: string) => {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
