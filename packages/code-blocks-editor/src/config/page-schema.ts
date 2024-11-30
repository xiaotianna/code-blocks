import { type Static, Type } from '@sinclair/typebox'
import { schemaAllViewport } from '@code-blocks/ui'

const background = Type.String({
  code: 'config-color',
  title: '背景',
  default: ''
})
const title = Type.String({
  code: 'config-input',
  title: '标题',
  placeholder: '请输入页面标题'
})
const keywords = Type.String({
  code: 'config-input',
  title: '关键字',
  placeholder: '请输入页面关键字'
})
const description = Type.String({
  code: 'config-input',
  title: '描述',
  placeholder: '请输入页面描述'
})

const pageSchema = Type.Object({
  background: schemaAllViewport(background),
  title: schemaAllViewport(title),
  keywords: schemaAllViewport(keywords),
  description: schemaAllViewport(description)
})

export type PageSchema = Static<typeof pageSchema>

export default pageSchema
