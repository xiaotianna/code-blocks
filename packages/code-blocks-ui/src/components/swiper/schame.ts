import { schemaAllViewport } from '@/utils/schema-viewport'
import { Type, type Static } from '@sinclair/typebox'

const display = Type.Boolean({
  code: 'config-viewport',
  title: '屏幕',
  default: true,
  errorMessage: {
    required: '选择一项即可'
  },
  rules: [{ required: true, message: '选择一项即可', trigger: 'change' }]
})

const swiper = Type.Array(Type.Object({}), {
  code: 'config-swiper',
  title: '数据',
  default: [],
  minItems: 1,
  errorMessage: {
    required: '最少选择一个',
    minItems: '最少选择一个'
  },
  rules: [{ required: true, message: '最少选择一个', trigger: 'change' }]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  swiper: schemaAllViewport(swiper)
})

export type CbSwiperSchema = Static<typeof schema>

export default schema
