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
import { Link, useHistory, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from '@/components/Channel'
import { getArticleById, saveArticle } from '@/store/Actions/publish'

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
  const dispatch = useDispatch()
  // 创建一个ref仓库用来存储上传文件的数量
  const fileListRef = useRef([])
  // 创建一个控制上传图片数量的状态
  const [maxCount, setMaxCount] = useState(1)
  // 创建一个控制上传图片的状态
  const [fileList, setFileList] = useState([])
  // 创建form表单实例
  const [form] = Form.useForm()
  // 获取路由携带参数
  const params = useParams()
  const isEdit = !!params.id
  // 一进入组件就拿文章详情数据
  useEffect(() => {
    const agency = async () => {
      if (!isEdit) return
      // 调度一个通过id获取文章详情的action
      const articledetail = await dispatch(getArticleById(params.id))
      console.log(articledetail)
      const {
        channel_id,
        content,
        cover: { type, images },
        title,
      } = articledetail
      // 调用form实例上的Api，向表单内填数据
      form.setFieldsValue({
        channel_id,
        content,
        type,
        title,
      })
      // 回填图片的数据
      const newImageList = images.map((item) => {
        return { url: item }
      })
      setFileList(newImageList) //??????????????????????????????????????????????????????????????????????????????????????????????????????
      // 控制数量
      setMaxCount(type)
      // 将图片列表存放到ref中
      fileListRef.current = newImageList
    }
    agency()
  }, [dispatch, params.id, isEdit, form])

  // 封装发布和存入草稿函数
  const resolveArticle = async (values, msg, isDraft) => {
    if (values.type !== fileList.length)
      return message.warning('上传图片数量不匹配')
    const { type, ...rest } = values
    const imgUrlArr = fileList.map((item) => {
      return item?.response?.data.url || item.url
    })
    const body = {
      ...rest,
      cover: {
        type,
        images: imgUrlArr,
      },
    }
    // 如果是编辑状态，将路由参数上的id值挂载到body身上
    if (isEdit) {
      body.id = params.id
    }
    // 调度一个发表文章的action
    await dispatch(saveArticle(isDraft, body, isEdit))
    message.success(msg, 1, () => {
      history.push('/home/article')
    })
  }
  // 监听表单提交事件
  const onFinish = async (values) => {
    try {
      resolveArticle(values, isEdit ? '编辑文章成功' : '发表文章成功', false)
    } catch {}
    // const { type, ...rest } = values
    // const imgUrlArr = fileList.map((item) => {
    //   return item.response.data.url
    // })
    // const body = {
    //   ...rest,
    //   cover: {
    //     type,
    //     images: imgUrlArr,
    //   },
    // }
    // // 调度一个发表文章的action
    // try {
    //   await dispatch(publishArticle(body))
    //   message.success('发表文章成功', 1, () => {
    //     history.push('/home/article')
    //   })
    // } catch {}
  }

  // 监听存入草稿事件
  const saveDraft = async () => {
    // 获取表单中的数据
    const values = await form.validateFields()
    resolveArticle(values, '存入草稿成功', true)
    // 对拿到的表单中的数据进行处理
    // const { type, ...rest } = res
    // const imgUrlArr = fileList.map((item) => {
    //   return item.response.data.url
    // })
    // const body = {
    //   ...rest,
    //   cover: {
    //     type,
    //     images: imgUrlArr,
    //   },
    // }
    // // 调度存入草稿的action
    // try {
    //   await dispatch(SaveDraft(body))
    //   message.success('存入草稿成功', 1, () => {
    //     history.push('/home/article')
    //   })
    // } catch {}
  }
  // 监听radio按钮的变化
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    if (e.target.value === 1) {
      const newFile = fileListRef.current[0] ? [fileListRef.current[0]] : []
      console.log('newFile', newFile)
      setFileList(newFile)
    } else if (e.target.value === 3) {
      const newFileList = fileListRef.current
      console.log(newFileList)
      setFileList(newFileList)
    }
    setMaxCount(e.target.value)
  }
  // 上传图片
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
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
            <Breadcrumb.Item>
              {isEdit ? '编辑文章' : '发布文章'}
            </Breadcrumb.Item>
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
                {isEdit ? '编辑文章' : '发布文章'}
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
