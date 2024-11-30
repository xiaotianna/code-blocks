<template>
  <div class="config-text">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-button plain @click="dialogVisible = true">设置</el-button>
    </el-form-item>
  </div>
  <el-dialog v-model="dialogVisible" title="富文本" width="600" style="min-height: 400px">
    <span>
      <QuillEditor
        ref="richRefs"
        theme="snow"
        toolbar="essential"
        @textChange="textChange"
        @blur="textChange"
        style="height: 300px; overflow-y: auto"
      />
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { sleep } from '../editor/nested'

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
const input = ref('')
const dialogVisible = ref(false)
const richRefs = ref()

const textChange = () => {
  input.value = richRefs.value.getHTML()
}

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
    if (richRefs.value) richRefs.value.setHTML(input.value)
  },
  {
    immediate: true
  }
)

watch(dialogVisible, async (val) => {
  if (val) {
    await sleep(100)
    if (richRefs.value) richRefs.value.setHTML(input.value)
  }
})

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

<style lang="scss" scoped>
.config-text {
  position: relative;
}
</style>
