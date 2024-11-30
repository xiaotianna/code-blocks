import type { Response } from '../type'

export interface LoginData {
  phone: string
  password: string
}

export type UserInfoType = {
  id: string
  phone: string
  username: string
  imgUrl: string
  token: string
  role: string
}

export interface LoginResponse extends Response {
  data: UserInfoType
}

export interface RegisterResponse extends Response {
  data: {
    id: string
    phone: string
    token: string
    username: string
  }
}
