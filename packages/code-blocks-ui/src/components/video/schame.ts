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

const src = Type.String({
  code: 'config-video',
  title: '视频',
  default: '',
  minLength: 1,
  errorMessage: {
    required: '请上传一条视频',
    minLength: '请上传一条视频'
  },
  rules: [
    { required: true, min: 1, message: '请上传一条视频', trigger: 'change' }
  ]
})

const autoplay = Type.Boolean({
  code: 'config-switch',
  title: '自动播放',
  default: true
})

const muted = Type.Boolean({
  code: 'config-switch',
  title: '静音',
  default: true
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
  minLength: 1,
  errorMessage: {
    required: '最少1个字符',
    minLength: '最少1个字符'
  },
  rules: [{ required: true, min: 1, message: '最少1个字符', trigger: 'change' }]
})

const schema = Type.Object({
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  autoplay: schemaAllViewport(autoplay),
  muted: schemaAllViewport(muted),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height)
})

export type CbVideoSchema = Static<typeof schema>

export default schema
