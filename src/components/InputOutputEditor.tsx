import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ReactCodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { json } from '@codemirror/lang-json'
import { Extension } from '@codemirror/state'

type FunctionInputTextReturnVoid = (text: string) => void
interface InputOutputEditorProps {
  onChange: FunctionInputTextReturnVoid
  inputExtensions?: Extension[]
  resultExtensions?: Extension[]
  inputProps?: ReactCodeMirrorProps
  resultProps?: ReactCodeMirrorProps
  inputHeader?: string
  resultHeader?: string
}

export interface InputOutputRef {
  setInputValue: FunctionInputTextReturnVoid
  setResultValue: FunctionInputTextReturnVoid
}
export const InputOutputEditor = forwardRef<InputOutputRef | undefined, InputOutputEditorProps>((props, ref) => {
  const {
    children,
    onChange,
    inputExtensions,
    resultExtensions,
    inputProps = {},
    resultProps = {},
    inputHeader = 'JSON Object',
    resultHeader = 'Output Result',
  } = props
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')

  useImperativeHandle(ref, () => ({
    setResultValue: (text: string) => setResultValue(text),
    setInputValue: (text: string) => setInputValue(text),
  }))

  return (
    <div className={'p-2 flex flex-col space-y-4 flex-grow'}>
      <div className={'flex flex-row space-x-4'}>
        <div className={'w-1/2'}>
          <span className={'text-lg'}>{ inputHeader }</span>
          <ReactCodeMirror
            value={inputValue}
            height='400px'
            className={'border'}
            extensions={inputExtensions ?? [json()]}
            onChange={(value) => {
              onChange(value)
            }}
            {...inputProps}
          />
        </div>
        <div className={'w-1/2'}>
          <span className={'text-lg'}>{ resultHeader }</span>
          <ReactCodeMirror
            value={resultValue}
            height='400px'
            className={'border'}
            extensions={resultExtensions ?? [javascript()]}
            {...resultProps}
          />
        </div>
      </div>
      {
        children && (
          <div className={'mt-2'}>
            {
              children
            }
          </div>
        )
      }
    </div>
  )
})
InputOutputEditor.displayName = 'InputOutputEditor'
