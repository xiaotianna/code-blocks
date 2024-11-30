<template>
  <el-table :data="tableData" class="list">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="页面名" width="270" show-overflow-tooltip />
    <el-table-column prop="updateTime" label="更新时间" width="200" />
    <el-table-column prop="createTime" label="创建时间" width="200" />
    <el-table-column fixed="right" label="操作" min-width="260">
      <template #default="scope">
        <el-button size="small" type="primary" @click.prevent="view(scope.$index)">查看</el-button>
        <el-button size="small" @click.prevent="edit(scope.$index)">编辑</el-button>
        <el-button size="small" @click.prevent="log(scope.$index)">日志</el-button>
        <el-button size="small" type="danger" @click.prevent="remove(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-button v-show="page !== 1" @click="prev">上一页</el-button>
    <el-button v-show="!end" @click="next">下一页</el-button>
  </div>

  <el-dialog v-model="dialogVisible" title="日志" width="900">
    <el-table :data="logList" class="log-list" @row-click="logRowClick">
      <el-table-column prop="userId" label="用户ID" width="120" />
      <el-table-column prop="name" label="页面名" width="240" />
      <el-table-column prop="content" label="内容" width="300" show-overflow-tooltip />
      <el-table-column prop="createTime" label="创建时间" width="200" />
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const page = ref(1)
const size = ref(20)
const end = ref(false)

const dialogVisible = ref(false)
interface LogRow {
  userId: string
  name: string
  content: string
  createTime: string
}
const logList = ref<LogRow[]>([])

const tableData = ref<
  {
    id: number
    name: string
    content: string
    updateTime: string
    createTime: string
  }[]
>([
  {
    id: 1,
    name: 'test',
    content: 'test',
    updateTime: '2023-05-05 12:00:00',
    createTime: '2023-05-05 12:00:00'
  },
  {
    id: 2,
    name: 'test',
    content: 'test',
    updateTime: '2023-05-05 12:00:00',
    createTime: '2023-05-05 12:00:00'
  }
])

const getData = async () => {
  // const params = {
  //   page: page.value,
  //   size: size.value
  // }
  // // const { status, data } = await getPageListAsync(params)
  // if (!status) return
  // if (data) {
  //   tableData.value = data?.map(
  //     (item: {
  //       page_id: number
  //       name: string
  //       content: string
  //       update_time: string
  //       create_time: string
  //     }) => {
  //       return {
  //         id: item.page_id,
  //         name: item.name,
  //         content: item.content,
  //         updateTime: item.update_time,
  //         createTime: item.create_time
  //       }
  //     }
  //   )
  //   end.value = data?.length < size.value
  // }
}

getData()

const prev = () => {
  page.value--
  getData()
}
const next = () => {
  page.value++
  getData()
}
const view = (index: number) => {
  const { id } = tableData.value[index] || {}
  window.open('http://localhost:5173/#/?id=' + id, '_blank')
}
const edit = (index: number) => {
  const { id } = tableData.value[index] || {}
  router.push(`/edit?id=${id}`)
}
const log = async (index: number) => {
  //   dialogVisible.value = true
  //   const { id } = tableData.value[index] || {}
  //   const params = {
  //     url: '/rest/v1/page/update',
  //     url_unique: String(id)
  //   }
  //   // const { status, data } = await getLogListAsync(params)
  //   if (!status) return
  //   if (data) {
  //     logList.value = data.map(
  //       (item: {
  //         user_id: string
  //         create_time: string
  //         body: {
  //           content: string
  //           name: string
  //         }
  //       }) => {
  //         return {
  //           userId: item.user_id,
  //           createTime: item.create_time,
  //           name: item.body.name,
  //           content: item.body.content
  //         }
  //       }
  //     )
  //   }
}
const remove = (index: number) => {
  //   const { name, id } = tableData.value[index] || {}
  //   ElMessageBox.confirm(`你确定要删除 "${name}" 吗？`, '警告', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(async () => {
  //     const { status, data } = await deletePageAsync(id)
  //     if (!status) return
  //     if (data) {
  //       tableData.value.splice(index, 1)
  //       ElMessage({
  //         type: 'success',
  //         message: '删除成功！'
  //       })
  //     }
  //   })
}
const { copy } = useClipboard()
const logRowClick = async (row: LogRow) => {
  await copy(row.content || '')
  ElMessage({
    type: 'success',
    message: '复制成功！'
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
  justify-content: flex-end;
}
.log-list {
  width: 100%;
  height: 400px;
  overflow: auto;
}
</style>
