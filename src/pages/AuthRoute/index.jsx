import { Redirect, Route } from 'react-router-dom'
import { isAut } from '@/utils/token'
export const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuthorization = isAut()
        // 判断路由权限
        if (isAuthorization) {
          // 有路由权限跳转传过来的路由组件
          return <Component></Component>
        } else {
          // 没有路由权限重定向登录界面
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location.pathname,
                },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
