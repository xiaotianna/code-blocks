<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Search -->
    <div class="bg-white border-b">
      <div class="container mx-auto px-4">
        <div class="py-4 flex items-center space-x-4">
          <div class="relative flex-grow">
            <input
              v-model="keyword"
              type="text"
              placeholder="搜索作品、作者名称"
              class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <SearchIcon
              class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button
            @click="handleSearch"
            class="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6" v-if="projectList.length > 0">
      <!-- Component Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          v-for="item in projectList"
          :key="item.id"
        >
          <!-- Component Card -->
          <div
            class="aspect-video flex items-center justify-center p-4"
            :class="`${bgColor[Math.floor(Math.random() * bgColor.length)]}`"
          >
            <div
              class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"
            >
              <SparklesIcon class="w-6 h-6" />
            </div>
          </div>
          <div class="px-4 py-3">
            <h3 class="text-sm font-medium text-blue-600 mb-1 truncate">
              {{ item.name }}
            </h3>
            <p class="text-xs text-gray-400 truncate">作者: {{ item.user?.username }}</p>
            <div class="mt-3 flex items-center justify-end gap-3">
              <el-popconfirm
                title="是否需要将该项目复制到你的项目中？"
                width="300px"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="handleConfirm(item.id)"
                v-if="item.user?.id !== user.userInfo.id"
              >
                <template #reference>
                  <button
                    class="text-gray-600 font-medium hover:underline hover:text-gray-700 transition-colors duration-200"
                  >
                    复制项目
                  </button>
                </template>
              </el-popconfirm>
              <router-link
                :to="`/preview?id=${item.id}`"
                target="_blank"
                class="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors duration-200"
              >
                预览
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="pt-1 flex justify-end mt-6">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :default-page-size="size"
          @change="changePagination"
        />
      </div>
    </main>
    <main class="container mt-10 mx-auto px-4 py-6" v-else>
      <div class="flex flex-col items-center space-y-4">
        <div class="w-24 h-24 mb-2 text-gray-300">
          <InboxIcon class="w-full h-full" />
        </div>
        <h3 class="text-lg font-medium text-gray-900">暂无内容</h3>
        <p class="text-sm text-gray-500 text-center max-w-sm">
          这里还没有任何内容。点击下方按钮开始创建。
        </p>
        <button
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
          @click="router.push('/edit')"
        >
          <PlusIcon class="w-4 h-4" />
          <span>创建新内容</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { reqCopyProject, reqGetProject } from '@/api/editor'
import type { SearchPageItem } from '@/api/editor/type'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { SearchIcon, SparklesIcon, InboxIcon, PlusIcon } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()

const bgColor = ['bg-yellow-50', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-red-50']

let total = ref(0)
let page = ref(1)
let size = ref(12)
let keyword = ref('')
let projectList = ref<SearchPageItem[]>([])

const getProjectData = async () => {
  let params = {
    page: page.value,
    size: size.value,
    keyword: keyword.value
  }
  let { status, data, total: resTotal } = await reqGetProject(params)
  if (!status) return
  if (status) {
    projectList.value = data as SearchPageItem[]
    total.value = resTotal
  }
}

onMounted(() => {
  getProjectData()
})

const handleSearch = () => {
  page.value = 1
  getProjectData()
}

const changePagination = (currentPage: number) => {
  page.value = currentPage
  getProjectData()
}

const handleConfirm = async (id: string) => {
  let params = {
    id,
    user_id: user.userInfo.id
  }
  let { status } = await reqCopyProject(params)
  if (status) {
    ElMessage.success('复制成功')
  }
}
</script>
