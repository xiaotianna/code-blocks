<template>
  <el-table :data="tableData" class="list pr-[24px]">
    <el-table-column
      type="index"
      :index="indexMethod"
      label="序号"
      width="60"
      show-overflow-tooltip
      align="center"
    />
    <el-table-column v-permission="['admin']" prop="id" label="用户ID" width="320" />
    <el-table-column prop="phone" label="手机号" width="120" show-overflow-tooltip />
    <el-table-column prop="username" label="昵称" width="150" show-overflow-tooltip />
    <el-table-column
      v-permission="['admin']"
      prop="password"
      label="密码"
      width="120"
      show-overflow-tooltip
    />
    <el-table-column
      v-permission="['admin']"
      prop="disable"
      label="是否禁用"
      align="center"
      width="100"
    >
      <template #default="scope">
        <el-tag :type="scope.row.is_status ? 'success' : 'danger'">{{
          scope.row.is_status ? '未禁用' : '已禁用'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      v-permission="['admin']"
      prop="admin"
      label="管理员"
      align="center"
      width="100"
    >
      <template #default="scope">
        <el-tag :type="scope.row.role === 'admin' ? 'danger' : 'primary'">{{
          scope.row.role === 'admin' ? '管理员' : '普通用户'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      v-permission="['admin']"
      fixed="right"
      label="操作"
      align="center"
      min-width="180"
    >
      <template #default="scope">
        <el-button
          size="small"
          :type="scope.row.is_status ? 'danger' : ''"
          :disabled="user.userInfo.id === scope.row.id"
          @click.prevent="updateUserStatus(scope.row)"
          >{{ scope.row.is_status ? '禁用' : '解除' }}</el-button
        >
        <el-button
          :type="scope.row.role === 'user' ? 'primary' : ''"
          size="small"
          :disabled="user.userInfo.id === scope.row.id"
          @click.prevent="updateUserAdmin(scope.row)"
          >{{ scope.row.role === 'user' ? '添加管理员' : '移除管理员' }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :default-page-size="size"
      @change="changePagination"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { reqGetUsers, reqUpdateUserRole, reqUpdateUserStatus } from '@/api/auth'
import { UserRole, type UserItem } from '@/api/auth/type'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const indexMethod = (index: number) => size.value * (page.value - 1) + index + 1

let page = ref(1)
let size = ref(15)
let total = ref(0)
let end = ref(false)

const tableData = ref<UserItem[]>([])

const getData = async () => {
  const params = {
    page: page.value,
    size: size.value
  }
  const { status, data, total: resTotal } = await reqGetUsers(params)
  if (!status) return
  if (data) {
    tableData.value = data?.map((item: UserItem) => {
      const { id, phone, password, is_status, role } = item
      return {
        ...item,
        id: id ?? 'user-xxx',
        phone: phone ?? '1-xxx',
        password: password ?? 'password-xxx',
        is_status: is_status ?? '-',
        role: role ?? '-'
      } as UserItem
    })
    total.value = resTotal
    end.value = data?.length < size.value
  }
}

onMounted(() => {
  getData()
})

const changePagination = (currentPage: number) => {
  page.value = currentPage
  getData()
}

const updateUserStatus = async (other_uinfo: UserItem) => {
  const { id: other_uid, username, is_status: disable } = other_uinfo as Required<UserItem>
  const word = !disable ? '取消禁用' : '禁用'
  ElMessageBox.confirm(`你确定要${word} "${username}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    let params = {
      user_id: user.userInfo.id,
      other_uid,
      is_status: !disable
    }
    const { status } = await reqUpdateUserStatus(params)
    if (status) {
      let currentIndex = tableData.value.findIndex((item) => item.id === other_uid)
      tableData.value[currentIndex]!.is_status = !disable as boolean
      ElMessage({
        type: 'success',
        message: '处理成功！'
      })
    }
  })
}

const updateUserAdmin = async (other_uinfo: UserItem) => {
  const { id: other_uid, username, role } = other_uinfo as Required<UserItem>
  const word = role === UserRole.USER ? '添加管理员' : '移除管理员'
  ElMessageBox.confirm(`你确定要将${word} "${username}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    let params = {
      user_id: user.userInfo.id,
      other_uid,
      role: role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN
    }
    const { status } = await reqUpdateUserRole(params)
    if (status) {
      let currentIndex = tableData.value.findIndex((item) => item.id === other_uid)
      tableData.value[currentIndex]!.role = role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN
      ElMessage({
        type: 'success',
        message: '处理成功！'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.list {
  width: 100%;
  height: calc(100% - 80px);
  overflow: auto;
}
.pagination {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
