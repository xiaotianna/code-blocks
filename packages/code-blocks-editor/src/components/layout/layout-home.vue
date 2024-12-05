<template>
  <div class="layout-home">
    <el-row>
      <el-col :span="24">
        <home-header />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <home-sider />
      </el-col>
      <el-col :span="20">
        <div class="container">
          <slot />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import HomeHeader from '@/components/home/home-header.vue'
import HomeSider from '@/components/home/home-sider.vue'
</script>

<style lang="scss" scoped>
.layout-home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  --layout-home-header-height: 72px;
}

.container {
  height: calc(100vh - var(--layout-home-header-height));
  overflow: auto;
}
</style>
