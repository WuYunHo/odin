import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useModel } from '@umijs/max';

const { TextArea } = Input;

export default function Comments(props: any) {
  const [comments, setcomments] = useState([])

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)

  const [change, setchange] = useState(0)

  useEffect(()=>{
    axios.post('/api/forumapi/findFirstComment', {
      articleID: props.id
    }).then(res=>{
      console.log(res)
      setcomments(res.data.data)
    })
  },[change])

  const onFinish = (values: any) => {
    console.log(values.context);
    axios.post('/api/forumapi/addFirstComment', {
      articleID: props.id,
      userID: user.id,
      context: values.context
    }).then(res=>{
      console.log(res)
      setchange(Math.random())
    })
  };

  return (
    <div>
      {
        comments.map(item=>
            <div>userID_{item.userID}:{item.context};</div>
          )
      }
      <Form onFinish={onFinish}>
        <Form.Item label="评论：" name='context'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{float: 'right'}}>
            send
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
}
