import React, { useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Popover, Steps, message, notification  } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import {
  QuestionOutlined, VerticalAlignTopOutlined
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
  // const masterProps = useModel('@@qiankunStateFromMaster');
  // const { user } = useModel('user')
  const [current, setcurrent] = useState(0)
  const [formInfo, setformInfo] = useState({})
  const [content, setcontent] = useState('')

  // console.log('forum', masterProps.initialState)
  const masterProps = useModel('@@qiankunStateFromMaster');
  // console.log(masterProps)
  const [user, setuser] = useState(masterProps.user)
  console.log(user)
  

  const handleNext = () => {
    // setuser(masterProps.initialState.userInfo)
    if(current === 0){
      if(user.tel && user.addr){
        forumRef.current.validateFields().then((res: any)=>{
          setcurrent( current + 1 )
          setformInfo(res)
        }).catch( (err: any) => {
          console.log(err)
        })
      }else{
        message.error('请完善个人信息！')
      }
      
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
    axios.post('/api/forumapi/addArticle ', {
      context: content, 
      userID: user.id, 
      username: user.name,
      title: formInfo.title,
      state: state,
      imgURL: imgUrl,
    }).then(res=>{
      console.log(res)
      //跳转
      if(state === 0){
        history.push('/draft')
      }else if(state === 1){
        history.push('/draft')
      }

      notification.info({
        message: '通知',
        description:
          `您可以到${ state === 0 ? '我的帖子' : '审核列表'}查看您的贴子`,
        placement: 'bottomRight'
      })      
    })
  }

  const handlePerivious = () => {
    setcurrent( current - 1 )
  }

  const forumRef = useRef(null)

  const [imgUrl, setimgUrl] = useState('')

  const toUpload = () => {
    const fileInput = document.querySelector('#file-input')
    
    let formData = new FormData();
    
    formData.append('file', fileInput.files[0])
    // console.log(fileInput)

    // for(let value of formData.values()){
    //   console.log(value);   
    // }
    fetch('/api/login/upload', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      message.success('图片上传成功！')
      setimgUrl(data.imgUrl)
    });
  }

  return (
    <PageContainer ghost>
      <div style={{textAlign: 'center'}}>
        <Popover content={content} title="Publish forum">
          <Button type="primary" style={{width: '100px'}}>发帖<QuestionOutlined /></Button>
        </Popover>
      </div>
      
      
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
            subTitle: 'rich text',
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
          labelCol={{ span: 4.8 }}
          wrapperCol={{ span: 19.2 }}
          style={{ maxWidth: 600, margin: 'auto' }}
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

          {/* <Form.Item
            label="description"
            name="description"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item> */}
        </Form>

        <form id='uploadForm' method="post" encType="multipart/form-data" style={{display: 'flex', maxWidth: '600px', margin: '0 auto'}}>
          {/* Name: <input type="text" className='name' name="name" /><br /> */}
          图片：<input type="file" className='testFile' name="testFile" id='file-input'/><br />
          {/* <input type="button" value="button" onClick={()=>toUpload()} style={{marginLeft: 'auto'}}/> */}
          <Button icon={<VerticalAlignTopOutlined />} onClick={()=>toUpload()} style={{marginLeft: 'auto'}}></Button>
        </form>
      </div>

      <div className={current === 1 ? '':style.active} style={{marginTop: '50px'}}>
        <Forumeditor getContext={(value: any)=>{
          console.log(value)
          setcontent(value)
        }}></Forumeditor>
      </div>

      <div className={current === 2 ? '':style.active}>

      </div>

      <div style={{marginTop: '50px', textAlign: 'right'}}>
        {
          current == 2 && <span>
            {/* <Button type='primary' onClick={()=>handleSave(0)}>save</Button> */}
            <Button danger onClick={()=>handleSave(0)}>pull</Button>
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