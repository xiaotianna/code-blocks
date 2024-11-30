import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbH3PropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
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
   * 颜色
   */
  color?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<CbH3PropsData>,
    default: () => ({
      display: {
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
