import { BaseBlock, ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbContainerPropsContent = {
  /**
   * 图片是否在对应屏幕显示
   */
  block: BaseBlock[]
  page: any
}

export const props = {
  /**
   * 数据
   */
  content: {
    type: Object as PropType<CbContainerPropsContent>,
    default: () => []
  },
  viewport: {
    type: String as PropType<ComponentViewport>,
    default: 'desktop',
    validator(val: string) {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
