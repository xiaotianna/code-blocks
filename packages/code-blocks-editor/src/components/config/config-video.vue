<template>
  <div class="config-video">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <v-upload v-model="file" type="video" />
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import vUpload from '../base/v-upload.vue'

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
    })
    emit('update', {
      [key]: data
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.config-video {
  position: relative;
}
</style>
