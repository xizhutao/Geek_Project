import Login from './pages/Login'
import Layout from '@/pages/Layout'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { AuthRoute } from '@/pages/AuthRoute'
import { customHistory } from '@/utils/history'
// import { lazy } from 'react'
import './App.scss'
// const NotFound = lazy(() => import('@/pages/NotFound'))
export default function App() {
  return (
    <Router history={customHistory}>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          {/* <Route path="/home" component={Layout} /> */}
          <AuthRoute path="/home" component={Layout}></AuthRoute>
          <Redirect path="/" to="/login" />
          {/* <Route component={NotFound}></Route> */}
        </Switch>
      </div>
    </Router>
  )
}
