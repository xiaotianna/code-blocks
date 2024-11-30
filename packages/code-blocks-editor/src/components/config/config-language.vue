<template>
  <div class="config-input">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-select v-model="input" :placeholder="placeholder" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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

const options = [
  {
    value: 'Bash',
    label: 'Bash'
  },
  {
    value: 'C++',
    label: 'C++'
  },
  {
    value: 'C#',
    label: 'C#'
  },
  {
    value: 'CSS',
    label: 'CSS'
  },
  {
    value: 'SCSS',
    label: 'SCSS'
  },
  {
    value: 'LESS',
    label: 'LESS'
  },
  {
    value: 'Go',
    label: 'Go'
  },
  {
    value: 'HTML',
    label: 'HTML'
  },
  {
    value: 'Java',
    label: 'Java'
  },
  {
    value: 'JavaScript',
    label: 'JavaScript'
  },
  {
    value: 'Markdown',
    label: 'Markdown'
  },
  {
    value: 'Python',
    label: 'Python'
  },
  {
    value: 'Rust',
    label: 'Rust'
  },
  {
    value: 'SQL',
    label: 'SQL'
  },
  {
    value: 'TypeScript',
    label: 'TypeScript'
  },
  {
    value: 'YAML',
    label: 'YAML'
  },
  {
    value: 'JSON',
    label: 'JSON'
  }
]

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
