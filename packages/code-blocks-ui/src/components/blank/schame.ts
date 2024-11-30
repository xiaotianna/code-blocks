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

const height = Type.Number({
  code: 'config-slider',
  title: '高度',
  default: 0
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  height: schemaAllViewport(height)
})

export type CbBlankSchema = Static<typeof schema>

export default schema
