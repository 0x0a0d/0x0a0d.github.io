import React from 'react'
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { Object2Expect } from './Object2Expect'

function App() {
  const { path, url } = useRouteMatch()
  return (
    <div className={'w-screen h-screen overflow-hidden rounded-lg p-4'}>
      <ul>
        <li>
          <Link to={`${url}/object2expect`}>Object 2 Expect</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic</h3>
        </Route>
        <Route path={`${path}/object2expect`}>
          <Object2Expect />
        </Route>
        <Route path={'/'}>
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
