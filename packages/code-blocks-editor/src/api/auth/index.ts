import request from '../request'
import type { LoginData, LoginResponse, RegisterResponse } from './type'

enum API {
  login = '/auth/login',
  register = '/auth/register'
}

export const reqLogin = (data: LoginData) =>
  request<any, LoginResponse>({ url: API.login, method: 'post', data })

export const reqRegister = (data: LoginData) =>
  request<any, RegisterResponse>({ url: API.register, method: 'post', data })

export const reqUser = () => request<any>({ url: '/user', method: 'get' })
