import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Modal, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { history, useModel } from '@umijs/max';
import { DeleteOutlined, EditOutlined, EnterOutlined } from '@ant-design/icons';
import Forumeditor from '@/components/Guide/Forumeditor';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}






const AccessPage: React.FC = () => {
  const masterProps = useModel('@@qiankunStateFromMaster');
  const [dataSource, setdataSource] = useState([])
  const [content, setcontent] = useState('')
  const [user, setuser] = useState({})

  const forumRef = useRef(null)

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setuser(masterProps.initialState.userInfo)
    axios.post('/api//forumapi/findDraft', {
      userID: user.id
    }).then(res=>{
      console.log(res)
      setdataSource(res.data.data)
    })
  }, [])

  const handleDelete = (item: any) => {
    
  }
  
  const handleUpdate = (item: any) => {
    
  }
  
  const handlePub = (item: any) => {
      
  }
  
  const showModal = (item: any) => {
    setIsModalOpen(true);

    forumRef.current.setFieldsValue({item})
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ArticleID',
      dataIndex: 'articleID',
      key: 'articleID',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Pubtime',
      dataIndex: 'pubtime',
      key: 'pubtime',
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      render: ( state ) => {
        if( state === 0){
          return <Tag color='orange'>未提交</Tag>
        }else if( state === 1 ){
          return <Tag color='red'>未通过</Tag>
        }
        
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: ( item ) => {
        console.log(item)
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>handleDelete(item)}></Button>
          {/* <Button type='primary' shape='circle' icon={<EditOutlined />}onClick={()=>showModal(item)}></Button> */}
          <Button shape='circle' icon={<EnterOutlined />} onClick={()=>handlePub(item)}></Button>
        </div>
      },
    },
  ];
  

  return (
    <PageContainer
      ghost
      header={{
        title: '草稿箱',
      }}
    >
      <Table columns={columns} dataSource={dataSource} />
      {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} forceRender>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={forumRef}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容"
            name="context"
            rules={[{ required: true, message: 'Please input your context!' }]}
          >
            <Forumeditor getContext={(value: any)=>{
              console.log(value)
              setcontent(value)
            }}></Forumeditor>
          </Form.Item>
        </Form>
      </Modal> */}
    </PageContainer>
  );
};

export default AccessPage;
