import type { UserInfoType } from '@/api/auth/type'

const constants = {
  TOKEN: 'token',
  USER_INFO: 'userInfo'
}

export function setToken(value: string) {
  localStorage.setItem(constants.TOKEN, value || '')
}

export function getToken() {
  return localStorage.getItem(constants.TOKEN) || ''
}

export function removeToken() {
  localStorage.removeItem(constants.TOKEN)
}

export function setUserInfo(value: UserInfoType) {
  localStorage.setItem(constants.USER_INFO, JSON.stringify(value) || '')
}

export function getUserInfo() {
  const info = localStorage.getItem(constants.USER_INFO)
  if (!info) return info
  return JSON.parse(localStorage.getItem(constants.USER_INFO) as string)
}

export function removeUserInfo() {
  localStorage.removeItem(constants.USER_INFO)
}
