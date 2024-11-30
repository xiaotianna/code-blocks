import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbImagePropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片地址
   */
  src?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片链接
   */
  link?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片宽度
   */
  width?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片高度
   */
  height?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片居左
   */
  top?: {
    desktop: string
    mobile: string
  }
  /**
   * 图片居上
   */
  left?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<CbImagePropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      src: {
        desktop: '',
        mobile: ''
      },
      link: {
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
    validator: (val: string) => {
      return ['desktop', 'mobile'].includes(val)
    }
  }
}
