import { useUserStore } from '@/stores/user'
import { ROLES_MAP, type Roles } from '@/utils/permission'
import type { App } from 'vue'

const user = useUserStore()
export const permission = (app: App) => {
  app.directive('permission', {
    mounted(el, binding) {
      const roleList = binding.value || []
      if (!roleList.length) return el.remove()
      const valid = roleList.find((item: Roles) => ROLES_MAP[user.role] === item)
      if (!valid) el.remove()
    }
  })
}
