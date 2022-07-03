import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Input,
  Space,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getAticleChannels } from '@/store/Actions/article'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from '@/components/Channel'
import { publishArticle, SaveDraft } from '@/store/Actions/publish'

// 上传图片框
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
// 组件
const Publish = () => {
  const history = useHistory()
  // 监听表单提交事件
  const onFinish = async (values) => {
    const { type, ...rest } = values
    const imgUrlArr = fileList.map((item) => {
      return item.response.data.url
    })
    const body = {
      ...rest,
      cover: {
        type,
        images: imgUrlArr,
      },
    }
    // 调度一个发表文章的action
    try {
      await dispatch(publishArticle(body))
      message.success('发表文章成功', 1, () => {
        history.push('/home/article')
      })
    } catch {}
  }
  // 创建form表单实例
  const [form] = Form.useForm()
  // 监听存入草稿事件
  const saveDraft = async () => {
    // 获取表单中的数据
    const res = await form.validateFields()
    // 对拿到的表单中的数据进行处理
    const { type, ...rest } = res
    const imgUrlArr = fileList.map((item) => {
      return item.response.data.url
    })
    const body = {
      ...rest,
      cover: {
        type,
        images: imgUrlArr,
      },
    }
    // 调度存入草稿的action
    try {
      await dispatch(SaveDraft(body))
      message.success('存入草稿成功', 1, () => {
        history.push('/home/article')
      })
    } catch {}
  }
  // 监听radio按钮的变化
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    if (e.target.value === 1) {
      const newFile = fileListRef.current[0] ? [fileListRef.current[0]] : []
      setFileList(newFile)
    } else if (e.target.value === 3) {
      const newFileList = fileListRef.current
      setFileList(newFileList)
    }
    setMaxCount(e.target.value)
  }
  // 创建一个ref仓库用来存储上传文件的数量
  const fileListRef = useRef([])
  // 创建一个控制上传图片数量的状态
  const [maxCount, setMaxCount] = useState(1)
  // 上传图片
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const handleCancel = () => setPreviewVisible(false)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }
  // 监听上传文件事件
  const handleChange = (filelist) => {
    fileListRef.current = filelist.fileList
    return setFileList(filelist.fileList)
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  // 频道数据
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAticleChannels())
  }, [dispatch])
  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ content: '' }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="文章标题：" name="title">
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="所属频道：" name="channel_id">
            <Channel width={400} />
          </Form.Item>
          {/* 文章封面 */}
          <Form.Item label="文章封面：">
            <Form.Item name="type">
              <Radio.Group onChange={onChange} value={maxCount}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={2}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {/* 上传图片 */}
            {maxCount !== 2 ? (
              <Upload
                // 向后台提交的参数
                name="image"
                action="http://geek.itheima.net/v1_0/upload"
                listType="picture-card"
                onPreview={handlePreview}
                multiple={maxCount === 3}
                maxCount={maxCount}
                // 提交的文件的列表
                fileList={fileList}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            ) : (
              ''
            )}
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
          {/* 富文本编辑器 */}
          <Form.Item label="文章内容：" name="content">
            <ReactQuill theme="snow" placeholder="请输入文章内容" />
          </Form.Item>
          {/* 发表文章 */}
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button htmlType="submit" type="primary">
                发表文章
              </Button>
              <Button onClick={saveDraft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Publish
