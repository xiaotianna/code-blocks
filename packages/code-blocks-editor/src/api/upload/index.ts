import request from '../request'
import type { EditUploadResponse } from './type'

enum API {
  upload = '/edit/upload' // 上传文件
}

/**
 * 上传文件接口
 * @param formData
 * @returns
 */
export const reqUpload = (formData: FormData) =>
  request<any, EditUploadResponse>({ url: API.upload, method: 'post', data: formData })
