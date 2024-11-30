<template>
  <div>
    <cb-container :content="content"></cb-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const content = ref('')

content.value = JSON.parse(route.query.content as string)
</script>

<style lang="scss" scoped></style>
