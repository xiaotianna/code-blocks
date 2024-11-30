<template>
  <div class="config-input">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-input
        v-model="input"
        style="width: 240px"
        :rows="15"
        resize="none"
        type="textarea"
        :placeholder="placeholder"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
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
const { title, default: defaultValue, placeholder } = data.value.properties[props.viewport]
const input = ref('')

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true
  }
)

watch(
  input,
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

<style lang="scss" scoped></style>
