import { App, DirectiveBinding } from 'vue-demi'
import hljs from 'highlight.js'
// import 'highlight.js/styles/a11y-light.min.css'

const handleHighlightCode = (
  el: HTMLElement,
  _binding: DirectiveBinding,
  isRemove: boolean
) => {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    if (isRemove) {
      delete (block as HTMLElement).dataset.highlighted
      block.className = ''
    }
    hljs.highlightElement(block as HTMLElement)
  })
}

export const highlight = (app: App) => {
  app.directive('highlight', {
    mounted(el, binding) {
      handleHighlightCode(el, binding, false)
    },
    updated(el, binding) {
      handleHighlightCode(el, binding, true)
    }
  })
}
