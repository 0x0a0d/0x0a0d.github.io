import React, { useEffect, useRef, useState } from 'react'
import { InputOutputEditor, InputOutputRef } from '../components/InputOutputEditor'
import demo from './demo.json'
import dJSON from 'dirty-json'
import ReactMarkdown from 'react-markdown'
import { json2JSDoc } from 'json2jsdoc'

export const Json2JSDoc = () => {
  const ref = useRef<InputOutputRef>()
  const [input, setInput] = useState(JSON.stringify(demo, null, 2))
  const [error, setError] = useState('')

  const [namespace, setNamespace] = useState('')
  const [memberOf, setMemberOf] = useState('')
  const [valueAsDescription, setValueAsDescription] = useState(false)

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
      <div className={'space-y-4'}>
        <div className={'space-x-4'}>
          <label htmlFor='namespace'>Namespace</label>
          <input value={namespace} onChange={e => setNamespace(e.target.value)} className={'p-3 rounded border'} placeholder={'Default'} id={'namespace'} />
        </div>
        <div className={'space-x-4'}>
          <label htmlFor='memberOf'>memberOf</label>
          <input value={memberOf} onChange={e => setMemberOf(e.target.value)} className={'p-3 rounded border'} placeholder={'Parent.Namespace'} id={'memberOf'} />
        </div>
        <div className={'space-x-4'}>
          <label htmlFor='valueAsDescription'>Use input value as description</label>
          <input checked={valueAsDescription} onChange={e => setValueAsDescription(e.target.checked)} type={'checkbox'} className={'p-3 rounded border'} id={'valueAsDescription'} />
        </div>
        <div className={'space-x-4'}>
          <button
            className={'p-3 rounded bg-primary-200'}
            onClick={() => {
              try {
                setError('')
                const inputObj = dJSON.parse<{[k: string]: any}>(input)
                ref.current?.setResultValue(json2JSDoc(inputObj, {
                  namespace: namespace,
                  memberOf: memberOf,
                  useInputValueAsDescription: valueAsDescription
                }))
              } catch (e) {
                console.error(e)
                // @ts-ignore
                setError(e.message)
              }
            }}
          >Convert</button>
        </div>
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
