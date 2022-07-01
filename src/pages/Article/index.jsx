import {
  Form,
  Button,
  Card,
  Breadcrumb,
  DatePicker,
  Select,
  Radio,
  Table,
  Space,
} from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// 国际化配置
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import img404 from '@/assets/error.png'
const { RangePicker } = DatePicker
const { Option } = Select

const handleChange = (value) => {
  console.log(`selected ${value}`)
}
const Article = () => {
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  // 表格数据源
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover) => (
        <img src={cover || img404} width={200} height={150} alt="" />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => '自定义状态',
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ]
  const data = [
    {
      id: '8218',
      coment_count: 0,
      cover: 'http://geek.itheima.net/resources/images/15.jpg',
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'webview离线化加载h5资源解决方案',
    },
  ]
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form>
          <Form.Item label="状态：">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>全部</Radio>
              <Radio value={2}>草稿</Radio>
              <Radio value={3}>待审核</Radio>
              <Radio value={4}>已通过</Radio>
              <Radio value={5}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：">
            <Select
              style={{ width: 120 }}
              onChange={handleChange}
              placeholder="请选择所属频道"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item label="日期：">
            <RangePicker locale={locale} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">筛选</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="根据筛选条件共查询到 5029 条结果：">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </Card>
    </div>
  )
}

export default Article
