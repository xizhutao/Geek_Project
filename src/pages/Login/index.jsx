import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import Logo from '../../assets/logo.png'
import Logo2 from '../../assets/Icon.png'
// 导入action
import { login } from '@/store/Actions'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './index.module.scss'
export default function Login() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  console.log('object')
  console.log('object')
  console.log('object')
  console.log('object')
  console.log('object2')
  console.log('object2')
  // 监听表单提交
  const onFinish = async (values) => {
    try {
      await dispatch(
        login({
          mobile: values.mobile,
          code: values.code,
        })
      )
      // 提示登录成功
      message.success('登录成功', 1, () => {
        // 手动路由跳转
        console.log(location)
        history.replace(location.state?.from ?? '/home/dashboard')
      })
    } catch (err) {
      if (!err.response) {
        message.warning('网络繁忙，请稍后再试')
      } else {
        message.warning(err.response?.data?.message)
      }
    }
  }
  return (
    <div className={styles.root}>
      <Card className="login" bodyStyle={{ padding: 20 }}>
        <img className="logoImg" src={Logo} alt="" />
        <img className="logoImg2" src={Logo2} alt="" />
        {/* 表单 */}
        <Form
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            remember: true,
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机格式不正确',
              },
            ]}
          >
            <Input maxLength={11} placeholder={'请输入手机号'} />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                len: 6,
                message: '验证码格式不正确',
              },
            ]}
          >
            <Input maxLength={6} placeholder={'请输入验证码'} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item className="submit_btn">
            <Button type="primary" block htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
