import Component from '..' // .. => ../index.ts
import CurrentComponent from '../index.vue'
import { expect, describe, test } from 'vitest'
// mount做组件的渲染
import { mount } from '@vue/test-utils'
// 做组件的初始化
import { createApp } from 'vue-demi'
import { COMPONENT_PREFIX } from '@/config/constant' // cb

const componentCode = 'image'
const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`

describe(`${componentCode} 基本测试`, () => {
  test('1. 测试组件名', () => {
    const app = createApp({}).use(Component)
    expect(app.component(Component.name || '')).toBeTruthy()
  })

  test('2. 测试主要class', () => {
    // 挂载组件
    const wrapper = mount(CurrentComponent)
    // 查找class
    expect(wrapper.find(componentClass).classes()).toBeTruthy()
    // 卸载组件
    wrapper.unmount()
  })
})

describe(`${componentCode} props测试`, () => {
  test('测试src', () => {
    const src =
      'https://img0.baidu.com/it/u=1298002161,2550912603&fm=253&fmt=auto&app=138&f=JPEG?w=1423&h=800'
    const wrapper = mount(CurrentComponent, {
      // 模拟vue组件script
      props: {
        data: {
          src: {
            desktop: src,
            mobile: src
          }
        }
      }
    })
    // componentClass + ' .image'：cb-image .image
    // attributes('src'))获取标签上的src值，toContain(src)判断是否是定义的src
    expect(
      wrapper.find(componentClass + ' .image').attributes('src')
    ).toContain(src)
  })
})
