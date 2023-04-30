import React, { useRef, useState } from 'react';
import { Button, Checkbox, Form, Input, Popover, Steps, message, notification, DatePicker, Cascader  } from 'antd';
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

interface Option {
  value: string | number;
  label: string;
}

const App: React.FC = () => {
  const [current, setcurrent] = useState(0)
  const [formInfo, setformInfo] = useState({})
  const [content, setcontent] = useState('')

  // console.log('forum', masterProps.initialState)
  const masterProps = useModel('@@qiankunStateFromMaster');
  // console.log(masterProps)
  const [user, setuser] = useState(masterProps.user)
  // console.log(user)
  

  const handleNext = () => {
    // setuser(masterProps.initialState.userInfo)
    if(current === 0){
      if(imgUrl == ''){
        message.error('请上传图片！')
      }else{
        forumRef.current.validateFields().then((res: any)=>{
          setcurrent( current + 1 )
          setformInfo(res)
        }).catch( (err: any) => {
          console.log(err)
        })
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
    
    let newMonth = formInfo.actvtime.$M*1+1
    let newtime = formInfo.actvtime.$y+'-'+newMonth+'-'+formInfo.actvtime.$D+' '+formInfo.actvtime.$H+':'+formInfo.actvtime.$m+':'+formInfo.actvtime.$s
    console.log(formInfo, formInfo.actvduration[0],newtime)

    axios.post('/api/forumapi/saveActivity ', {
      actvname: formInfo.actvname, 
      actvaddr: formInfo.actvaddr, 
      actvtime: newtime, 
      actvduration: formInfo.actvduration[0], 
      actvtext: content, 
      leaderID: user.id, 
      leadername: user.name, 
      leadertel: user.tel,
      needp: formInfo.needp,
      imgURL: imgUrl
    }).then(res=>{
      console.log(res)

      history.push('/actvdraft')

      notification.info({
        message: '通知',
        description:
          `您可以到'我的活动'查看您发布的活动`,
        placement: 'bottomRight'
      })      
    })
    
  }

  const handlePerivious = () => {
    setcurrent( current - 1 )
  }

  const forumRef = useRef(null)

  const onChange = (value: string[]) => {
    console.log(value);
  };

  const options: Option[] = [
    {
      value: 0.5,
      label: '0.5',
    },
    {
      value: 1,
      label: '1',
    },
    {
      value: 1.5,
      label: '1.5',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 2.5,
      label: '2.5',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 3.5,
      label: '3.5',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 4.5,
      label: '4.5',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 5.5,
      label: '5.5',
    },
    {
      value: 6,
      label: '6',
    },
  ];

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
          <Button type="primary" style={{width: '100px'}}>tips<QuestionOutlined /></Button>
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
            title: '活动详情',
            description: '主题内容',
            subTitle: 'rich text',
          },
          {
            title: '提交审核',
            description: "提交审核",
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
            label="活动名称"
            name="actvname"
            rules={[{ required: true, message: 'Please input your actvname!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{marginTop: '20px'}}
            label="活动地址"
            name="actvaddr"
            rules={[{ required: true, message: 'Please input your actvaddr!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{marginTop: '20px'}}
            label="开始时间"
            name="actvtime"
            rules={[{ required: true, message: 'Please input your actvtime!' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>

          <Form.Item
            style={{marginTop: '20px'}}
            label="总时间"
            name="actvduration"
            rules={[{ required: true, message: 'Please input your actvduration!' }]}
          >
             <Cascader options={options} onChange={onChange} placeholder="Please select" />
          </Form.Item>

          <Form.Item
            style={{marginTop: '20px'}}
            label="所需人数"
            name="needp"
            rules={[{ required: true, message: 'Please input your needed people!' }]}
          >
            <Input />
          </Form.Item>

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

      <div className={current === 2 ? '':style.active}></div>

      <div style={{marginTop: '50px', textAlign: 'right'}}>
        {
          current == 2 && <span>
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