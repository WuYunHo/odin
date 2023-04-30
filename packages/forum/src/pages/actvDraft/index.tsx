import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Modal, Form, Input, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { history, useModel } from '@umijs/max';
import { AlignLeftOutlined, DeleteOutlined, EditOutlined, EnterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Forumeditor from '@/components/Guide/Forumeditor';
import { queryArticleList } from '@/models/api';
import moment from 'moment';

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

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user] = useState(masterProps.user)

  // const { articledata, loadarticles } = useModel('forum')
  // console.log(articledata.list)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item: any) => {
    setIsModalOpen(true);

    setmodalcontext(item.actvtext)

    // setTimeout(()=>{
    //   forminfo.current.setFieldsValue(item)
    // })
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // setuser(masterProps.initialState.userInfo)
    axios.post('/api/forumapi/findActivity', {
      leaderID: user.id
    }).then(res=>{
      setdataSource(res.data.data)
    })
  },[change])

  //控制删除表项按钮点击后弹出提示
  const confirmMethod = ( item: any )=>{
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        handleDelete(item)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  const handleDelete = (item: any) => {
    console.log('handleDelete', item) 

    //删除数据
    //request删除数据
    setdataSource(dataSource.filter(data=>data.actvid!==item.actvid))
    axios.post('/api/forumapi/deleteActivity', {
      actvid: item.actvid
    }).then(res=>{
      setchange(Math.random())
    })
  }
  
  const handlePub = (item: any) => {
      console.log('handlePub', item)

      //修改数据状态为1
      //state = 0（未提交） 1 （审核中） 2（未通过） 3（已发布）
      //request更新状态
      axios.post('/api/forumapi/pubActivity', {
        actvid: item.actvid
      }).then(res=>{
        setchange(Math.random())
      })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ActivityID',
      dataIndex: 'actvid',
      key: 'actvid',
    },
    {
      title: '活动名称',
      dataIndex: 'actvname',
      key: 'actvid',
    },
    {
      title: '活动时间',
      dataIndex: 'actvtime',
      key: 'actvid',
    },
    {
      title: '活动地点',
      dataIndex: 'actvaddr',
      key: 'actvid',
    },
    {
      title: '义工时',
      dataIndex: 'actvduration',
      key: 'actvid',
    },
    {
      title: '状态',
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
        console.log(item)
        return <div>
          <Button danger shape='circle' icon={<DeleteOutlined />} onClick={()=>confirmMethod(item)}></Button>
          <Button shape='circle' icon={<EnterOutlined />} onClick={()=>handlePub(item)}></Button>
          <Button shape='circle' icon={<AlignLeftOutlined />} onClick={()=>showModal(item)}></Button>
        </div>
      },
    },
  ];
  

  return (
    <PageContainer
      ghost
      header={{
        title: '我的活动',
      }}
    >
      <Table columns={columns} dataSource={dataSource} />

      <Modal title="活动内容" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div dangerouslySetInnerHTML={{
          __html:modalcontext
        }}></div>
      </Modal>
    </PageContainer>
    
  );
};

export default AccessPage;
