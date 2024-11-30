import { TSchema, Type } from '@sinclair/typebox'

/**
 * schema加上视口
 * @param params
 * @returns
 */
export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params
  })
}
