import { CbComponentSchema } from '@/main'

export type BlockSchemaFormData = CbComponentSchema

/**
 * 多端视口
 */
export type ComponentViewport = 'desktop' | 'mobile'

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
   * 嵌套子项
   */
  children?: BaseBlock[][]
  /**
   * 配置内容
   */
  formData?: Partial<BlockSchemaFormData[keyof BlockSchemaFormData]>
  /**
   * 父组件code
   */
  parent?: string
}
