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

const text = Type.String({
  code: 'config-input',
  title: '文本',
  default: '',
  placeholder: '请输入内容',
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1, message: '最少1个字符', trigger: 'change' }]
})

const color = Type.String({
  code: 'config-color',
  title: '颜色',
  default: ''
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  text: schemaAllViewport(text),
  color: schemaAllViewport(color)
})

export type CbTextMdSchema = Static<typeof schema>

export default schema
