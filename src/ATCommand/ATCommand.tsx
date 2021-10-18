import React, { useEffect, useState } from 'react'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ATCommandDetail } from './ATCommandDetail'

const client = axios.create({
  baseURL: 'https://at-command.xiga.io'
})
client.interceptors.response.use((res: AxiosResponse<any>) => {
  if (!res.data.success) {
    throw new Error(res.data.data?.message || res.data.message || res.data)
  }
  return res.data.data
})

type ATCommandItem = {_id: string, command: string}
export const ATCommand = () => {
  const { path, url } = useRouteMatch()
  const [commands, setCommands] = useState<ATCommandItem[]>([])
  const [filter, setFiler] = useState('')

  useEffect(() => {
    client.get<void, ATCommandItem[]>('/at-command').then(res => {
      setCommands(res.sort((a, b) => {
        if (a.command < b.command) return -1
        else return 1
      }))
    })
  }, [])

  return (
    <div className='space-x-2 w-screen h-screen overflow-hidden'>
      <div className={'h-full bg-gray-300 p-4 w-80 float-left overflow-auto'}>
        <div className={'flex flex-row space-x-2 mb-4'}>
          <input className={'p-2'} placeholder={'Type to Filter'} value={filter} onChange={e => setFiler(e.target.value.trim())} />
          <button className={'p-2 bg-primary-200 rounded'} onClick={() => setFiler('')}>Clear</button>
        </div>
        <ul className={'space-y-2'}>
          {
            commands
              .filter(({ command }) => !filter || command.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
              .map(({ command, _id }) => {
                return (
                  <li key={_id}>
                    <Link to={`${url}/${_id}`}>{command}</Link>
                  </li>
                )
              })
          }
        </ul>
      </div>
      <div className={'ml-80'}>
        <Switch>
          <Route exact path={path}>
            Please select a command
          </Route>
          <Route path={`${path}/:id`}>
            <ATCommandDetail />
          </Route>
          <Route path={'/'}>
            <Redirect to={path} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
