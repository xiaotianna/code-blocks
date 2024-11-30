<template>
  <ul
    v-infinite-scroll="packageLoad"
    :infinite-scroll-distance="1"
    :infinite-scroll-delay="200"
    class="infinite-list"
  >
    <li
      v-for="(item, index) in packageList"
      :key="index"
      class="infinite-list-item"
      @click="add(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditStore } from '@/stores/editor'
import { reqGetPackagesList } from '@/api/editor'
import type { BaseBlock } from '@/types/editor'
import { useUserStore } from '@/stores/user'

const edit = useEditStore()
const user = useUserStore()

const page = ref(1)
const size = ref(20)
const end = ref(false)

type PackageItem = { name: string; content: { block: BaseBlock[] } }

const packageList = ref<PackageItem[]>([])
const packageLoad = async () => {
  if (end.value) return
  let params = {
    page: page.value,
    size: size.value,
    user_id: user.userInfo.id
  }
  const { status, data } = await reqGetPackagesList(params)
  if (!status) return
  if (!end.value) {
    page.value++
    packageList.value.push(...(data as any))
  }
  end.value = data?.length < size.value
}
packageLoad()

const add = (item: PackageItem) => {
  edit.setBlockConfig([...edit.blockConfig, ...item.content!.block])
}
</script>

<style scoped lang="scss">
.infinite-list {
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
.infinite-list .infinite-list-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
