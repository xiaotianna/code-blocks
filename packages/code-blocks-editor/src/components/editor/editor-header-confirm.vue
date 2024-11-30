<template>
  <el-dialog v-model="model" :title="prefix + '发布'" width="500">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item :label="prefix + '名'" label-width="83px" prop="name">
        <el-input v-model="form.name" autocomplete="off" :placeholder="'请输入' + prefix + '名'" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="model = false">取消</el-button>
        <el-button type="primary" @click="create(ruleFormRef)">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useEditStore } from '@/stores/editor'
const edit = useEditStore()

const props = defineProps({
  prefix: {
    type: String,
    default: '页面'
  }
})
const model = defineModel({ default: false })
const emit = defineEmits(['create'])
const ruleFormRef = ref<FormInstance>()
const form = reactive({
  name: ''
})
const rules = reactive({
  name: [{ required: true, message: `请输入${props.prefix}名`, trigger: 'blur' }]
})

watch(
  () => edit.pageName,
  (val) => {
    form.name = val
  }
)

watch(model, (val) => {
  if (!val) {
    form.name = ''
  }
})

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      console.warn('error submit!', fields)
      return
    }
    emit('create', form)
  })
}
</script>
