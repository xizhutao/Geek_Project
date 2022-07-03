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
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getAticleChannels } from '@/store/Actions/article'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './index.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from '@/components/Channel'
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
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
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
  const handleChange = (filelist) => {
    console.log(filelist)
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
        >
          <Form.Item label="文章标题：" name="title">
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item label="所属频道：" name="channel_id">
            <Channel width={400} />
          </Form.Item>
          {/* 文章封面 */}
          <Form.Item label="文章封面：">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>单图</Radio>
              <Radio value={2}>三图</Radio>
              <Radio value={3}>无图</Radio>
            </Radio.Group>
            {/* 上传图片 */}
            <Upload
              // 向后台提交的参数
              name="image"
              action="http://geek.itheima.net/v1_0/upload"
              listType="picture-card"
              onPreview={handlePreview}
              // 提交的文件的列表
              fileList={fileList}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
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
              <Button type="primary">发表文章</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Publish
