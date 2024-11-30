<template>
  <Icon :icon="icon" class="icon" />
</template>

<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.icon {
  font-size: 20px;
}
</style>
