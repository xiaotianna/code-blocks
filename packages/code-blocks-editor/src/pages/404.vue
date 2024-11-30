<template>
  <div class="error">
    <el-empty class="title" description="找不到任何页面..." />
    <router-link to="/">
      <el-button type="primary" size="large" class="button"> 去首页 </el-button>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.error {
  user-select: none;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  transform: translateY(-50px);
  .button {
    width: 150px;
  }
}
</style>
