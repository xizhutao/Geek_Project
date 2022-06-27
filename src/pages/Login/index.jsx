import { Card, Button, Checkbox, Form, Input } from 'antd'
import Logo from '../../assets/logo.png'
import './index.scss'
export default function Login() {
  const onFinish = (value) => {
    console.log(value)
  }
  return (
    <div className="login-wrapper">
      <Card className="login" bodyStyle={{ padding: 20 }}>
        <img className="logoImg" src={Logo} alt="" />
        {/* 表单 */}
        <Form
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          autoComplete="off"
          onFinish={onFinish}
          initialValues={{
            username: '13911111111',
            password: '246810',
            remember: true,
          }}
        >
          <Form.Item
            name="username"
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
            name="password"
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
