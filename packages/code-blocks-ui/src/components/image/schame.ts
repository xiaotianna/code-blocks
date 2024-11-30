import { schemaAllViewport } from '@/utils/schema-viewport'
import { Type, type Static } from '@sinclair/typebox'

const display = Type.Boolean({
  code: 'config-viewport', // 配置项使用的组件
  title: '屏幕',
  default: true,
  errorMessage: {
    required: '选择一项即可'
  },
  rules: [{ required: true, message: '选择一项即可', trigger: 'change' }]
})

const src = Type.String({
  code: 'config-files',
  title: '图片',
  default: '',
  minLength: 1,
  errorMessage: {
    required: '请上传一个图片'
  },
  rules: [
    { required: true, min: 1, message: '请上传一个图片', trigger: 'change' }
  ]
})

const link = Type.String({
  code: 'config-input',
  title: '链接',
  default: '',
  placeholder: '请输入链接',
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1, message: '最少1个字符', trigger: 'change' }]
})

const width = Type.String({
  code: 'config-input',
  title: '宽度',
  default: '100%',
  placeholder: '请输入宽度',
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1, message: '最少1个字符', trigger: 'change' }]
})

const height = Type.String({
  code: 'config-input',
  title: '高度',
  default: '295px',
  placeholder: '请输入高度',
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1, message: '最少1个字符', trigger: 'change' }]
})

const top = Type.String({
  code: 'config-input',
  title: '居上',
  default: '0px',
  placeholder: '请输入居上位置',
  inCanvas: true
})

const left = Type.String({
  code: 'config-input',
  title: '居左',
  default: '0px',
  placeholder: '请输入居左位置',
  inCanvas: true
})

const schema = Type.Object({
  /**
   * {
   *    display: {
   *       desktop: xxx,
   *       mobile: xxx
   *    }
   * }
   */
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  link: schemaAllViewport(link),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height),
  // Type.Optional：可选
  top: Type.Optional(schemaAllViewport(top)),
  left: Type.Optional(schemaAllViewport(left))
})

// 官网有，用于生成类型
export type CbImageSchema = Static<typeof schema>

export default schema
