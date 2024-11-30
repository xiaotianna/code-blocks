import { ComponentViewport } from '@/types/component'
import { PropType } from 'vue-demi'

export type CbVideoPropsData = {
  /**
   * 视频是否在对应屏幕显示
   */
  display?: {
    desktop: string
    mobile: string
  }
  /**
   * 视频地址
   */
  src?: {
    desktop: string
    mobile: string
  }
  /**
   * 视频自动播放
   */
  autoplay?: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 视频静音
   */
  muted?: {
    desktop: boolean
    mobile: boolean
  }
  /**
   * 视频宽度
   */
  width?: {
    desktop: string
    mobile: string
  }
  /**
   * 视频高度
   */
  height?: {
    desktop: string
    mobile: string
  }
}

export const props = {
  data: {
    type: Object as PropType<CbVideoPropsData>,
    default: () => ({
      display: {
        desktop: '',
        mobile: ''
      },
      src: {
        desktop: '',
        mobile: ''
      },
      autoplay: {
        desktop: true,
        mobile: true
      },
      muted: {
        desktop: true,
        mobile: true
      },
      width: {
        desktop: '',
        mobile: ''
      },
      height: {
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
  }
}
