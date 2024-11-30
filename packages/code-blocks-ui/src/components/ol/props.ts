import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbOlPropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 列表
   */
  list?: {
    desktop: { text?: string; color?: string }[]
    mobile: { text?: string; color?: string }[]
  }
}

export const props = {
  data: {
    type: Object as PropType<CbOlPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      list: {
        desktop: [],
        mobile: []
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
