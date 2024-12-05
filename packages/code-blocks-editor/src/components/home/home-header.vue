<template>
  <div class="home-header">
    <img :src="logo" alt="logo" class="logo" @click="link" />
    <h1>Code Blocks 低代码开发平台</h1>
    <div class="info" v-if="user.token">
      <img :src="baseUrl + user?.userInfo?.imgUrl" alt="" />
      <el-dropdown trigger="click">
        <div class="nick">
          <span>{{ user?.userInfo?.username }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="updateUserInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="info" v-else>
      <div class="img-null cursor-pointer"></div>
      <div class="text-gray-600 cursor-pointer" @click="router.push('/login')">未登录</div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="用户信息" width="500" :before-close="handleClose">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      label-width="auto"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="头像" prop="imgUrl">
        <el-upload
          class="avatar-uploader w-[122px] h-[122px] border rounded overflow-hidden"
          :action="reqUploadAvatarUrl"
          :headers="{
            Authorization: `Bearer ${user.token}`
          }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.imgUrl"
            :src="baseUrl + ruleForm.imgUrl"
            class="w-[120px] h-[120px]"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveInfo" :loading="isLoading" :disabled="isLoading"
          >保存</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
import { ArrowDown, Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { baseUrl } from '@/common/baseUrl'
import { useUserStore } from '@/stores/user'
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules, type UploadProps } from 'element-plus'
import { reqUploadAvatarUrl } from '@/api/upload'
import { reqUpdateUser } from '@/api/auth'

const router = useRouter()
const user = useUserStore()

const link = () => {
  router.push('/')
}

let dialogVisible = ref(false)
// 更新用户信息
const updateUserInfo = () => {
  const { username, imgUrl } = user.userInfo
  ruleForm.username = username
  ruleForm.imgUrl = imgUrl
  dialogVisible.value = true
}

// 弹窗关闭
const handleClose = (done: () => void) => {
  ruleFormRef.value?.resetFields()
  done()
}
// “取消”按钮关闭弹窗
const closeDialog = () => {
  ruleFormRef.value?.resetFields()
  dialogVisible.value = false
}

let isLoading = ref(false)

// “保存”按钮
const saveInfo = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      let params = {
        user_id: user.userInfo.id,
        username: ruleForm.username,
        imgUrl: ruleForm.imgUrl
      }
      isLoading.value = true
      let { status } = await reqUpdateUser(params)
      isLoading.value = false
      if (status) {
        ElMessage.success('更新成功!')
        let uInfo = {
          ...user.userInfo,
          username: ruleForm.username,
          imgUrl: ruleForm.imgUrl
        }
        user.setInfo(uInfo)
        closeDialog()
      }
    }
  })
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  imgUrl: ''
})
const rules = reactive<FormRules<typeof ruleForm>>({
  username: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { max: 20, message: '昵称不能超过20个字', trigger: 'blur' }
  ],
  imgUrl: [{ required: true, message: '图片不能为空', trigger: 'blur' }]
})

// 图片上传前的回调
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif' &&
    rawFile.type !== 'image/webp' &&
    rawFile.type !== 'image/svg'
  ) {
    ElMessage.error('图片格式不正确!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片不能超过2MB!')
    return false
  }
  return true
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  if (response.code === 200) {
    ElMessage.success('上传成功!')
    ruleForm.imgUrl = response.data.url
  } else {
    ElMessage.error('上传失败!')
  }
}

// 退出登录
const logout = () => {
  user.clearInfo()
  router.push('/login')
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
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>
