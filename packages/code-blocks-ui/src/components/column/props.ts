import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbColumnPropsData = {
  /**
   * 列数信息
   */
  cols?: {
    desktop: number[]
    mobile: number[]
  }
  /**
   * 背景
   */
  background: {
    desktop: string
    mobile: string
  }
}

export type MoColumnPropsList = any[][]

export const props = {
  data: {
    type: Object as PropType<CbColumnPropsData>,
    default: () => ({
      cols: {
        desktop: [0.5, 0.5],
        mobile: [0.5, 0.5]
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
    validator: (val: string) => {
      return ['desktop', 'mobile'].includes(val)
    }
  },
  children: {
    type: Array as PropType<MoColumnPropsList>,
    default: () => [[], []]
  }
}
