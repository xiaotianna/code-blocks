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

const list = Type.Array(Type.Object({}), {
  code: 'config-input-list',
  title: '列表',
  default: [],
  placeholder: '请输入内容'
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  list: schemaAllViewport(list)
})

export type CbUlSchema = Static<typeof schema>

export default schema
