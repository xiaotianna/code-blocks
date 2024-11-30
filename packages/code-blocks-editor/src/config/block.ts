// 物料区
import type { BaseBlock } from '@/types/editor'
import icon from './icon'

const {
  row,
  column,
  image,
  video,
  text,
  swiper,
  blank,
  canvas,
  h1,
  h2,
  h3,
  text_md,
  ol,
  ul,
  high_block,
  code
} = icon

// 基础组件
export const baseBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: image,
    formData: {}
  },
  {
    id: '',
    name: '视频',
    code: 'video',
    icon: video,
    formData: {}
  },
  {
    id: '',
    name: '富文本',
    code: 'text',
    icon: text,
    formData: {}
  },
  {
    id: '',
    name: '幻灯片',
    code: 'swiper',
    icon: swiper,
    formData: {}
  },
  {
    id: '',
    name: '留白',
    code: 'blank',
    icon: blank,
    formData: {}
  }
]

// 高级组件
export const seniorBlocks: BaseBlock[] = [
  {
    id: '',
    name: '多行',
    code: 'row',
    icon: row,
    nested: true,
    children: [[]],
    formData: {}
  },
  {
    id: '',
    name: '多列',
    code: 'column',
    icon: column,
    nested: true,
    children: [[], []],
    formData: {}
  },
  {
    id: '',
    name: '画布',
    code: 'canvas',
    icon: canvas,
    nested: true,
    children: [[]],
    formData: {}
  }
]

// 画布组件
export const canvasBlocks: BaseBlock[] = [
  {
    id: '',
    name: '图片',
    code: 'image',
    icon: 'image',
    formData: {},
    parent: 'canvas'
  },
  {
    id: '',
    name: '文本',
    code: 'text',
    icon: 'text',
    formData: {},
    parent: 'canvas'
  }
]

// Markdown组件
export const markdownBlocks: BaseBlock[] = [
  {
    id: '',
    name: '一级',
    code: 'h1',
    icon: h1,
    formData: {}
  },
  {
    id: '',
    name: '二级',
    code: 'h2',
    icon: h2,
    formData: {}
  },
  {
    id: '',
    name: '三级',
    code: 'h3',
    icon: h3,
    formData: {}
  },
  {
    id: '',
    name: '正文',
    code: 'text_md',
    icon: text_md,
    formData: {}
  },
  {
    id: '',
    name: '有序',
    code: 'ol',
    icon: ol,
    formData: {}
  },
  {
    id: '',
    name: '无序',
    code: 'ul',
    icon: ul,
    formData: {}
  },
  {
    id: '',
    name: '高亮块',
    code: 'high_block',
    icon: high_block,
    formData: {}
  },
  {
    id: '',
    name: '代码块',
    code: 'code',
    icon: code,
    formData: {}
  }
]
