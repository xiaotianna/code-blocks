import request from '../request'
import type {
  GetUserRoleResponse,
  GetUsersResponse,
  LoginData,
  LoginResponse,
  RegisterResponse,
  UserRole
} from './type'
import type { Response } from '../type'

enum API {
  login = '/auth/login', // 登录
  register = '/auth/register', // 注册
  updateUser = '/user', //更新用户信息
  getUsers = '/user/list', // 获取用户列表（普通用户和管理员返回的数据不同）
  getUserRole = '/user/role', // 获取用户角色
  updateUserStatus = '/user/status', // 账号是否被禁用
  updateUserRole = '/user/role' // 账号更新角色
}

export const reqLogin = (data: LoginData) =>
  request<any, LoginResponse>({ url: API.login, method: 'post', data })

export const reqRegister = (data: LoginData) =>
  request<any, RegisterResponse>({ url: API.register, method: 'post', data })

export const reqUpdateUser = (data: { user_id: string; username: string; imgUrl: string }) =>
  request({ url: API.updateUser, method: 'put', data })

export const reqGetUsers = (params: { page: number; size: number }) =>
  request<any, GetUsersResponse>({ url: API.getUsers, method: 'get', params })

export const reqGetUserRole = (user_id: string) =>
  request<any, GetUserRoleResponse>({ url: API.getUserRole, method: 'get', params: { user_id } })

export const reqUpdateUserStatus = (data: {
  user_id: string
  other_uid: string
  is_status: boolean
}) => request<any, Response & { data: null }>({ url: API.updateUserStatus, method: 'put', data })

export const reqUpdateUserRole = (data: {
  user_id: string
  other_uid: string
  role: UserRole.ADMIN | UserRole.USER
}) => request<any, Response & { data: null }>({ url: API.updateUserRole, method: 'put', data })
