import type { App, DirectiveBinding } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.min.css'

const handleHighlightCode = (el: HTMLElement, _binding: DirectiveBinding, isRemove: boolean) => {
  const blocks = el.querySelectorAll('pre')
  blocks.forEach((block) => {
    if (isRemove) {
      delete (block as HTMLElement).dataset.highlighted
      block.className = ''
    }
    hljs.highlightElement(block as HTMLElement)
  })
}

export const jsonlight = (app: App) => {
  app.directive('jsonlight', {
    mounted(el, binding) {
      handleHighlightCode(el, binding, false)
    },
    updated(el, binding) {
      handleHighlightCode(el, binding, true)
    }
  })
}
