import { Layout, Menu } from 'antd'
import React from 'react'
const { Header, Content, Sider } = Layout
const items2 = new Array(3).fill(null).map((_, j) => {
  return {
    label: `option`,
  }
})
export default function GeerLayout() {
  return (
    <div>
      <Layout>
        {/* 头部区域 */}
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
        </Header>
        {/* 下部主题部分 */}
        <Layout>
          {/* 侧边栏 */}
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={items2}
            />
          </Sider>
          {/* 右侧内容区域 */}
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            {/* 右侧内容区域 */}
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
