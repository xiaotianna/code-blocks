import { baseUrl } from '@/common/baseUrl'
import request from '../request'
import type { EditUploadResponse } from './type'

enum API {
  upload = '/edit/upload', // 上传文件
  uploadAvatar = '/user/upload' // 上传头像
}

/**
 * 上传文件接口
 * @param formData
 * @returns
 */
export const reqUpload = (formData: FormData) =>
  request<any, EditUploadResponse>({ url: API.upload, method: 'post', data: formData })

/**
 * 上传头像接口
 * @param formData
 * @returns
 */
export const reqUploadAvatarUrl = baseUrl + API.uploadAvatar
