import type { BlockSchemaFormData, BlockSchemaKeys } from '@/config/schema'

export type Viewport = 'mobile' | 'desktop'

export interface BaseBlock {
  /**
   * id 区分组件
   */
  id?: string
  /**
   * 组件名
   */
  code?: string
  /**
   * 物料区标题
   */
  name?: string
  /**
   * 物料区图标
   */
  icon?: string
  /**
   * 是否是嵌套组件
   */
  nested?: boolean
  /**
   * 嵌套子项 二维数组
   */
  children?: BaseBlock[][]
  /**
   * 表单配置内容 JSON Schema
   */
  formData?: Partial<BlockSchemaFormData[BlockSchemaKeys]> | any
  /**
   * 父组件code
   */
  parent?: string
}
