<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4"
  >
    <div class="text-center">
      <h1 class="text-9xl font-bold text-blue-600 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">页面未找到</h2>
      <p class="text-xl text-gray-600 mb-8">抱歉，您访问的页面不存在。</p>
      <router-link
        to="/"
        class="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 hover:text-white hover:no-underline transition-colors duration-300"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>
