import React, { useEffect, useState } from 'react';
import { Button, Descriptions, message, Modal, notification, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import moment from 'moment';
import { CheckOutlined, ExclamationCircleOutlined, OrderedListOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';

interface DataType {
  key: number;
}

const { confirm } = Modal;

export default function Order() {
  const [dataSource, setdataSource] = useState([])
  const [ischeckOpen, setischeckOpen] = useState(false) //表单创建弹出
  const [checkoutinfo, setcheckoutinfo] = useState({})
  const [change, setchange] = useState(-1)

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)

  const takeOrder = (item: any) => {
    console.log(item)

    console.log(user.name, user.tel)

    if(user.tel || user.addr){
      axios.post('/api/products/takeOrder', {
        id: item.id,
        volID: user.id,
        volname: user.name,
        voltel: user.tel
      }).then(res=>{
        notification.info({
          message: '通知',
          description:
            `您可以到'我的'查看您的订单`,
          placement: 'bottomRight'
        })
        setchange(Math.random())
      })
    }else{
      message.info('请在"我的"页面内完善个人信息！') 
    }

    
  }

  const [orderDetail, setorderDetail] = useState([])

  const checkOrder = (item: any) => {
    setcheckoutinfo(item)
    axios.post('/api/products/findOrderPrdt', {
      orderid: item.id
    }).then(res=>{
      console.log('商品明细:', res.data.data)
      setorderDetail(res.data.data)
    })
    setTimeout(()=>{
      setischeckOpen(true)
    }) 
  }

  const confirmMethod = (item: any) => {
    confirm({
      title: 'sure to take order?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk(){
        takeOrder(item)
      },
      onCancel(){
        
      }
    })
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'id',
      render: ( state ) => {
        if( state === 0){
          return <Tag color='grey'>未接单</Tag>
        }
      },
    },
    {
      title: '地址信息',
      dataIndex: 'buyeraddr',
      key: 'id',
    },
    {
      title: '下单时间',
      dataIndex: 'time',
      key: 'id',
      render: (pubtime) => {
        return  <div>{moment(pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div> 
      }
    },
    {
      title: 'Action',
      key: 'id',
      render: ( item ) => {
        return <div>
          <Button shape='circle' icon={<CheckOutlined />} onClick={()=>confirmMethod(item)}></Button>
          <Button shape='circle' icon={<OrderedListOutlined />} onClick={()=>checkOrder(item)}></Button>
        </div>
      },
    },
  ];

  useEffect(()=>{
    axios.get('/api/products/findOrder').then(res=>{
      console.log(res.data.data)
      setdataSource(res.data.data)
    })
  }, [change])

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        open={ischeckOpen}
        title="订单信息"
        onCancel={() => {
          setischeckOpen(false)
        }}
        footer= {null}
      >
        <Descriptions layout="vertical" bordered size='small'>
          <Descriptions.Item label="用户id">{checkoutinfo.buyerID}</Descriptions.Item>
          <Descriptions.Item label="用户电话">{checkoutinfo.buyertel}</Descriptions.Item>
          <Descriptions.Item label="用户地址">{checkoutinfo.buyeraddr}</Descriptions.Item>
          <Descriptions.Item label="商品信息" span={3}>
            {/* {checkoutinfo.context} */}
            {`订单详情： ${checkoutinfo.context}    订单总额： ${checkoutinfo.price}`}
            <div style={{borderRadius: '8px', background: 'rgba(0, 0, 0, 0.02)', width: '100%', padding: '2px'}}>
              {
              orderDetail ? orderDetail.map((item)=>
                <div key={item.id} style={{display: 'flex', flexDirection: 'row', margin:'5px 0'}}>
                  <div style={{height: '100px', width: '150px'}}>
                    <div style={{background: `url(${item.imgUrl}) no-repeat`, height: '100px', width: '150px', backgroundSize: 'cover'}}></div>
                  </div>
                  <div style={{width: 'auto', height: '100px', marginLeft: '10px' }}>
                    <div style={{height: '20px', marginTop: '60px'}}>{item.name}</div>
                    <div style={{color: '#881945', height: '20px'}}>{`价格: ${item.price}`}</div>
                  </div>
                  <div style={{width: '100px', marginLeft: 'auto', height: '100px', display: 'flex', flexDirection: 'column'}}>
                    {/* <div style={{marginLeft: '68px', height: '20px'}} >
                      <div onClick={()=>chossCart(item)}>{item.ifbuy == 0 ? <AppstoreAddOutlined /> : <CheckOutlined />}</div>
                    </div> */}
                    <div style={{width: '100px', marginLeft: 'auto', height: '20px', marginTop: '80px'}}>
                      <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                        {/* <Button size='small' shape='round' onClick={()=>decreasecartcount(item)}>-</Button> */}
                        <div style={{margin: '0 5px'}}>{item.cartnum}</div>
                        {/* <Button size='small' shape='round' onClick={()=>addcartcount(item)}>+</Button> */}
                      </div>
                    </div>
                  </div>
                  
                </div>
              ) : <div></div>
            }
            </div>
          </Descriptions.Item>
          {/* <Descriptions.Item label="订单总价">{checkoutinfo.price}</Descriptions.Item> */}
        </Descriptions>
      </Modal>
    </div>
  )
}
