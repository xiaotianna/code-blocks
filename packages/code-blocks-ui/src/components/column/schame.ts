import { schemaAllViewport } from '@/utils/schema-viewport'
import { Type, type Static } from '@sinclair/typebox'

const background = Type.String({
  code: 'config-color',
  title: '背景',
  default: ''
})

const cols = Type.Array(Type.Number(), {
  code: 'config-column',
  title: '列数',
  default: 0.5, // 每一项的默认值
  minItems: 2,
  maxItems: 4,
})

const schema = Type.Object({
  background: schemaAllViewport(background),
  cols: schemaAllViewport(cols)
})

export type CbColumnSchema = Static<typeof schema>

export default schema
