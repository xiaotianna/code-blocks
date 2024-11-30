<template>
  <div class="home-header">
    <img :src="logo" alt="logo" class="logo" @click="link" />
    <h1>Code Blocks 低代码开发平台</h1>
    <div class="info" v-if="user.token">
      <img :src="baseUrl + user?.userInfo?.imgUrl" alt="" />
      <el-dropdown trigger="click">
        <div class="nick">
          <span>{{ user?.userInfo?.phone }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="info" v-else>
      <div class="img-null cursor-pointer"></div>
      <div class="text-gray-600 cursor-pointer" @click="router.push('/login')">未登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { baseUrl } from '@/common/baseUrl'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const user = useUserStore()

const link = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'LogoTitle';
  src:
    url('../../assets/font/title.woff2') format('woff2'),
    url('../../assets/font/title.woff') format('woff');
  font-display: swap;
}
.home-header {
  padding: 12px 40px;
  height: var(--layout-home-header-height);
  border-bottom: 1px solid var(--el-border-color-lighter);
  display: flex;
  align-items: center;
  .logo {
    width: 56px;
    height: 56px;
    cursor: pointer;
    margin-right: 7.5px;
  }
  h1 {
    font-size: 28px;
    font-family: LogoTitle;
    --wght: 700;
    --BEVL: 100;
    font-variation-settings:
      'wght' var(--wght),
      'BEVL' var(--BEVL);
  }
  .info {
    margin-left: auto;
    font-size: 16px;
    display: flex;
    align-items: center;
    img,
    .img-null {
      width: 45px;
      height: 45px;
      margin-right: 10px;
      background-color: #ebebeb;
      border-radius: 50%;
    }
    .nick {
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
    }
  }
}
</style>
