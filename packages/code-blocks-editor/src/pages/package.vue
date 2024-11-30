<template>
  <div>package</div>
</template>

<script setup lang="ts">
import { reqUser } from '@/api/auth'
import { onMounted } from 'vue'

onMounted(() => {
  getData()
})

const getData = async () => {
  let res = await reqUser()
  console.log(res)
}
</script>

<style lang="scss" scoped></style>
