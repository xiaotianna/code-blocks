import request from '../request'
import type {
  PageReleaseResponse,
  PackageSaveParam,
  PageReleaseParam,
  PageUpdateParam,
  PackageReleaseResponse,
  PackageUpdateParam,
  PackageListResponse,
  PageListResponse,
  GetPageByIdResponse,
  DeletePageResponse,
  GetSearchPageResponse,
  CopyPageResponse
} from './type'

enum API {
  page = '/edit/page', // 页面发布/更新接口
  package = '/edit/package', // 套件保存/更新接口
  packageList = '/edit/package/list', // 套件列表接口
  pageList = '/edit/page/list', // 页面列表接口
  previewPage = '/edit/page/preview', // 预览页面接口
  previewPackage = '/edit/package/preview', // 预览套件接口
  deletePage = '/edit/page/delete', // 删除页面接口
  deletePackage = '/edit/package/delete', // 删除套件接口
  searchPage = '/edit/search', // 搜索接口
  copyPage = '/edit/copy' // 复制页面接口
}

/**
 * 页面发布接口
 * @method post
 * @param name 名称
 * @param content 内容
 * @param user_id 用户id
 * @returns
 */
export const reqPageRelease = (data: PageReleaseParam) =>
  request<any, PageReleaseResponse>({ url: API.page, method: 'post', data })

/**
 * 页面更新接口
 * @method put
 * @param name 名称
 * @param content 内容
 * @param user_id 用户id
 * @param id 页面id
 * @returns
 */
export const reqPageUpdate = (data: PageUpdateParam) =>
  request<any, PageReleaseResponse>({ url: API.page, method: 'put', data })

/**
 * 套件保存接口
 * @method post
 * @param name 名称
 * @param content 内容
 * @param user_id 用户id
 * @returns
 */
export const reqPackageSave = (data: PackageSaveParam) =>
  request<any, PackageReleaseResponse>({ url: API.package, method: 'post', data })

/**
 * 套件更新接口
 * @method put
 * @param name 名称
 * @param content 内容
 * @param user_id 用户id
 * @param id 套件id
 * @returns
 */
export const reqPackageUpdate = (data: PackageUpdateParam) =>
  request<any, PageReleaseResponse>({ url: API.package, method: 'put', data })

/**
 * 获取套件列表接口
 * @method get
 * @param params user_id 用户id
 * @param page 页码
 * @param size 每页数量
 * @returns
 */
export const reqGetPackagesList = (params: { user_id: string; page: number; size: number }) =>
  request<any, PackageListResponse>({ url: API.packageList, method: 'get', params })

/**
 * 获取页面列表接口
 * @method get
 * @param user_id 用户id
 * @param page 页码
 * @param size 每页数量
 * @returns
 */
export const reqGetPagesList = (params: { user_id: string; page: number; size: number }) =>
  request<any, PageListResponse>({ url: API.pageList, method: 'get', params })

/**
 * 编辑器预览、页面接口（通过id）
 * @method get
 * @param id 页面id
 * @param user_id 用户id
 * @returns
 */
export const reqGetPageById = (params: { id: string; user_id: string }) =>
  request<any, GetPageByIdResponse>({ url: API.previewPage, method: 'get', params })

/**
 * 编辑器套件接口
 * @method get
 * @param id 页面id
 * @param user_id 用户id
 * @returns
 */
export const reqGetPackageById = (params: { id: string; user_id: string }) =>
  request<any, GetPageByIdResponse>({ url: API.previewPackage, method: 'get', params })

/**
 * 删除页面接口
 * @method delete
 * @param id 页面id
 * @returns
 */
export const reqDeletePage = (data: { id: string }) =>
  request<any, DeletePageResponse>({ url: API.deletePage, method: 'delete', data })

/**
 * 删除页面接口
 * @method delete
 * @param id 页面id
 * @returns
 */
export const reqDeletePackage = (data: { id: string }) =>
  request<any, DeletePageResponse>({ url: API.deletePackage, method: 'delete', data })

/**
 * 搜索接口
 * @method get
 * @param page 页码
 * @param size 每页数量
 * @param keyword 关键词
 * @returns
 */
export const reqGetProject = (params?: { page?: number; size?: number; keyword?: string }) =>
  request<any, GetSearchPageResponse>({ url: API.searchPage, method: 'get', params })

/**
 * 复制页面接口
 * @method post
 * @param id 页面id
 * @param user_id 用户id
 * @returns
 */
export const reqCopyProject = (data: { id: string; user_id: string }) =>
  request<any, CopyPageResponse>({ url: API.copyPage, method: 'post', data })
