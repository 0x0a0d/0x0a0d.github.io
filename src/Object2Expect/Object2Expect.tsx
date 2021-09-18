import React, { useRef, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import dJSON from 'dirty-json'
import { object2expect } from '../utils'
import { InputOutputEditor, InputOutputRef } from '../components/InputOutputEditor'

export const Object2Expect = () => {
  const ref = useRef<InputOutputRef>(null)
  const [deep, setDeep] = useState(0)
  const [codeValue, setCodeValue] = useState('')
  const [error, setError] = useState<string>()

  return (
  // @ts-ignore
    <InputOutputEditor
      ref={ref}
      onChange={(value) => {
        setCodeValue(value)
      }}
      inputExtensions={[json()]}
      resultExtensions={[javascript()]}
      resultProps={{
        editable: false,
      }}
    >
      <div className={'mt-2'}>
        <div className={'flex flex-col'}>
          <label htmlFor='deep'>Deep</label>
          <div className={'space-x-4'}>
            <input
              id={'deep'}
              type={'number'}
              min={1}
              placeholder={'Children deep'}
              value={deep}
              className={'border rounded p-3 w-50'}
              onChange={e => {
                if (!isNaN(+e.target.value)) setDeep(+e.target.value)
              }}
            />
            <button
              onClick={() => {
                setError('')
                try {
                  const input = dJSON.parse(codeValue)
                  const lines = object2expect(input, deep)
                  ref.current?.setResultValue(lines.join('\n'))
                } catch (e) {
                  // @ts-ignore
                  setError(e?.message)
                  console.log(e)
                }
              }}
              className={'p-3 rounded border bg-primary-100'}
            >
              Convert
            </button>
          </div>
        </div>
        {
          error && (
            <span className={'text-red'}>{error}</span>
          )
        }
      </div>
    </InputOutputEditor>
  )
}
