import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbCanvasPropsData = {
  /**
   * 是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 背景
   */
  background?: {
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
}

export type CbCanvasPropsList = any[][]

export const props = {
  data: {
    type: Object as PropType<CbCanvasPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      background: {
        desktop: '',
        mobile: ''
      },
      height: {
        desktop: '',
        mobile: ''
      }
    })
  },
  children: {
    type: Array as PropType<CbCanvasPropsList>,
    default: () => [[]]
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
