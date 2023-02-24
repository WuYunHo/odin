import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Modal, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { history, useModel } from '@umijs/max';
import { CheckOutlined, CheckSquareOutlined, CloseCircleOutlined, CloseOutlined, DeleteOutlined, EditOutlined, EnterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Forumeditor from '@/components/Guide/Forumeditor';
import { queryArticleList } from '@/models/api';

import moment from 'moment'

const {confirm} = Modal

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const AccessPage: React.FC = () => {
  const [dataSource, setdataSource] = useState([])
  const [content, setcontent] = useState('')

  const [change, setchange] = useState(0)

  const forminfo = useRef(null)
  const [modalcontext, setmodalcontext] = useState('')

  // const { articledata, loadarticles } = useModel('forum')
  // console.log(articledata.list)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item: any) => {
    setIsModalOpen(true);

    setmodalcontext(item.context)

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

  useEffect(() => {
    // setuser(masterProps.initialState.userInfo)
    axios.post('/api/forumapi/findDrafting', {
      userID: 0
    }).then(res=>{
      console.log(res)
      console.log('change:', change)
      setdataSource(res.data.data)
    })
  },[change]
  )
    // setdataSource(articledata.list)
  // }, [articledata.list])

  //控制删除表项按钮点击后弹出提示
  const confirmMethod = ( item: any )=>{
    confirm({
      title: 'Do you Want to refuse these items?',
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        handleRefuse(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const handleRefuse = (item: any) => {
    console.log('handleDelete', item) 

    //修改数据状态为2
    //state = 0（未提交） 1 （审核中） 2（未通过） 3（已发布）
    //request更新状态
    setdataSource(dataSource.filter(data=>data.articleID!==item.articleID))
    axios.post('/api/forumapi/refuseArticle', {
      articleID: item.articleID
    }).then(res=>{
      setchange(Math.random())
    })
  }
  
  const handlePubing = (item: any) => {
      console.log('handlePub', item)

      //修改数据状态为1
      //state = 0（未提交） 1 （审核中） 2（未通过） 3（已发布）
      //request更新状态
      setdataSource(dataSource.filter(data=>data.articleID!==item.articleID))
      axios.post('/api/forumapi/pubingArticle', {
        articleID: item.articleID
      }).then(res=>{
        setchange(Math.random())
      })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ArticleID',
      dataIndex: 'articleID',
      key: 'articleID',
      render: (text, item) => {
        console.log(item)
        return (
          <div>
            <a onClick={()=>showModal(item)}>{text}</a>
          </div>
        )
      }
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
      render: (pubtime)=>{
        return  moment(pubtime).format('MMMM Do YYYY, h:mm:ss a')     
      }
    },
    {
      title: 'State',
      key: 'state',
      dataIndex: 'state',
      render: ( state ) => {
        if( state === 0){
          return <Tag color='grey'>未提交</Tag>
        }else if( state === 1 ){
          return <Tag color='orange'>审核中</Tag>
        }else if( state === 2 ){
          return <Tag color='red'>未通过</Tag>
        }else{
          return <Tag color='green'>已发布</Tag>
        }
        
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: ( item ) => {
        console.log(moment(item.pubtime).format('MMMM Do YYYY, h:mm:ss a'))
        return <div>
          <Button danger shape='circle' icon={<CloseOutlined />} onClick={()=>confirmMethod(item)}></Button>
          {/* <Button type='primary' shape='circle' icon={<EditOutlined />}onClick={()=>showModal(item)}></Button> */}
          <Button shape='circle' icon={<CheckOutlined />} onClick={()=>handlePubing(item)}></Button>
        </div>
      },
    },
  ];
  

  return (
    <PageContainer
      ghost
      header={{
        title: '审核列表',
      }}
    >
      <Table columns={columns} dataSource={dataSource} />
      <Modal title="details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          ref={forminfo}
        >
          <Form.Item
            label="Title"
            name="title"
          >
            <Input />
          </Form.Item>
          
        </Form>
        <div dangerouslySetInnerHTML={{
          __html:modalcontext
        }} style={{border: 'solid 1px', borderRadius: '10px'}}></div>
      </Modal>
    </PageContainer>
  );
};

export default AccessPage;
