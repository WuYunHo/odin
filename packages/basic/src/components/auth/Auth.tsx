import { Avatar, Button, Form, Input, Modal, Popconfirm, message } from 'antd'
import { useModel } from '@umijs/max';
import styles from './Auth.less'
import { useSetState } from 'ahooks';
import { useEffect } from 'react';

export function Auth() {

  const { user, login, logout } = useModel('user')
  const [state, setState] = useSetState({
    modal: false
  })
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (user) {
      messageApi.success(`你好呀👋，${user.name}同学`);
    }
  }, [user])

  if (!user) return <>
    {contextHolder}
    <Button onClick={() => setState({ modal: true })}>登录</Button>
    <Modal
      title="登录"
      centered
      open={state.modal}
      onCancel={() => setState({ modal: false })}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={async (form) => {
          const { account, password } = form

          await login(account, password)
          setState({ modal: false })
        }}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>

  const { name, avatar } = user

  const [firstChar] = name

  return <>
    {contextHolder}
    <Popconfirm
      placement="bottomRight"
      title={'退出登录'}
      onConfirm={() => {
        messageApi.info(`再见👋，${user.name}`)
        return logout()
      }}
      showCancel={false}
    >
      <div className={styles.auth} >
        <Avatar
          style={{ backgroundColor: avatar }}
        >{firstChar.toUpperCase()}</Avatar>
        {name}
      </div>
    </Popconfirm>
  </>
}