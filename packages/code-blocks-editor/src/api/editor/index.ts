import request from '../request'
import type {
  PageReleaseResponse,
  PackageSaveParam,
  PageReleaseParam,
  PageUpdateParam,
  PackageReleaseResponse,
  PackageUpdateParam,
  PackageListResponse
} from './type'

enum API {
  page = '/edit/page', // 页面发布/更新接口
  package = '/edit/package', // 套件保存/更新接口
  packageList = '/edit/package/list'
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
