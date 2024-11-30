import type { PageSchemaFormData } from '@/config/schema'
import type { BaseBlock, Viewport } from '@/types/editor'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: {} as BaseBlock,
    viewport: 'desktop' as Viewport,
    configPanelShow: false, // 控制配置面板的显示与隐藏
    blockConfig: [] as BaseBlock[], // 存储配置内容
    pageConfig: {} as PageSchemaFormData,
    pageName: ''
  }),
  getters: {
    isMobileViewport: (state) => state.viewport === 'mobile'
  },
  actions: {
    setCurrentSelect(value: BaseBlock) {
      this.currentSelect = value
    },
    setViewport(value: Viewport) {
      this.viewport = value
    },
    setConfigPanelShow(value: boolean) {
      this.configPanelShow = value
    },
    setBlockConfig(value: BaseBlock[]) {
      this.blockConfig = value
    },
    setPageConfig(value: PageSchemaFormData) {
      this.pageConfig = value
    },
    setPageName(value: string) {
      this.pageName = value
    },
    setReset() {
      this.setViewport('desktop')
      this.setBlockConfig([])
      this.setPageConfig({} as PageSchemaFormData)
      this.setPageName('')
      this.setConfigPanelShow(false)
    }
  }
})
