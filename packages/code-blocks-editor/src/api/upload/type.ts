import type { Response } from '../type'

export interface EditUploadResponse extends Response {
  data: {
    url: string
  }
}

export type UserUploadResponse = EditUploadResponse
