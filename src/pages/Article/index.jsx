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
  Tag,
  Modal,
} from 'antd'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect, useState, useRef } from 'react'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAticleChannels,
  getArticleList,
  deleteArticle,
} from '@/store/Actions'
const { RangePicker } = DatePicker
const { Option } = Select
const { confirm } = Modal
const Article = () => {
  const history = useHistory()
  // 使用useRef存数据
  const paramsRef = useRef({})
  //  优化标签状态的判断
  const articleState = {
    0: { color: '#ccc', text: '草稿' },
    1: { color: 'yellow', text: '待审核' },
    2: { color: 'green', text: '审核通过' },
    3: { color: 'red', text: '审核失败' },
  }
  const dispatch = useDispatch()
  // 获取文章频道列表、文章列表
  useEffect(() => {
    dispatch(getAticleChannels())
    dispatch(getArticleList({}))
  }, [dispatch])
  // 从redux上拿文章的数据
  const { channels, count, list, pageSize, page } = useSelector(
    (state) => state.article
  )

  const [value, setValue] = useState(1)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  // 表格数据源
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover) => {
        return (
          <img
            src={cover.images[0] ?? img404}
            width={200}
            height={150}
            alt=""
          />
        )
      },
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
      render: (data) => {
        // if (data === 0) {
        //   return <Tag color="yellow">草稿</Tag>
        // } else if (data === 1) {
        //   return <Tag color="#ccc">待审核</Tag>
        // } else if (data === 2) {
        //   return <Tag color="green">审核通过</Tag>
        // } else if (data === 3) {
        //   return <Tag color="red">审核失败</Tag>
        // }
        // 优化判断
        const tags = articleState[data]
        return <Tag color={tags.color}>{tags.text}</Tag>
      },
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
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="link"
              onClick={() => history.push(`/home/publish/${data.id}`)}
              icon={<EditOutlined />}
            />
            <Button
              type="link"
              onClick={() => onDeleteArticle(data.id)}
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      },
    },
  ]

  // 筛选数据功能
  const onFinish = (values) => {
    console.log(values)
    const params = {}
    const { channel_id, dateArr, status } = values
    // 判断状态
    if (status !== undefined) {
      params.status = status
    }
    // 判断id
    if (channel_id !== undefined) {
      params.channel_id = channel_id
    }
    // 判断日期
    if (dateArr !== undefined && dateArr !== null) {
      params.begin_pubdate = dateArr[0].format('YYYY-MM-DD HH:mm:ss')
      params.end_pubdate = dateArr[1].format('YYYY-MM-DD HH:mm:ss')
      console.log(params)
    }
    // 将定义好的params存到useRef中
    paramsRef.current = params
    // 分发action获取文章列表
    dispatch(getArticleList(params))
  }
  // 底部分页的功能
  const handlepageChang = (page, pageSize) => {
    const params = {
      ...paramsRef.current,
      page,
      per_page: pageSize,
    }
    paramsRef.current = params
    dispatch(getArticleList(params))
  }
  // 删除文章
  const onDeleteArticle = (id) => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '文章将永久删除，请再次确认',
      async onOk() {
        await dispatch(deleteArticle(id))
        await dispatch(getArticleList(paramsRef.current))
      },
    })
  }
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form onFinish={onFinish}>
          <Form.Item label="状态：" name="status">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <Select style={{ width: 120 }} placeholder="请选择所属频道">
              {channels.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey="id"
          pagination={{
            current: page,
            pageSize,
            showSizeChanger: true,
            total: count,
            onChange: handlepageChang,
          }}
        />
      </Card>
    </div>
  )
}

export default Article
