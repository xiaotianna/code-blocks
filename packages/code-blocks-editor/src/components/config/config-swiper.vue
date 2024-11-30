<template>
  <div class="config-swiper">
    <el-form-item :label="title" :prop="key + '.' + viewport">
      <el-button plain @click="dialogVisible = true">设置</el-button>
    </el-form-item>
  </div>
  <el-dialog v-model="dialogVisible" title="数据" width="536" style="min-height: 300px">
    <div class="list">
      <div v-for="(item, index) in list" :key="item" class="item">
        <v-upload v-model="item.src" class="mb-2" />
        <v-icon :icon="icon.add" class="icon close" @click="remove(index)" />
      </div>
      <div class="file" @click="add">
        <v-icon :icon="icon.add" class="icon" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import icon from '@/config/icon'
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

const list = ref<any>([])
const dialogVisible = ref(false)

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
    immediate: true
  }
)

const add = () => {
  list.value.push({})
}
const remove = (index: number) => {
  list.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.config-swiper {
  position: relative;
}
.file {
  width: 148px;
  height: 148px;
  box-shadow: 0 0 0 1px var(--color-border) inset;
  border-radius: var(--border-radius);
  background: var(--color-config-block-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.icon {
  width: 26px;
  height: 26px;
}
.close {
  position: absolute;
  right: -23px;
  top: 0;
  transform: rotate(45deg);
  cursor: pointer;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
  width: 148px;
}
</style>
