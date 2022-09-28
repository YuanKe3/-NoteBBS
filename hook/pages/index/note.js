import {
  reactive
} from 'vue'
import {
  marked
} from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/scss/github-dark.scss'

const useRenderMarkdownEffect = () => {
  // 样式
  const parse_style = reactive({
    blockquote: 'background: #eee; padding: 15px; margin: 10px 0;',
    h2: 'margin: 0 0 10px 10px;',
    h3: 'margin: 0 0 10px 10px;',
    h1: 'margin: 0 0 10px 10px;',
    p: 'margin-bottom: 10px',
    ol: 'margin: 10px 0;',
    code: 'white-space: pre-wrap;'
  })

  // marked 和 highlight 的一些基本设置
  const initHightLight = (renderer) => {
    hljs.configure({
      useBR: true,
      tabReplace: " ",
    });
    marked.setOptions({
      renderer,
      gfm: true,
      tables: true,
      sanitize: false,
      breaks: false,
      pedantic: false,
      smartLists: true,
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
    })
  }

  return {
    parse_style,
    initHightLight
  }
}

export {
  useRenderMarkdownEffect
}
