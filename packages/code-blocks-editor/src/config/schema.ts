import { schema, type CbComponentSchema } from '@code-blocks/ui'
import _pageSchema, { type PageSchema } from './page-schema'

// 导出所有schema，{ image: imageSchema, ... }
export type BlockSchema = typeof schema
// 获取key
export type BlockSchemaKeys = keyof BlockSchema
/**
 * type BlockSchemaFormData = {
      image: CbImageSchema;
      column: CbColumnSchema;
   }
 */
export type BlockSchemaFormData = CbComponentSchema
export type PageSchemaFormData = PageSchema

// 各个物料组件schema对象
export const blockSchema = schema
// 页面的schema对象
export const pageSchema = _pageSchema
