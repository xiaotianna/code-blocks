import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbTextPropsData = {
  /**
   * 是否在对应屏幕显示
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
   * 宽度
   */
  width?: {
    desktop: string
    mobile: string
  }
  /**
   * 高度
   */
  height?: {
    desktop: string
    mobile: string
  }
  /**
   * 居左
   */
  top?: {
    desktop: string
    mobile: string
  }
  /**
   * 居上
   */
  left?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<CbTextPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      text: {
        desktop: '',
        mobile: ''
      },
      width: {
        desktop: '',
        mobile: ''
      },
      height: {
        desktop: '',
        mobile: ''
      },
      top: {
        desktop: '',
        mobile: ''
      },
      left: {
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
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
