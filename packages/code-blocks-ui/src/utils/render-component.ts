import { COMPONENT_PREFIX } from '@/config/constant'
import { BaseBlock } from '@/types/component'

export const renderComponentCode = (element: BaseBlock) => {
  return COMPONENT_PREFIX + '-' + element.code
}
