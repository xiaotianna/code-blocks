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
  total: number
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
  total: number
}

export type PageListResponse = PackageListResponse

export type GetPageByIdResponse = PackageReleaseResponse

export interface DeletePageResponse extends Response {
  data: null
}

export type SearchPageItem = {
  id: string
  name: string
  content: ReleaseParamContent
  user: {
    id: string
    username: string
  }
}
export interface GetSearchPageResponse extends Response {
  data: SearchPageItem[]
  total: number
}

export type CopyPageResponse = DeletePageResponse
