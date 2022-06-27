import Login from './pages/Login'
import Layout from '@/pages/Layout'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import './App.scss'
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Layout} />
          <Redirect path="/" to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
