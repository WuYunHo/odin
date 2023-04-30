import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Table, Tag, Modal, Form, Input, message, notification, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { history, useModel } from '@umijs/max';
import { AlignLeftOutlined, CheckOutlined, CloseOutlined, CloudOutlined, DeleteOutlined, EditOutlined, EnterOutlined, ExclamationCircleOutlined, RollbackOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { WOW } from 'wowjs';
import { Line } from '@ant-design/charts'
import '../../../node_modules/wowjs/css/libs/animate.css'

import './index.less'

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
  const [modalcontent, setmodalcontent] = useState('')

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user] = useState(masterProps.user)
  const [data, setData] = useState([]);

  const config = {
    data,
    xField: 'date',
    yField: 'num',
    seriesField: 'type',
    // legend: {
    //   position: 'top',
    // },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 10000,
        // delay: 1000
      },
    },
    height: 300
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item: any) => {
    setIsModalOpen(true);

    setmodalcontent(item)

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

  const date = (date: string) => {
    let result = new Date(date).getTime();
    return result;
  }

  useEffect(() => {
    // setuser(masterProps.initialState.userInfo)
    axios.post('/api/forumapi/findactvPubing', {
      // leaderID: user.id
    }).then(res=>{

      axios.get('/api/forumapi/findAllactvList').then(listres=>{
        console.log(listres)
        for(let item of res.data.data){
          item.ifjoin = 0
        }

        for(let item of res.data.data){
          for(let listitem of listres.data.data){
            if(item.actvid == listitem.actvID && listitem.menberID == user.id){
              item.ifjoin = 1
            }
          }
        }

        let dateArr = []
        for(let item of res.data.data){
          // console.log(date(moment(item.actvtime).format().toString()) , Date.parse(new Date().toString()))
          if(date(moment(item.actvtime).format().toString()) > Date.parse(new Date().toString())){
            dateArr.push(item)
          }
        }

        console.log('79', res.data.data)
        // setdataSource(res.data.data)
        setdataSource(dateArr)
      })
    })

    axios.get('/api/forumapi/actvChart').then(res=>{
      console.log('setData', res.data.data)
      setData(res.data.data)
    })
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: '0',
      mobile: false,
      live: false 
    })
    wow.init();
  },[change])

  const handleRefuse = (item: any) => {
    console.log('handleDelete', item) 

    setdataSource(dataSource.filter(data=>data.actvid!==item.actvid))
    axios.post('/api/forumapi/refuseActivity', {
      actvid: item.actvid
    }).then(res=>{
      setchange(Math.random())
    })
  }
  
  const handlePubing = (item: any) => {
    if(item.ifjoin == 0){
      //判断alreadyp和needp字段
      if(item.needp > item.alreadyp + 1){
        //自增alreadyp，并向actvlist表增加数据
        axios.post('/api/forumapi/volSignUp', {
          actvid: item.actvid
        }).then(res=>{
          axios.post('/api/forumapi/saveActivityList', {
            actvid: item.actvid,
            menberID: user.id,
            menbername: user.name,
            menbertel: user.tel
          }).then(res=>{
            setchange(Math.random())

            notification.info({
              message: '通知',
              description:
                `您可以到'我的'查看您参加的活动`,
              placement: 'bottomRight'
            })    
          })
        })
      }else{
        message.info('人数已满！')
      }
    }else{
      //取消报名
      axios.post('/api/forumapi/volnoSignUp', {
        actvid: item.actvid
      }).then(res=>{
        axios.post('/api/forumapi/cutactvList', {
          actvID: item.actvid,
          menberID: user.id
        }).then(res=>{
          setchange(Math.random())
        })
      })
    }
  }
  

  return (
    <PageContainer
      ghost
      header={{
        title: '活动报名',
      }}
    >
      <div style={{width: '100%', height: '320px', boxShadow: '-10px 5px 5px #cccccc', padding: '10px 10px 0 10px', marginBottom: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <section class="wow fadeIn" data-wow-duration="1s" data-wow-delay="0s" data-wow-offset="10" style={{width: '400px', height: '310px', background: 'white'}}>
            <Line {...config}></Line>
          </section>
          <div class="wow slideInRight"  data-wow-duration="1s" data-wow-delay="0s" data-wow-offset="10" style={{width: 'calc(100% - 400px)', height: '310px', background: 'linear-gradient(to right, white, rgba(136, 25, 69, 0.4))'}} >
            <div class="wow bounceIn"  data-wow-duration="1s" data-wow-delay="1s" style={{width: '50%', height: '40%', background: 'white', margin: '4%', border: '1px solid rgba(136, 25, 69, 0.4)', borderRadius: '10px', padding: '2px'}}>
              <span>志愿活动是一种非常重要的社会活动，通过志愿活动，可以提高自己的社会责任感和公民意识，为社会做出贡献。志愿活动可以有很多种形式，例如社区服务、环境保护、教育支持、文化传承等等。通过志愿活动，可以结识新朋友，学习新技能，拓展自己的人脉和经验。</span>
            </div>
            <div class="wow bounceIn" data-wow-duration="1s" data-wow-delay="1s" style={{width: '70%', height: '40%', background: 'rgba(136, 25, 69, 0.2)', margin: '4% 0 0 20%', border: '1px solid white', borderRadius: '20ox', padding: '2px', color: 'white'}}>
              <span>参与志愿活动需要具备一定的能力和素质。首先，需要具备良好的沟通能力和团队合作能力，能够有效地与他人合作，达成共同的目标。其次，需要具备较强的组织能力和计划能力，能够对志愿活动进行有效的组织和规划。此外，还需要具备一定的专业知识和技能，例如教育、环保、文化传承等方面的知识和技能。</span>
            </div>
          </div>
        </div>
      </div>
      {
        // pubingdata.data ? pubingdata.data.data.map(item=>
        dataSource ? dataSource.map(item=>
          <div className='pubcard' key={item.actvid}>
            <div className='title'>
              {item.actvname}
              <span className='light-num'>
                <div>{item.needp}</div>
                <span className='tri1'></span>
                <span className='tri2'></span>
              </span>
            </div>

            <div className='midcontent' style={{display: 'flex', flexDirection: 'row', margin: '5px 0 5px 5px', flex: '1 auto'}}>
              {item.imgURL != '' && <Image src={item.imgURL} height={120}></Image>}
              
              <div className='context' style={{overflowY: 'auto', marginLeft: '5px'}}>
                <div dangerouslySetInnerHTML={{
                  __html:item.actvtext
                }} onClick={()=>showModal(item)}></div>
              </div>
            </div>
              
            <div className='footer'>
              <div><UserOutlined />{item.leadername}</div>
              <div style={{marginLeft: '15px'}}><CloudOutlined />{moment(item.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <div className='button'>
                <Button size='small' style={{marginRight: '5px'}} onClick={()=>handlePubing(item)}>{item.ifjoin == 1 ? <><RollbackOutlined />已报名</> : <><StarOutlined />报名</>}</Button>
              </div>
            </div>
          </div>
        )  : <div></div>
      }

      <Modal title={modalcontent.actvname} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
        {modalcontent.imgURL != '' && <Image src={modalcontent.imgURL} height={300}></Image>}

        <div dangerouslySetInnerHTML={{
          __html:modalcontent.actvtext
        }}></div>

        <div style={{color: '#881945'}}>{`活动于${moment(modalcontent.actvtime).format('MMMM Do YYYY, h:mm:ss a')}开始,耗时${modalcontent.actvduration}小时,还需招募名${modalcontent.needp - modalcontent.alreadyp}志愿者`}</div>
      </Modal>
    </PageContainer>
    
  );
};

export default AccessPage;
