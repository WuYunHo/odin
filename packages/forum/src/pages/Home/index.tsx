import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal, RadioChangeEvent } from 'antd';
import { Button, Descriptions, Radio } from 'antd';
import { useModel } from '@umijs/max';

import './index.css'
import axios from 'axios';
import moment from 'moment';
import Comments from '@/components/comment';

const App: React.FC = () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

  const [pubingdata, setpubingdata] = useState({})
  const [change, setchange] = useState(0)

  const forminfo = useRef(null)
  const [modalcontext, setmodalcontext] = useState('')

  const [modalID, setmodalID] = useState('')

  const onChange = (e: RadioChangeEvent) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  // Mock
  // const { pubarticledata, loadpubarticles } = useModel('fourmdrafting')
  // console.log(pubarticledata)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item: any) => {
    setIsModalOpen(true);

    setmodalcontext(item.context)
    console.log(item.articleID)
    setmodalID(item.articleID)

    setTimeout(()=>{
      forminfo.current.setFieldsValue(item)
    })
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const handlelight = (item: any) => {
    // 点赞 light+1
    axios.post('/api/forumapi/lightArticle',{
      articleID:  item.articleID
    }).then(res=>{
      console.log(res)
      setchange(Math.random())
    })
  }

  const handlecollect = (item: any) => {
    // 收藏 collect+1
    axios.post('/api/forumapi/collectArticle',{
      articleID:  item.articleID
    }).then(res=>{
      console.log(res)
      setchange(Math.random())
    })
  }

  useEffect(()=>{
    axios.post('/api/forumapi/findPubing',{
      
    }).then(res=>{
      console.log(res)
      setpubingdata(res)
    })
  },[change])

  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      {
        pubingdata.data ? pubingdata.data.data.map(item=>
          <div className='pubcardborder'>
            <div className='pubcard' onClick={()=>showModal(item)}>
              <Descriptions
                bordered
                title={item.articleID}
                size={size}
                extra={
                  <div>
                    <Button type="primary" style={{marginRight: '20px'}} onClick={()=>handlelight(item)}>点赞</Button>
                    <Button type="primary" onClick={()=>handlecollect(item)}>收藏</Button>
                  </div>
                }
                style={{marginTop: '20px'}}
              >
                <Descriptions.Item label="Title">{item.title}</Descriptions.Item>
                <Descriptions.Item label="auth">{item.userID}</Descriptions.Item>
                
                {/* <Descriptions.Item label="read">{item.looks}</Descriptions.Item> */}
                <Descriptions.Item label="点赞">{item.light}</Descriptions.Item>
                <Descriptions.Item label="收藏">{item.collect}</Descriptions.Item>
                <Descriptions.Item label="time" span={2}>{moment(item.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</Descriptions.Item>
                <Descriptions.Item label="Config Info" contentStyle={{height: '200px'}}>
                <div dangerouslySetInnerHTML={{
                  __html:item.context
                }}></div>
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
          
          
        )  : <div></div>
      }
      <Modal title="details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          name="basic"
          // labelCol={{ span: 4 }}
          // wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={forminfo}
        >
          <Form.Item
            label="标题："
            name="title"
          >
            <Input />
          </Form.Item>
          
        </Form>
        <div dangerouslySetInnerHTML={{
          __html:modalcontext
        }} style={{border: 'solid 1px', borderRadius: '10px'}}></div>
        <Comments id={modalID}></Comments>
      </Modal>
      
    </div>
  );
};

export default App;