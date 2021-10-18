import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { DomUtils, parseDocument } from 'htmlparser2'
import { atCommandClient } from './ATCommand'

interface ATCommandDetailInterface {
  command: string
  brief: string
  description: string
  usage?: string
  example?: string
  support?: string
  script?: string
  output?: string
  images: string[]
  video?: string

}

const innerText = (html?: string): string => {
  if (html == null) return ''
  const doc = parseDocument(html, {
    decodeEntities: true
  })
  return DomUtils.innerText(doc.children)
}

export const ATCommandDetail = () => {
  const { id } = useParams<{id: string}>()

  const [data, setData] = useState<ATCommandDetailInterface>()

  useEffect(() => {
    if (!id) return
    atCommandClient.get<any, ATCommandDetailInterface>(`/at-command/${id}`).then(atCommandInfo => {
      setData(atCommandInfo)
    })
  }, [id])

  if (!data) {
    return (
      <div>Please wait...</div>
    )
  }

  return (
    <div className='ml-80 pt-10 pb-10 space-x-2 overflow-y-auto h-screen'>
      <div className='w-2xl space-y-4'>
        <div>
          <div className={'mb-4'}>
            <div className='font-semibold'>{data.command}</div>
            <div className='text-sm bg-gray-50 p-4 rounded'>{ data.brief }</div>
          </div>
          <div>
            <div className='font-semibold'>Description</div>
            <div className='text-sm bg-gray-50 p-4 rounded'>{ innerText(data.description) }</div>
          </div>
          <div>
            <div className='font-semibold'>Support</div>
            <div className='text-sm bg-gray-50 p-4 rounded'>{ innerText(data.support) }</div>
          </div>
          <div>
            <div className='font-semibold'>Example</div>
            <pre className='text-xs bg-gray-50 p-4 rounded'>{ innerText(data.example) }</pre>
          </div>
        </div>
        <div>
          <div className='font-semibold'>Images/Video</div>
          <div className={'space-y-4'}>
            {
              (data.images || []).map(image => {
                return (
                  <img
                    alt={''}
                    key={image}
                    src={image}
                  />
                )
              })
            }
            {
              data.video && (
                <iframe
                  src={data.video}
                  className={'w-full'}
                  height={440}
                />
              )
            }
          </div>
        </div>
        <div>
          <div className='font-semibold'>Script</div>
          <pre className='text-xs bg-gray-200 p-4 rounded whitespace-pre-wrap'>{ innerText(data.script) }</pre>
        </div>
        <div>
          <div className='font-semibold'>Output</div>
          <pre className='text-xs bg-gray-200 p-4 rounded whitespace-pre-wrap'>{ innerText(data.output) }</pre>
        </div>
      </div>
    </div>
  )
}
