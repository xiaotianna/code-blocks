<template>
  <div class="header">
    <div class="header-left">
      <div class="back" @click="back">
        <v-icon-tooltip :icon="icon.back" content="返回" />
        <div class="header-title">页面</div>
      </div>
      <div class="line"></div>
      <v-select v-model="viewport" />
    </div>
    <div class="header-right">
      <el-button @click="submitPackage">
        <v-icon :icon="icon.save" class="mr-1" />
        {{ packageId ? '更新' : '保存' }}套件
      </el-button>
      <el-button @click="preview">
        <v-icon :icon="icon.preview" class="mr-1" />
        预览
      </el-button>
      <el-button v-if="!packageId" type="primary" @click="submit">
        <v-icon :icon="icon.publish" class="mr-1" />
        {{ pageId ? '更新' : '发布' }}
      </el-button>
    </div>
    <editor-header-confirm v-model="dialogFormVisible" prefix="页面" @create="create" />
    <editor-header-confirm
      v-model="packageDialogFormVisible"
      prefix="套件"
      @create="handlePackage"
    />
  </div>
</template>

<script setup lang="ts">
import editorHeaderConfirm from './editor-header-confirm.vue'
import icon from '@/config/icon'
import vIcon from '@/components/base/v-icon.vue'
import vIconTooltip from '../base/v-icon-tooltip.vue'
import vSelect from '../base/v-select.vue'
import type { Viewport } from '@/types/editor'
import { ref, watch } from 'vue'
import { useEditStore } from '@/stores/editor'
import { useUserStore } from '@/stores/user'
import { blockSchema, type BlockSchemaKeys } from '@/config/schema'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import { findNodeById } from './nested'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { reqPackageSave, reqPackageUpdate, reqPageRelease, reqPageUpdate } from '@/api/editor'
import type {
  PackageSaveParam,
  PackageUpdateParam,
  PageReleaseParam,
  PageUpdateParam
} from '@/api/editor/type'

const edit = useEditStore()
const user = useUserStore()
const router = useRouter()

const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code', 'inCanvas']
})
AjvErrors(ajv)

// 判断是桌面端还是移动端
const viewport = ref<Viewport>('desktop')

watch(viewport, (val) => {
  edit.setViewport(val)
  edit.setConfigPanelShow(val === 'mobile')
  edit.setCurrentSelect({})
})

const dialogFormVisible = ref(false)
const packageDialogFormVisible = ref(false)
const pageId = ref<string>((router.currentRoute.value.query.id as string) || '')
const packageId = ref<string>((router.currentRoute.value.query.packageId as string) || '')

const validateAll = (item: any) => {
  const { value, schema, id } = item
  const validate = ajv.compile(schema)
  const valid = validate(value)
  if (!valid) {
    const path = validate.errors?.[0]?.instancePath
    if (path) {
      const [, , pathViewport] = path.split('/')

      viewport.value = pathViewport as Viewport

      setTimeout(() => {
        edit.setViewport(pathViewport as Viewport)
      }, 0)
    }
    edit.setConfigPanelShow(true)
    findNodeById(edit.blockConfig, id, (params) => {
      const { node } = params
      edit.setCurrentSelect(node)
    })

    console.warn('ajv error: ', id, validate.errors?.[0].instancePath, validate.errors?.[0].message)
    return true
  }
}

const submit = () => {
  const list = edit.blockConfig.map((item) => {
    return {
      id: item.id,
      value: item.formData,
      schema: blockSchema[item.code as BlockSchemaKeys]
    }
  })
  const hasError = list.some((item) => validateAll(item))
  if (hasError) return
  dialogFormVisible.value = true
}

const createPage = async (form: {}) => {
  const user_id = user.userInfo.id
  let data = {
    ...form,
    content: { block: edit.blockConfig, page: edit.pageConfig },
    user_id
  }
  const {
    status,
    message,
    data: { id }
  } = await reqPageRelease(data as PageReleaseParam)
  if (!status) {
    return (dialogFormVisible.value = false)
  }
  dialogFormVisible.value = false
  pageId.value = id
  ElMessage.success(message)
  router.replace(`/edit?id=${pageId.value}`)
}

const updatePage = async (form: {}) => {
  const user_id = user.userInfo.id
  const page_Id = pageId.value
  let data = {
    ...form,
    content: { block: edit.blockConfig, page: edit.pageConfig },
    user_id,
    id: page_Id
  }
  const { status, message } = await reqPageUpdate(data as PageUpdateParam)
  if (!status) {
    dialogFormVisible.value = false
    return
  }
  dialogFormVisible.value = false
  ElMessage.success(message)
}

const create = async (form: {}) => {
  pageId.value ? updatePage(form) : createPage(form)
}

const preview = () => {
  window.open(
    '/preview?content=' +
      encodeURIComponent(JSON.stringify({ block: edit.blockConfig, page: edit.pageConfig })),
    '_blank'
  )
}

const back = () => {
  router.push('/')
}

const submitPackage = () => {
  packageDialogFormVisible.value = true
}

const createPackage = async (form: {}) => {
  const user_id = user.userInfo.id
  let data = {
    ...form,
    content: { block: edit.blockConfig },
    user_id
  }
  const {
    status,
    message,
    data: { id }
  } = await reqPackageSave(data as PackageSaveParam)
  if (!status) {
    packageDialogFormVisible.value = false
    return
  }
  packageDialogFormVisible.value = false
  packageId.value = id
  ElMessage.success(message)
  router.replace(`/edit?packageId=${packageId.value}`)
}

const updatePackage = async (form: {}) => {
  const user_id = user.userInfo.id
  const package_id = packageId.value
  let data = {
    ...form,
    content: { block: edit.blockConfig },
    user_id,
    id: package_id
  }
  const res = await reqPackageUpdate(data as PackageUpdateParam)
  const { status } = res
  if (!status) {
    packageDialogFormVisible.value = false
    return
  }
  packageDialogFormVisible.value = false
  ElMessage.success('套件更新成功！')
}

const handlePackage = async (form: {}) => {
  packageId.value ? updatePackage(form) : createPackage(form)
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 500;
  height: var(--edit-header-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .back {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;
      .header-title {
        font-size: 14px;
        padding-left: 2px;
      }
    }
    .line {
      width: 1px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }
  .header-right {
    position: relative;
    padding-right: 16px;
    margin-left: auto;
  }
}
</style>
