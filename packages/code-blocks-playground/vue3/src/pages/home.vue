<template>
  <div class="container">
    <!-- <mo-image :data="data" /> -->
    <cb-container
      v-if="content.block"
      :content="content"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { getPageByIdAsync } from '@/api/page'
// import { userLoginAsync } from '@/api/user'
const router = useRouter()

const data = ref({
  src: {
    desktop:
      'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
    mobile:
      'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
  }
})

const content = ref({
  page: {
    title: {
      mobile: '',
      desktop: ''
    },
    keywords: {
      mobile: '',
      desktop: ''
    },
    background: {
      mobile: '#FBCBD7',
      desktop: '#FBCAD7'
    },
    description: {
      mobile: '',
      desktop: ''
    }
  },
  block: [
    {
      id: '9rq3cvr1',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '100%',
          desktop: '600px'
        },
        height: {
          mobile: '420px',
          desktop: '200px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    },
    {
      id: 'e7ati3fq',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '80%',
          desktop: '600px'
        },
        height: {
          mobile: '295px',
          desktop: '200px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    },
    {
      id: 'l8x8ickx',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '80%',
          desktop: '600px'
        },
        height: {
          mobile: '265px',
          desktop: '265px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    },
    {
      id: '8svzwnv1',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '80%',
          desktop: '600px'
        },
        height: {
          mobile: '370px',
          desktop: '795px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    },
    {
      id: '1dzx5l77',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '80%',
          desktop: '600px'
        },
        height: {
          mobile: '500px',
          desktop: '1030px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    },
    {
      id: 'ijdnepsk',
      code: 'image',
      icon: 'image',
      name: '图片',
      formData: {
        src: {
          mobile:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800',
          desktop:
            'https://img0.baidu.com/it/u=2616014848,941355303&fm=253&fmt=auto?w=1422&h=800'
        },
        link: {
          mobile:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html',
          desktop:
            'https://www.bilibili.com/blackboard/era/8NTg7VcIFGI13JYp.html'
        },
        width: {
          mobile: '80%',
          desktop: '600px'
        },
        height: {
          mobile: '195px',
          desktop: '395px'
        },
        display: {
          mobile: true,
          desktop: true
        }
      }
    }
  ]
})

// const newContent = router.currentRoute.value.query.content
// const id = router.currentRoute.value.query.id
// if (newContent) content.value = JSON.parse(newContent)

// const token = ref('')

// const getData = async () => {
//   if (!id) return

//   const { status, data } = await getPageByIdAsync(id, {
//     headers: {
//       Authorization: 'Bearer ' + token.value
//     }
//   })
//   if (!status) return
//   if (data) {
//     content.value = data.content
//   }
// }
// const login = async () => {
//   const { status, data } = await userLoginAsync({
//     username: 'beibei',
//     password: '25d55ad283aa400af464c76d713c07ad'
//   })
//   if (!status) return
//   if (data) {
//     token.value = data.token
//     await getData()
//   }
// }
// if (id) {
//   login()
// }
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
