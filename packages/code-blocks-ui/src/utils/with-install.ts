import { App } from 'vue-demi'

/**
 * 组件安装，组件加上install函数
 * @param component
 * @returns
 */
export const withInstall = (component: any) => {
  component.install = (app: App) => {
    const { name } = component
    if (name) app.component(name, component)
  }
  return component
}
