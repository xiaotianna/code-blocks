<template>
  <div class="editor">
    <!-- 头部 -->
    <editor-header />
    <!-- 主体 -->
    <div class="container" :class="classes">
      <!-- block 物料区 -->
      <editor-block />
      <!-- render 渲染区 -->
      <editor-render />
      <!-- config 配置区 -->
      <editor-config />
    </div>
  </div>
</template>

<script setup lang="ts">
import editorHeader from '@/components/editor/editor-header.vue'
import editorBlock from '@/components/editor/editor-block.vue'
import editorRender from '@/components/editor/editor-render.vue'
import editorConfig from '@/components/editor/editor-config.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useEditStore } from '@/stores/editor'
import { useRoute, useRouter } from 'vue-router'
import { reqGetPackageById, reqGetPageById } from '@/api/editor'
import { useUserStore } from '@/stores/user'
import { sleep } from '@/components/editor/nested'
import type { PageSchemaFormData } from '@/config/schema'
import type { BaseBlock } from '@/types/editor'

const edit = useEditStore()
const route = useRoute()
const router = useRouter()
const user = useUserStore()

const classes = computed(() => {
  return { 'mobile-background': edit.isMobileViewport }
})

const id = ref<string>((route.query.id as string) || '')
const packageId = ref<string>((route.query.packageId as string) || '')

const getData = async () => {
  if (!id.value) return
  let params = {
    id: id.value,
    user_id: user.userInfo.id
  }
  const { status, data } = await reqGetPageById(params)
  if (!status || !data) {
    router.replace('/404')
    return
  }
  if (data) {
    await sleep(50)
    const { block, page } = data.content || {}
    edit.setPageConfig(page as PageSchemaFormData)
    edit.setBlockConfig(block as BaseBlock[])
    edit.setPageName(data.name)
  }
}

const getPackageData = async () => {
  if (!packageId.value) return
  let params = {
    id: packageId.value,
    user_id: user.userInfo.id
  }
  const { status, data } = await reqGetPackageById(params)
  if (!status || !data) {
    router.replace('/404')
    return
  }
  if (data) {
    await sleep(50)
    edit.setBlockConfig((data.content?.block as BaseBlock[]) || [])
    edit.setPageName(data.name)
  }
}

onMounted(() => {
  if (route.query) {
    getData()
    getPackageData()
  }
})

onUnmounted(() => {
  edit.setReset()
})
</script>

<style lang="scss" scoped>
.editor {
  width: 100%;
  overflow-x: hidden;
  user-select: none;
  --edit-header-height: 64px;
  --edit-block-width: 300px;
  .container {
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
  }
}
</style>
