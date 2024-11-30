<template>
  <div
    class="container"
    :style="{ width: width }"
  >
    <cb-image
      @click="handleClick"
      :data="data"
    ></cb-image>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let width = ref('')

let data = ref({
  src: {
    desktop:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    mobile:
      'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }
})

const handleClick = () => {
  width.value = '500px'
}
</script>

<style scoped>
.container {
  width: 100vw;
  container-type: inline-size;
}
</style>
