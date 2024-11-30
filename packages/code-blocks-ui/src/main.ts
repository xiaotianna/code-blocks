import { App } from 'vue-demi'
import './style.css'
import '@/assets/styles/reset.scss'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 组件
import CbContainer from '@/components/container'
import CbImage from '@/components/image' // @/components/image/index.ts
import CbVideo from '@/components/video'
import CbText from '@/components/text'
import CbSwiper from '@/components/swiper'
import CbBlank from '@/components/blank'
import CbRow from '@/components/row'
import CbColumn from '@/components/column'
import CbCanvas from '@/components/canvas'
import CbH1 from '@/components/h1'
import CbH2 from '@/components/h2'
import CbH3 from '@/components/h3'
import CbTextMd from '@/components/text_md'
import CbOl from '@/components/ol'
import CbUl from '@/components/ul'
import CbHighBlock from '@/components/high_block'
import CbCode from '@/components/code'
// 组件的JSON Schema
import imageSchema, { CbImageSchema } from '@/components/image/schame'
import videoSchema, { CbVideoSchema } from '@/components/video/schame'
import textSchema, { CbTextSchema } from '@/components/text/schame'
import swiperSchema, { CbSwiperSchema } from '@/components/swiper/schame'
import blankSchema, { CbBlankSchema } from '@/components/blank/schame'
import rowSchema, { CbRowSchema } from '@/components/row/schame'
import columnSchema, { CbColumnSchema } from '@/components/column/schame'
import canvasSchema, { CbCanvasSchema } from '@/components/canvas/schame'
import h1Schema, { CbH1Schema } from '@/components/h1/schame'
import h2Schema, { CbH2Schema } from '@/components/h2/schame'
import h3Schema, { CbH3Schema } from '@/components/h3/schame'
import textMdSchema, { CbTextMdSchema } from '@/components/text_md/schame'
import olSchema, { CbOlSchema } from '@/components/ol/schame'
import ulSchema, { CbUlSchema } from '@/components/ul/schame'
import highBlockSchema, {
  CbHighBlockSchema
} from '@/components/high_block/schame'
import codeSchema, { CbCodeSchema } from '@/components/code/schame'
// 常量
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from '@/config/constant'
// 工具函数
import { schemaAllViewport as _schemaAllViewport } from './utils/schema-viewport'
import { highlight } from './utils/highlight'

// 暴露的JSON Schema（组件的JSON Schema只是暴露给宿主环境editor使用，不在内部ui中使用）
export const schema = {
  image: imageSchema,
  video: videoSchema,
  text: textSchema,
  swiper: swiperSchema,
  blank: blankSchema,
  row: rowSchema,
  column: columnSchema,
  canvas: canvasSchema,
  h1: h1Schema,
  h2: h2Schema,
  h3: h3Schema,
  text_md: textMdSchema,
  ol: olSchema,
  ul: ulSchema,
  high_block: highBlockSchema,
  code: codeSchema
}
// 暴露的JSON Schema类型
export type CbComponentSchema = {
  image: CbImageSchema
  video: CbVideoSchema
  text: CbTextSchema
  swiper: CbSwiperSchema
  blank: CbBlankSchema
  row: CbRowSchema
  column: CbColumnSchema
  canvas: CbCanvasSchema
  h1: CbH1Schema
  h2: CbH2Schema
  h3: CbH3Schema
  text_md: CbTextMdSchema
  ol: CbOlSchema
  ul: CbUlSchema
  high_block: CbHighBlockSchema
  code: CbCodeSchema
}

// 暴露常量
export const COMPONENT_PREFIX = _COMPONENT_PREFIX
// 暴露工具函数
export const schemaAllViewport = _schemaAllViewport

// 组件注册
export const componentObject = {
  CbContainer,
  CbImage,
  CbVideo,
  CbText,
  CbBlank,
  CbSwiper,
  CbRow,
  CbColumn,
  CbCanvas,
  CbH1,
  CbH2,
  CbH3,
  CbTextMd,
  CbOl,
  CbUl,
  CbHighBlock,
  CbCode
}

const components = Object.values(componentObject)

const install = (app: App, options: { platform: 'editor' | 'user' }) => {
  components.forEach((component) => {
    const { name } = component
    if (name) app.component(name, component)
  })
  app.use(highlight)
  // platform会注入到所有组件, 在组件中通过 inject('platform') 获取
  // app.provide('platform', options.platform)
  // 由于该组件库是同时兼容vue2和vue3的，但是provide是vue3的内容，所以该用localStorage来代替provide
  localStorage.setItem('$platform', options.platform)
}

// 暴露组件
// export default {
//   install,
//   CbImage,
//   CbVideo,
//   CbText,
//   CbBlank,
//   CbSwiper,
//   CbRow,
//   CbColumn,
//   CbCanvas
// }
export default {
  install,
  ...componentObject
}
