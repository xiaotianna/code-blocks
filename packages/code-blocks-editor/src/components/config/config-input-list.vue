<template>
  <el-form-item :label="title" :prop="key + '.' + viewport">
    <el-button type="primary" @click="add">添加</el-button>
  </el-form-item>
  <div class="input-list" v-for="(item, index) in list" :key="index">
    <el-form-item :label="`文本${index + 1}`" :prop="key + '.' + viewport">
      <el-input v-model="item.text" :placeholder="placeholder"></el-input>
    </el-form-item>
    <el-form-item :label="`颜色${index + 1}`" :prop="key + '.' + viewport">
      <el-color-picker v-model="item.color" />
    </el-form-item>
    <el-form-item :prop="key + '.' + viewport">
      <div class="w-full flex justify-end">
        <el-button size="small" type="danger" @click="remove(index)">删除该项</el-button>
      </div>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
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

const list = ref<any>([])

const add = () => {
  list.value.push({})
}

const remove = (index: number) => {
  list.value.splice(index, 1)
}

watch(
  () => formData,
  (value) => {
    list.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true
  }
)

watch(
  list,
  (value) => {
    let data = {}
    const _value = value || []
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
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.input-list {
  border: 1px solid #ccc;
  padding: 18px 15px 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
</style>
