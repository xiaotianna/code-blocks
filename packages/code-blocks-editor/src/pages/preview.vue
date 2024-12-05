<template>
  <div>
    <cb-container v-if="content.block" :content="content"></cb-container>
  </div>
</template>

<script setup lang="ts">
import { reqGetPageById } from '@/api/editor'
import type { ReleaseParamContent } from '@/api/editor/type'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const user = useUserStore()

let content = ref<ReleaseParamContent>({})
let id = ref('')

if (route.query?.content) content.value = JSON.parse(route.query.content as string)
if (route.query?.id) id.value = route.query.id as string

const getData = async () => {
  if (!id.value) return
  let params = {
    id: id.value,
    user_id: user.userInfo.id
  }
  const { status, data } = await reqGetPageById(params)
  if (!status || !data) {
    router.replace('/404')
    return
  }
  if (data) {
    content.value = data.content
  }
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
