<template>
  <el-table :data="tableData" class="list pr-[24px]">
    <el-table-column type="index" :index="indexMethod" label="序号" width="60" align="center" />
    <el-table-column prop="id" label="ID" width="320" />
    <el-table-column prop="name" label="页面名" width="280" show-overflow-tooltip />
    <el-table-column prop="updateTime" label="更新时间" width="160" />
    <el-table-column prop="createTime" label="创建时间" width="160" />
    <el-table-column fixed="right" label="操作" min-width="280">
      <template #default="scope">
        <el-button size="small" @click.prevent="edit(scope.$index)">编辑</el-button>
        <el-button size="small" @click.prevent="lookJSON(scope.row)">JSON</el-button>
        <el-button size="small" type="danger" @click.prevent="remove(scope.row)">删除</el-button>
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
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    align-center
    :show-close="false"
    title="JSON Schema"
    width="600"
  >
    <div v-if="dialogVisible" v-jsonlight class="w-full h-[500px] overflow-auto">
      <pre>{{ formatJSON }}</pre>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeDialog">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reqDeletePackage, reqGetPackagesList } from '@/api/editor'
import { useUserStore } from '@/stores/user'
import { formatTime } from '@/utils/formatTime'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = useUserStore()

type TableItem = {
  id: string
  name: string
  content: string
  updateTime: string
  createTime: string
}
const tableData = ref<TableItem[]>([])

let page = ref(1)
let size = ref(15)
let end = ref(false)
let total = ref(0)

type ResDataItem =
  | {
      id: number
      name: string
      content: string
      update_time: string
      create_time: string
    }
  | any

const getData = async () => {
  const params = {
    page: page.value,
    size: size.value,
    user_id: user.userInfo.id
  }
  const res = await reqGetPackagesList(params)
  const { status, data, total: resTotal } = res
  if (!status) return
  if (data) {
    total.value = resTotal
    tableData.value = [
      ...(data?.map((item: ResDataItem) => ({
        id: item.id,
        name: item.name,
        content: item.content,
        updateTime: formatTime(item.update_time),
        createTime: formatTime(item.create_time)
      })) as ResDataItem[])
    ]
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

const indexMethod = (index: number) => size.value * (page.value - 1) + index + 1

const edit = (index: number) => {
  const { id } = tableData.value[index] || {}
  router.push(`/edit?packageId=${id}`)
}

let dialogVisible = ref(false)
let lookJSONData = ref<ResDataItem>({})
const lookJSON = async (info: TableItem) => {
  lookJSONData.value = info
  dialogVisible.value = true
}

const formatJSON = computed(() => {
  try {
    return JSON.stringify(lookJSONData.value?.content, null, 2)
  } catch (error) {
    return lookJSONData.value
  }
})

const closeDialog = () => {
  lookJSONData.value = {}
  dialogVisible.value = false
}

const remove = (info: TableItem) => {
  const { id, name } = info
  ElMessageBox.confirm(`你确定要删除 "${name}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const params = { id }
      const { status } = await reqDeletePackage(params)
      if (!status) {
        return ElMessage({
          type: 'error',
          message: '删除失败！'
        })
      } else {
        getData()
        ElMessage({
          type: 'success',
          message: '删除成功！'
        })
      }
    })
    .catch(() => {})
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
.log-list {
  width: 100%;
  height: 400px;
  overflow: auto;
}
:deep(.el-table__cell:nth-of-type(1) .cell) {
  white-space: nowrap;
}
</style>
