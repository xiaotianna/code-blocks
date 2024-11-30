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

const prefixIcon = Type.String({
  code: 'config-input',
  title: '图标',
  default: '',
  placeholder: '请输入emoji图标'
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

const background = Type.String({
  code: 'config-color',
  title: '背景',
  default: ''
})

const borderColor = Type.String({
  code: 'config-color',
  title: '边框',
  default: ''
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  prefixIcon: schemaAllViewport(prefixIcon),
  text: schemaAllViewport(text),
  color: schemaAllViewport(color),
  background: schemaAllViewport(background),
  borderColor: schemaAllViewport(borderColor)
})

export type CbHighBlockSchema = Static<typeof schema>

export default schema
