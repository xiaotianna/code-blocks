import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbBlankPropsData = {
  /**
   * 留白是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 留白高度
   */
  height?: {
    desktop: number
    mobile: number
  }
}

export const props = {
  data: {
    type: Object as PropType<CbBlankPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      height: {
        desktop: 0,
        mobile: 0
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
