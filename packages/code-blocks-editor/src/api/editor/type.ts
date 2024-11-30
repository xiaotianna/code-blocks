import type { PageSchemaFormData } from '@/config/schema'
import type { Response } from '../type'
import type { BaseBlock } from '@/types/editor'

export interface ReleaseParamContent {
  block?: BaseBlock[]
  page?: PageSchemaFormData
}

export interface PageReleaseParam {
  name: string
  content?: ReleaseParamContent
  user_id: string
}

export interface PageUpdateParam extends PageReleaseParam {
  id: string
}

export interface PageReleaseResponse extends Response {
  data: {
    id: string
    name: string
    content: ReleaseParamContent
  }
}

export type PackageSaveParam = PageReleaseParam

export type PackageUpdateParam = PageUpdateParam

export interface PackageReleaseResponse extends Response {
  data: {
    id: string
    name: string
    content: ReleaseParamContent
  }
}

export interface PackageListResponse extends Response {
  data: PageUpdateParam[]
}
