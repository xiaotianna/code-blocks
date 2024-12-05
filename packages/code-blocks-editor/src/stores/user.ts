import { defineStore } from 'pinia'
import { removeToken, removeUserInfo, setToken, setUserInfo } from '@/utils/storage'
import type { UserInfoType } from '@/api/auth/type'

type RolesCode = 20 | 10

export enum RolesCodeEnum {
  ADMIN = 20,
  USER = 10
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as UserInfoType,
    token: '',
    role: 10 as RolesCode
  }),
  getters: {
    isAdminRole: (state) => state.role === 20
  },
  actions: {
    setInfo(value: UserInfoType) {
      const { token } = value
      this.token = token
      this.userInfo = value
      setToken(token)
      setUserInfo(value)
    },
    setRole(value: RolesCode) {
      this.role = value
    },
    clearInfo() {
      this.token = ''
      this.userInfo = {} as UserInfoType
      this.role = 10
      removeToken()
      removeUserInfo()
    }
  }
})
