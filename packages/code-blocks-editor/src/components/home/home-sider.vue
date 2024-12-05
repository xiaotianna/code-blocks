<template>
  <div class="home-sider">
    <div class="list">
      <div class="item create" @click="create">
        <v-icon :icon="icon.kit" class="icon" />
        <div v-html="createInfo.name" class="text" />
      </div>
      <router-link
        :to="item.link"
        class="item"
        :class="{ 'is-active': item.link === route.path }"
        v-for="(item, index) in list"
        :key="index"
      >
        <v-icon :icon="item.link === route.path ? item.ativeIcon : item.icon" class="icon" />
        <div v-html="item.name" class="text" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VIcon from '@/components/base/v-icon.vue'
import icon from '@/config/icon'
import { RolesCodeEnum, useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()

const createInfo = ref({
  name: '创建设计',
  icon: icon.home
})

const list = ref([
  {
    name: '项目介绍',
    icon: icon.prod,
    ativeIcon: icon.prod,
    link: '/'
  },
  {
    name: '作品广场',
    icon: icon.workSquare,
    ativeIcon: icon.workSquareActive,
    link: '/works-square'
  }
])

const myList = [
  {
    name: '我的页面',
    icon: icon.home,
    ativeIcon: icon.homeActive,
    link: '/page'
  },
  {
    name: '我的套件',
    icon: icon.package,
    ativeIcon: icon.packageActive,
    link: '/package'
  }
]

const authList = [
  {
    name: '用户管理',
    icon: icon.user,
    ativeIcon: icon.userActive,
    link: '/user'
  }
]

onMounted(() => {
  if (user.token) {
    list.value = [...list.value, ...myList]
  }
  if (user.role === RolesCodeEnum.ADMIN) {
    list.value = [...list.value, ...authList]
  }
})

const create = () => {
  router.push('/edit')
}
</script>

<style scoped lang="scss">
.home-sider {
  padding: 12px 24px;
  .list {
    font-size: 16px;
    .item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 16px;
      color: black;
      opacity: 0.7;
      text-decoration: none;
      padding: 8px 12px;
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.1s linear;
      &.is-active,
      &:hover {
        opacity: 1;
        background-color: #edeff2;
      }
      &.create {
        opacity: 1;
        background-color: rgba(0, 136, 255, 0.12);
        color: #4b86f7;
        &:hover {
          background-color: rgba(0, 136, 255, 1);
          color: white;
        }
      }
      .icon {
        font-size: 24px;
      }
      .text {
        flex-shrink: 0;
      }
    }
  }
}
</style>
