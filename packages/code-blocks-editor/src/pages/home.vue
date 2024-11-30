<template>
  <div ref="mdPreviewRef">
    <MdPreview :modelValue="mdText" id="md-preview" ref="mdPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import MdText from '@/assets/markdown/prod-introduce.md?raw'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { onMounted, ref } from 'vue'

const mdText = ref(MdText)

onMounted(() => {
  ATagBlank()
})

const mdPreviewRef = ref<HTMLDivElement | null>()

const ATagBlank = () => {
  mdPreviewRef.value?.querySelectorAll('a').forEach((a) => {
    a.setAttribute('target', '_blank')
  })
}
</script>

<style scoped lang="scss">
:deep(.md-editor-preview h1) {
  margin: 0;
}
:deep(.md-editor-preview h2) {
  margin: 0;
}
:deep(.md-editor-preview h3) {
  margin: 0;
}
:deep(.md-editor-preview h4) {
  margin: 0;
}
:deep(.md-editor-preview h5) {
  margin: 0;
}
:deep(.md-editor-preview h6) {
  margin: 0;
}
:deep(ol) {
  list-style: decimal;
}
:deep(ul) {
  list-style: disc;
}
</style>
