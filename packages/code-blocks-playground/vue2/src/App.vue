<template>
  <div>
    <h1>vue2</h1>
    <cb-image :data="data"></cb-image>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        src: {
          desktop:
            'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          mobile:
            'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
        }
      }
    }
  }
}
</script>

<style></style>
