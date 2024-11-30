import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbRowPropsData = {
  /**
   * 图片是否在对应屏幕显示
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
}

export type CbRowPropsList = any[][]

export const props = {
  data: {
    type: Object as PropType<CbRowPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      background: {
        desktop: '',
        mobile: ''
      }
    })
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    }
  },
  children: {
    type: Array as PropType<CbRowPropsList>,
    default: () => [[]]
  }
}
