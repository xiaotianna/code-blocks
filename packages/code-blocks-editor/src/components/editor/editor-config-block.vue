<template>
  <div class="edit-config-block">
    <!-- 用来渲染schema配置 -->
    <editor-config-render :list="list" :schema="schema" @callback="callback">
      <div v-if="!edit.currentSelect?.id">
        <el-empty description="请在左侧拖入组件后，点击选中组件">
          <template #image>
            <v-icon icon="dragBlank" class="icon" />
          </template>
        </el-empty>
      </div>
    </editor-config-render>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import editorConfigRender from './editor-config-render.vue'
import { useEditStore } from '@/stores/editor'
import type { BaseBlock } from '@/types/editor'
import { blockSchema, type BlockSchema, type BlockSchemaKeys } from '@/config/schema'
import { findNodeById } from './nested'
// 对象字段合并库
import deepmerge from 'deepmerge'

const edit = useEditStore()

const list = ref<BaseBlock[]>([])
const schema = ref<BlockSchema[BlockSchemaKeys]>()

watch(
  () => edit.currentSelect,
  (value: BaseBlock | null) => {
    const code = value?.code as BlockSchemaKeys
    const properties = blockSchema[code].properties
    if (!edit.currentSelect || !properties) {
      list.value = []
      return
    }

    schema.value = blockSchema[code]

    const { formData, id } = edit.currentSelect as any

    const listResult = Object.fromEntries(
      Object.entries(properties).map((itemChild) => {
        const [key, value] = itemChild as any
        return [key, { ...value, id, key, formData: formData?.[key] || {} }]
      })
    )

    list.value = [...Object.values(listResult)] as BaseBlock[]
  },
  {
    immediate: true,
    deep: true
  }
)

// 由 config-input => edit-config-render => edit-config-block/edit-config-page(进行收值)
const callback = (params: { data: object; id: string }) => {
  const { data, id } = params
  if (!id) return
  const blockConfig = edit.blockConfig || []
  const newBlockConfig = findNodeById(blockConfig, id, (params: any) => {
    let { array, index, node } = params
    const overwriteMerge = (_destinationArray: any, sourceArray: any) => sourceArray
    array[index].formData = deepmerge(node.formData, data, {
      arrayMerge: overwriteMerge
    })

    if (node.nested && node.code === 'column') {
      const cols = node.formData?.cols?.desktop || [0.5, 0.5]
      const oldCols = node.children || [[], []]
      if (oldCols.length > cols.length) {
        const count = oldCols.length - cols.length
        array[index].children?.splice(oldCols.length - count, count)
      } else {
        const count = cols.length - oldCols.length
        const diff = Array.from({ length: count }, () => [])
        array[index].children?.push(...diff)
      }
    }
  })

  edit.setBlockConfig(newBlockConfig)
}
</script>

<style lang="scss" scoped>
.edit-config-block {
  width: 100%;
}
</style>
