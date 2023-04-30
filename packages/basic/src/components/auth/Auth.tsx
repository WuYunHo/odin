import { Avatar, Button, Form, Input, Modal, Popconfirm, message, Image } from 'antd'
import { useModel } from '@umijs/max';
import styles from './Auth.less'
import { useSetState } from 'ahooks';
import { useEffect, useState } from 'react';
import { QuestionOutlined } from '@ant-design/icons';
import axios from 'axios';

export function Auth() {
  // const { initialState, setInitialState } = useModel('@@initialState')
  // useEffect(()=>{
  //   if(JSON.parse(localStorage.getItem("token"))){
  //     console.log(JSON.parse(localStorage.getItem("token")))
  //     user = JSON.parse(localStorage.getItem("token"))
  //   }
  // },[])

  const { user, login, logout, fresh } = useModel('user')
  // const { login, logout } = useModel('user')
  // let { user } = useModel('user')

  // const { name } = JSON.parse(localStorage.getItem("token"))

  const [state, setState] = useSetState({
    modal: false,
    changeModal: false,
  })
  const [messageApi, contextHolder] = message.useMessage();

  const [eximage, seteximage] = useState('')

  // console.log(user)
  // console.log(initialState)

  const changePassword = () => {
    setState({ modal: false, changeModal: true})

    axios.get('/api/login/get-image-captcha').then(res=>{
      console.log(res)

      seteximage(res.data.imageBase64)
      localStorage.setItem('msgid', `${res.data.id}`)
    })
  }

  useEffect(() => {
    if (user) {
      messageApi.success(`你好呀👋，${user.name}同学`);

      // setInitialState({
      //   isLogin: true,
      //   userInfo: user
      // })
    }
  }, [user])

  useEffect(() => {
    if(JSON.parse(localStorage.getItem("token"))){
      console.log(JSON.parse(localStorage.getItem("token")).id)
      fresh(JSON.parse(localStorage.getItem("token")).id)
    }
  }, [])

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
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={async (form) => {
          const { account, password } = form

          // console.log(account, password)

          const loginresult = await login(account, password)
          console.log(loginresult)
          if(loginresult.data.state == 0){
            messageApi.error('密码错误！')
          }else if(loginresult.data.state == 1){
            messageApi.error('用户名错误！')
          }else{
            setState({ modal: false })
          }
          
          
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
          <Button icon={<QuestionOutlined />} style={{margin: '20px'}} onClick={()=>changePassword()}>忘记密码</Button>
        </Form.Item>
      </Form>
    </Modal>
    <Modal
      title="修改密码"
      centered
      open={state.changeModal}
      onCancel={() => setState({ changeModal: false })}
      footer={null}
    >
      <Form
        name="change"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={async (form) => {
          // const { account, password } = form
          
          const {account, cardmsg, pwd_1, pwd_2, msg} = form
          console.log(form, pwd_1, pwd_2)

          if(pwd_1 !== pwd_2){
            messageApi.warning('两次输入密码不相同！')
          }else{
            // console.log(account, cardmsg, pwd_2, msg)

            console.log(localStorage.getItem("msgid"))

            axios.post('api/login/check-captcha',{
              id: localStorage.getItem("msgid"),
              answer: msg,
            }).then(res=>{
              console.log(res)

              if(res.data === 'passed'){
                console.log('验证通过')

                axios.post('/api/login/changePwd',{
                  account: account,
                  cardmsg: cardmsg,
                  password: pwd_2
                }).then(res=>{
                  console.log(res)

                  messageApi.success('👋密码修改成功！')

                  setState({
                    modal: true,
                    changeModal: false,
                  })
                })
              }else if(res.data === 'error'){
                console.log('验证失败')

                messageApi.error('验证码错误！')
              }
            })
          }

          // setState({ modal: false })
        }}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="卡号"
          name="cardmsg"
          rules={[{ required: true, message: '请输入卡号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="重制密码"
          name="pwd_1"
          rules={[{ required: true, message: '请输入新密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="再次输入"
          name="pwd_2"
          rules={[{ required: true, message: '请输入新密码!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="验证码"
          // rules={[{ required: true, message: '请输入验证码 !' }]}
        >
          <Form.Item name='msg' noStyle>
            <Input style={{ width: 170 }}/>
          </Form.Item>
          <Image src={eximage} style={{height: '32px'}} onClick={()=>changePassword()}></Image>
        </Form.Item>
        
        
        
        
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button style={{margin: '20px'}} onClick={()=>{setState({modal: true, changeModal: false})}}>取消</Button>
        </Form.Item>
      </Form>
    </Modal>
  </>

  // const { name, avatar } = user
  const { name } = user

  // const { name } = JSON.parse(localStorage.getItem("token"))

  const [firstChar] = name

  return <>
    {contextHolder}
    <Popconfirm
      placement="bottomRight"
      title={'退出登录'}
      onConfirm={() => {
        messageApi.info(`再见👋，${user.name}`)
        localStorage.clear()
        return logout()     
      }}
      showCancel={false}
    >
      <div className={styles.auth} >
        <Avatar
          style={{ backgroundColor: 'grey' }}
        >{firstChar.toUpperCase()}</Avatar>
        {name}
      </div>
    </Popconfirm>
  </>
}