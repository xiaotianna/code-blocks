import { useUserStore } from '@/stores/user'

export const ROLES_MAP = {
  20: 'admin',
  10: 'user'
} as const

export type Roles = 'admin' | 'user'

export const checkPermission = (roleList: Roles[]) => {
  const user = useUserStore()
  if (!roleList.length) return
  const valid = roleList.find((item: Roles) => ROLES_MAP[user.role] === item)
  if (!valid) return
  return true
}
