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

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export type UserItem = Partial<{
  id: string
  phone: string
  username: string
  password: string
  is_status: boolean
  role: UserRole.ADMIN | UserRole.USER
}>
export interface GetUsersResponse extends Response {
  data: UserItem[]
  total: number
}

export interface GetUserRoleResponse extends Response {
  data: {
    role: UserRole.ADMIN | UserRole.USER
  }
}
