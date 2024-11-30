<template>
  <el-upload
    :file-list="modelList"
    :list-type="listType"
    :http-request="handleFileUpload"
    :limit="1"
    :on-remove="handleRemove"
    style="width: 100%"
    :class="{ 'is-hidden': modelList.length }"
  >
    <template #trigger>
      <el-button v-if="isVideo" plain>上传</el-button>
      <v-icon
        :icon="icon.upload"
        class="icon"
        :style="{
          width: isVideo ? '20px' : '',
          height: isVideo ? '20px' : '',
          marginLeft: '5px'
        }"
      ></v-icon>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import icon from '@/config/icon'
import { ref, watch, computed, getCurrentInstance } from 'vue'
import type { UploadRequestOptions, UploadUserFile } from 'element-plus'
import { reqUpload } from '@/api/upload'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance() as any

const props = defineProps({
  type: {
    type: String,
    default: 'image',
    validator(val: string) {
      return ['image', 'video'].includes(val)
    }
  }
})

const model = defineModel({ type: String, default: '' })
const isVideo = computed(() => props.type === 'video')
const listType = computed(() => (isVideo.value ? 'text' : 'picture-card'))
const modelList = ref<UploadUserFile[]>([])

watch(
  model,
  (value) => {
    modelList.value = value ? [{ name: 'file', url: value }] : []
  },
  {
    immediate: true
  }
)

const handleFileUpload = async (e: UploadRequestOptions) => {
  const formData = new FormData()
  formData.append('file', e.file)
  const { status, data, message } = await reqUpload(formData)
  if (!status) {
    return ElMessage.error('上传失败！' + message)
  }
  if (data.url) {
    model.value = proxy.$baseUrl + data.url
  }
}

const handleRemove = () => {
  model.value = ''
}
</script>

<style lang="scss" scoped>
.is-error {
  :deep(.el-upload--picture-card) {
    border: 1px dashed var(--el-color-danger);
  }
}
.icon {
  width: 26px;
  height: 26px;
  color: var(--color-upload-icon);
}
.is-hidden {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
