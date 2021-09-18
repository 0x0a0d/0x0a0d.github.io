import React, { useEffect, useRef, useState } from 'react'
import { InputOutputEditor, InputOutputRef } from '../components/InputOutputEditor'
import demo from './demo.json'
import { initTailwindJsonColorConverter } from '../utils'
import dJSON from 'dirty-json'
import ReactMarkdown from 'react-markdown'

export const TailwindCSSMapColor = () => {
  const ref = useRef<InputOutputRef>()
  const [input, setInput] = useState(JSON.stringify(demo, null, 2))
  const [error, setError] = useState('')

  useEffect(() => {
    ref.current?.setInputValue(input)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    // @ts-ignore
    <InputOutputEditor
      ref={ref}
      onChange={value => setInput(value)}
    >
      <div className={'space-x-4'}>
        <button
          className={'p-3 rounded bg-primary-200'}
          onClick={() => {
            try {
              setError('')
              const inputObj = dJSON.parse<{[k: string]: any}>(input)
              ref.current?.setResultValue(initTailwindJsonColorConverter(inputObj).exportJSON())
            } catch (e) {
              console.error(e)
              // @ts-ignore
              setError(e.message)
            }
          }}
        >JSON</button>
        <button
          className={'p-3 rounded bg-primary-200'}
          onClick={() => {
            try {
              setError('')
              const inputObj = dJSON.parse<{[k: string]: any}>(input)
              ref.current?.setResultValue(initTailwindJsonColorConverter(inputObj).exportCSS())
            } catch (e) {
              console.error(e)
              // @ts-ignore
              setError(e.message)
            }
          }}
        >CSS</button>
        {
          error && (
            <span className={'text-red-500'}>{error}</span>
          )
        }
      </div>
      <ReactMarkdown>
        {"## Create files\n\n- `/app.colors.json`\n- `/app.colors.scss` or copy directly to `index.css`\n\n## Edit files\n- Edit `/tailwind.config.js` (or `windicss`)\n```js\nmodule.exports = {\n  // ...\n  theme: {\n    extend: {\n      colors: require('./app.colors.json'),\n    },\n  },\n  // ...\n}\n\n```\n- Edit `src/index.scss`\n```scss\n// ignore this step if you copied to index.css\n@import \"../app.colors.scss\";\n\n```\n"}
      </ReactMarkdown>
    </InputOutputEditor>
  )
}
