<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Main Content -->
    <div class="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl w-full">
        <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <!-- Left side: Text content -->
          <div class="mb-12 lg:mb-0">
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              A low code project
              <span class="text-blue-600">Code Blocks</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8">
              一款低代码开发平台（LCDP）：开发者不需要传统的手写代码的方式进行编程，采用图形化拖拽的方式，配置参数完成开发工
              作。低代码核心：降低重复劳动（营销活动、中后台系统）。
            </p>
            <button
              class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              @click="router.push('/')"
            >
              开始使用 / Get Started
            </button>
          </div>

          <!-- Right side: Login Form -->
          <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md m-auto">
            <h2 class="text-2xl font-bold text-gray-900 mb-6" v-if="route.query?.type === 'login'">
              登录
            </h2>
            <h2
              class="text-2xl font-bold text-gray-900 mb-6"
              v-if="route.query?.type === 'register'"
            >
              注册
            </h2>
            <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="auto">
              <div class="mb-4">
                <div class="block text-sm font-medium text-gray-700 mb-2">手机号</div>
                <el-form-item prop="phone">
                  <input
                    v-model="form.phone"
                    id="phone"
                    autocomplete="off"
                    class="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入手机号"
                  />
                </el-form-item>
              </div>
              <div class="mb-6">
                <div class="block text-sm font-medium text-gray-700 mb-2">密码</div>
                <el-form-item prop="password">
                  <input
                    v-model="form.password"
                    type="password"
                    autocomplete="off"
                    id="password"
                    class="w-full px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请输入密码"
                  />
                </el-form-item>
              </div>
            </el-form>
            <button
              @click="submitForm(ruleFormRef)"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {{ route.query?.type === 'login' ? '登录' : '注册' }}
            </button>
            <div class="mt-4 text-center">
              <span
                class="text-sm text-blue-600 hover:underline cursor-pointer"
                @click="changeType"
                >{{ route.query?.type === 'register' ? '登录' : '注册' }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer (Fixed at bottom) -->
    <div class="border-t border-gray-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">Design & Code by</p>
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium">wifi歪f</span>
            <div class="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span class="text-sm font-medium">全栈(主前端)开发</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElLoading, ElMessage } from 'element-plus'
import { reqLogin, reqRegister } from '@/api/auth'
import { md5 } from '@/utils/index'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const route = useRoute()
const router = useRouter()
const types = ['login', 'register']

onMounted(() => {
  if (!route.query?.type || !types.includes(route.query?.type as string)) {
    router.replace({
      path: '/login',
      query: {
        type: 'login'
      }
    })
  }
})

const form = reactive({
  phone: '',
  password: ''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '手机号为11位', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      console.warn('error submit!', fields)
      return
    }
    const { type } = route.query
    const loading = ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    if (type === 'login') {
      await login()
    } else if (type === 'register') {
      await register()
    }
    loading.close()
  })
}

const login = async () => {
  const params = {
    phone: form.phone,
    password: md5(form.password)
  }
  const { status, data } = await reqLogin(params)
  if (status) {
    user.setInfo(data)
    user.setRole(data.role === 'user' ? 10 : 20)
    ElMessage({
      message: '登录成功！',
      type: 'success'
    })
    router.push('/')
  }
}

const register = async () => {
  const params = {
    phone: form.phone,
    password: md5(form.password)
  }
  const { status } = await reqRegister(params)
  if (status) {
    ElMessage({
      message: '注册成功',
      type: 'success'
    })
  }
}

const changeType = () => {
  const { type } = route.query
  form.phone = ''
  form.password = ''
  if (type === 'login') {
    router.replace({ path: '/login', query: { type: 'register' } })
  } else {
    router.replace({ path: '/login', query: { type: 'login' } })
  }
}
</script>
