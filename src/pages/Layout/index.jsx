import { Layout, Menu, Popconfirm, Button } from 'antd'
import styles from './index.module.scss'
import {
  PieChartOutlined,
  SolutionOutlined,
  FileWordOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import React from 'react'
import {
  Link,
  Redirect,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import DashBoard from '../DashBoard'
import Publish from '../Publish'
import Article from '../Article'
import { getUserInfo, logout } from '@/store/Actions'
const { Header, Sider, Content } = Layout
const GeekLayout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const defaultSelectedKeys = location.pathname.startsWith('/home/publish')
    ? '/home/publish'
    : location.pathname
  //   刷新时获取路由的路径
  //   分发异步action请求用户信息
  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])
  //   调用hook从状态树上取用户信息
  const user = useSelector((state) => state.userInfo)
  //   用户退出
  const onLogout = () => {
    // 分发用户退出的acton
    dispatch(logout())
    // 手动路由跳转到登录页面
    history.push('/login')
  }
  const items = [
    {
      label: <Link to="/home/dashboard">数据面板</Link>,
      key: '/home/dashboard',
      icon: React.createElement(PieChartOutlined),
    },
    {
      label: <Link to="/home/article">内容管理</Link>,
      key: '/home/article',
      icon: React.createElement(SolutionOutlined),
    },
    {
      label: <Link to="/home/publish">发布文章</Link>,
      key: '/home/publish',
      icon: React.createElement(FileWordOutlined),
    },
  ]
  return (
    <Layout className={styles.root}>
      {/* 侧边栏 */}
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu
          selectedKeys={[defaultSelectedKeys]}
          mode="inline"
          theme="dark"
          items={items}
        >
          <div className="logo">GEEK</div>
          {/*菜单 defaultSelectedKeys 初始化的时候默认激活的菜单 */}
          {/* selectedKeys 可以在路由动态切换的时候，动态设置当前激活的菜单 */}
        </Menu>
      </Sider>
      <Layout>
        {/* 头部区域 */}
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{user.name}</span>
            <Popconfirm
              placement="bottomRight"
              title="您确认退出极客园自媒体端吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={onLogout}
            >
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        {/* 内容区域 */}
        <Content>
          <Route
            path="/home"
            exact
            render={() => <Redirect to="/home/dashboard"></Redirect>}
          ></Route>
          <Route path="/home/dashboard" component={DashBoard}></Route>
          <Route path="/home/publish/:id?" component={Publish}></Route>
          <Route path="/home/article" component={Article}></Route>
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
