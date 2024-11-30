import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbCodePropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 编程语言
   */
  language: {
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
}

export const props = {
  data: {
    type: Object as PropType<CbCodePropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      language: {
        desktop: '',
        mobile: ''
      },
      text: {
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
