<template>
  <div class="config-files">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <v-upload v-model="file" />
      <!-- <img v-if="file" :src="file" class="image" alt="" @click="fileClick" />
      <div v-else class="file" @click="fileClick">
        <v-icon :icon="icon.upload" class="icon"></v-icon>
      </div>
      <el-input v-model="file" style="display: none"></el-input> -->
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
// import icon from '@/config/icon'
import vUpload from '../base/v-upload.vue'
import { ref, toRefs, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  viewport: {
    type: String,
    default: 'desktop'
  }
})

const emit = defineEmits(['callback', 'update'])

const { data } = toRefs(props)
const { formData, key, id } = data.value
const { title, default: defaultValue } = data.value.properties[props.viewport]

const file = ref('')

watch(
  () => formData,
  (value) => {
    file.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true
  }
)

watch(
  file,
  (value) => {
    let data = {}
    const _value = value || ''
    if (Object.values(formData || {}).length < 2) data = { desktop: _value, mobile: _value }
    else data = { [props.viewport]: _value }

    emit('callback', {
      data: {
        [key]: data
      },
      id
    }),
      emit('update', {
        [key]: data
      })
  },
  { immediate: true }
)

// mock数据
// const fileClick = () => {
//   const list = [
//     'http://127.0.0.1:3000/img1.png',
//     'http://127.0.0.1:3000/img2.png',
//     'http://127.0.0.1:3000/img3.png',
//     'http://127.0.0.1:3000/img4.png'
//   ]
//   const randomIndex = Math.floor(Math.random() * list.length)
//   file.value = list[randomIndex]
// }
</script>

<style lang="scss" scoped>
.config-files {
  .file,
  .image {
    width: 80px;
    height: 80px;
    box-shadow: 0 0 0 1px var(--color-border) inset;
    border-radius: var(--border-radius);
    background: var(--color-config-block-bg);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .is-error {
    .file,
    .image {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
    :deep(.el-upload--picture-card) {
      border: 1px dashed var(--el-color-danger);
    }
  }
  .image {
    border: 0;
    width: 82px;
    height: 82px;
    object-fit: cover;
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
}
</style>
