import Component from '..'
import CurrentComponent from '../index.vue'
import { expect, describe, test } from 'vitest'
// mount做组件的渲染
import { mount } from '@vue/test-utils'
// 做组件的初始化
import { createApp } from 'vue-demi'
import { COMPONENT_PREFIX } from '@/config/constant' // cb

const componentCode = 'column'
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

// describe(`${componentCode} props测试`, () => {
//
// })
