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

const language = Type.String({
  code: 'config-language',
  title: '语言',
  default: '',
  placeholder: '选择代码语言'
})

const text = Type.String({
  code: 'config-code',
  title: '代码',
  default: '',
  placeholder: '写入你的代码',
  minLength: 1,
  errorMessage: {
    required: '内容不能为空',
    minLength: '内容不能为空'
  },
  rules: [
    { required: true, min: 1, message: '内容不能为空', trigger: 'change' }
  ]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  language: schemaAllViewport(language),
  text: schemaAllViewport(text)
})

export type CbCodeSchema = Static<typeof schema>

export default schema
