import React, { useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Popover, Steps, message, notification  } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import {
  QuestionOutlined
} from '@ant-design/icons';
import style from './index.module.css'
import Forumeditor from '@/components/Guide/Forumeditor';
import { history, useModel } from '@umijs/max';
import axios from 'axios'

const content = (
  <div>
    <p>just follow the step bar prompts</p>
  </div>
);

const App: React.FC = () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const [current, setcurrent] = useState(0)
  const [formInfo, setformInfo] = useState({})
  const [content, setcontent] = useState('')
  const [user, setuser] = useState({})

  // console.log('forum', masterProps.initialState)
  

  const handleNext = () => {
    setuser(masterProps.initialState.userInfo)
    if(current === 0){
      forumRef.current.validateFields().then((res: any)=>{
        setcurrent( current + 1 )
        setformInfo(res)
      }).catch( (err: any) => {
        console.log(err)
      })
    }else{
      if(content === '' || content.trim() === "<p><p>"){
        message.error('内容不能为空!')
      }else{
        setcurrent( current + 1 )
      }
    }
  }

  const handleSave = (state: number) => {
    //传入formInfo数据 state为保存/发布
    // {...formInfo, initialState.userID} 
    console.log('user', user)
    axios.post('/api/forumapi/addArticle ', {
      context: content, 
      userID: user.id, 
      title: formInfo.title,
      state: state,
    }).then(res=>{
      console.log(res)
      //跳转
      if(state === 0){
        history.push('/access')
      }else if(state === 1){
        history.push('/table')
      }

      notification.info({
        message: '通知',
        description:
          `您可以到${ state === 0 ? '草稿箱' : '审核列表'}查看您的贴子`,
        placement: 'bottomRight'
      })
    })
    
    
  }

  const handlePerivious = () => {
    setcurrent( current - 1 )
  }

  const forumRef = useRef(null)

  return (
    <PageContainer ghost>
      <Popover content={content} title="Publish forum" >
        <Button type="primary" style={{width: '100px'}}>发帖<QuestionOutlined /></Button>
      </Popover>
      
      <Steps
        style={{marginTop: '20px'}}
        current={ current }
        items={[
          {
            title: '基本信息',
            description: '标题',
          },
          {
            title: '发帖内容',
            description: '主题内容',
            subTitle: 'Left 00:00:08',
          },
          {
            title: '帖子提交',
            description: "保存草稿或提交审核",
          },
        ]}
      />

      <div className={current === 0 ? '':style.active}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={forumRef}
        >
          <Form.Item
            style={{marginTop: '20px'}}
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>

      <div className={current === 1 ? '':style.active} style={{marginTop: '50px'}}>
        <Forumeditor getContext={(value: any)=>{
          console.log(value)
          setcontent(value)
        }}></Forumeditor>
      </div>

      <div className={current === 2 ? '':style.active}>

      </div>

      <div style={{marginTop: '50px'}}>
        {
          current == 2 && <span>
            <Button type='primary' onClick={()=>handleSave(0)}>save</Button>
            <Button danger onClick={()=>handleSave(1)}>pull</Button>
          </span>
        }
        {
          current < 2 && <Button type='primary' onClick={handleNext}>next</Button>
        }
        {
          current > 0 && <Button onClick={handlePerivious}>back</Button>
        }
        
        
      </div>
    </PageContainer>
  );  
};

export default App;