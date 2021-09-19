import React, { useRef, useState } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import dJSON from 'dirty-json'
import { object2expect } from '../utils'
import { InputOutputEditor, InputOutputRef } from '../components/InputOutputEditor'

export const Object2Expect = () => {
  const ref = useRef<InputOutputRef>(null)
  const [deep, setDeep] = useState(0)
  const [varName, setVarName] = useState('')
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
    >
      <div className={'mt-2 space-y-4'}>
        <div className={'flex flex-col'}>
          <label htmlFor='deep'>Deep</label>
          <div className={'space-x-4'}>
            <input
              id={'deep'}
              type={'number'}
              min={1}
              placeholder={'Children deep'}
              value={deep}
              className={'border rounded p-3 w-60'}
              onChange={e => {
                if (!isNaN(+e.target.value)) setDeep(+e.target.value)
              }}
            />
          </div>
        </div>
        <div className={'flex flex-col'}>
          <label htmlFor='varName'>Var name</label>
          <div className={'space-x-4'}>
            <input
              id={'varName'}
              placeholder={'Variable name. Default: result'}
              value={varName}
              className={'border rounded p-3 w-60'}
              onChange={e => {
                setVarName(e.target.value)
              }}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setError('')
            try {
              const input = dJSON.parse(codeValue)
              const lines = object2expect(input, deep, varName || 'result')
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
        {
          error && (
            <span className={'text-red'}>{error}</span>
          )
        }
      </div>
    </InputOutputEditor>
  )
}
