import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import { Object2Expect } from './Object2Expect/Object2Expect'
import { TailwindCSSMapColor } from './TailwindCSSMapColor/TailwindCSSMapColor'
import { Json2JSDoc } from './Json2JSDoc/Json2JSDoc'

export const App = () => {
  return (
    <div className='space-x-2 w-screen h-screen'>
      <div className={'h-full bg-gray-300 p-4 w-80 float-left'}>
        <ul className={'space-y-4'}>
          <li>
            <Link to={'/json2jsdoc'}>JSON 2 JSDoc</Link>
          </li>
          <li>
            <Link to={'/object2expect'}>Object 2 Jest Expect</Link>
          </li>
          <li>
            <Link to={'/tailwindcss'}>TailwindCSS - Map Color</Link>
          </li>
          <li>
            <Link to={'/at-command'}>AT Commands</Link>
          </li>
        </ul>
      </div>
      <div className={'ml-80'}>
        <Switch>
          <Route exact path={'/'}>
            <h3>Please select a topic</h3>
          </Route>
          <Route path={'/object2expect'}>
            <Object2Expect />
          </Route>
          <Route path={'/tailwindcss'}>
            <TailwindCSSMapColor />
          </Route>
          <Route path={'/json2jsdoc'}>
            <Json2JSDoc />
          </Route>
          <Route path={'/at-command'}>
            <Redirect to={'/at-command'} />
          </Route>
          <Route path={'/'}>
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </div>
    </div>
  )
}
