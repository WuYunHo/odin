import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal, RadioChangeEvent, Image } from 'antd';
import { Button, Descriptions, Radio } from 'antd';
import { useModel } from '@umijs/max';

import './index.less'
import axios from 'axios';
import moment from 'moment';
import Comments from '@/components/comment';
import { CloudOutlined, FileAddOutlined, LikeOutlined, RollbackOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useSafeState } from 'ahooks';
import Item from 'antd/es/list/Item';

const { Search } = Input;

const App: React.FC = () => {
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');

  const [pubingdata, setpubingdata] = useState([])
  const [change, setchange] = useState(0)

  const forminfo = useRef(null)
  const [modalcontext, setmodalcontext] = useState('')

  const [modalID, setmodalID] = useState('')
  const [modalURL, setmodalURL] = useState('')

  const onChange = (e: RadioChangeEvent) => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  // Mock
  // const { pubarticledata, loadpubarticles } = useModel('fourmdrafting')
  // console.log(pubarticledata)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalTitle, setmodalTitle] = useState('')

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)

  const showModal = (item: any) => {
    setIsModalOpen(true);
    setmodalTitle(item.title)

    setmodalcontext(item.context)
    console.log(item.articleID)
    setmodalID(item.articleID)
    setmodalURL(item.imgURL)

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


  const handlelight = (item: any) => {
    if(item.iflight){
      axios.post('/api/forumapi/nolightArticle',{
        articleID:  item.articleID
      }).then(res=>{

        axios.post('/api/forumapi/cutLight', {
          userID: user.id,
          articleID: item.articleID
        }).then(s_res=>{
          console.log(s_res)
          setchange(Math.random())
        })
      })
    }else{
      // 点赞 light+1
      axios.post('/api/forumapi/lightArticle',{
        articleID:  item.articleID
      }).then(res=>{

        axios.post('/api/forumapi/addLight', {
          userID: user.id,
          articleID: item.articleID
        }).then(s_res=>{
          console.log(s_res)
          setchange(Math.random())
        })
      })
    }
  }

  const handlecollect = (item: any) => {
    if(item.ifcollect){
      axios.post('/api/forumapi/nocollectArticle',{
        articleID:  item.articleID
      }).then(res=>{

        axios.post('/api/forumapi/cutCollect', {
          userID: user.id,
          articleID: item.articleID
        }).then(s_res=>{
          console.log(s_res)
          setchange(Math.random())
        })
      })
    }else{
      // 收藏 collect+1
      axios.post('/api/forumapi/collectArticle',{
        articleID:  item.articleID
      }).then(res=>{

        axios.post('/api/forumapi/addCollect', {
          userID: user.id,
          articleID: item.articleID
        }).then(s_res=>{
          console.log(s_res)
          setchange(Math.random())
        })
      })
    }
  }

  const showCollect = () => {
    axios.get('/api/forumapi/findCollect').then(res=>{
      console.log(res)
      let arr = []
      let colarr = []
      for(let item of res.data.data){
        if(item.userID == user.id){
          arr.push(item)
        }
      }

      for(let allitem of pubingdata){
        console.log(allitem)
        for(let colitem of arr){
          console.log(colitem)
          if(allitem.articleID == colitem.articleID){
            colarr.push(allitem)
          }
        }
      }

      setpubingdata(colarr)

    })
  }

  const showAllCollect = () => {
    setchange(Math.random())
  }

  const onSearch = (value: string) => {
    console.log(value);
    if (value === '') {
      setchange(Math.random())
    } else {
      let findarr = []
      for(let item of pubingdata){
        if(item.title.indexOf(value) >= 0){
          findarr.push(item)
        }
      }
      // console.log(findarr)
      setpubingdata(findarr)
    }
  }

  useEffect(()=>{
    axios.post('/api/forumapi/findPubing',{
      
    }).then(res=>{
      console.log(res)
      axios.get('/api/forumapi/findCollect').then(colres=>{
        console.log('148', colres)
        for(let item of res.data.data){
          item.ifcollect = 0
          item.iflight = 0
        }

        for(let item of res.data.data){
          for(let colitem of colres.data.data){
            if(item.articleID == colitem.articleID && colitem.userID == user.id){
              item.ifcollect = 1
            }
          }
        }

        axios.get('/api/forumapi/findLight').then(litres=>{
          for(let item of res.data.data){
            for(let lititem of litres.data.data){
              if(item.articleID == lititem.articleID && lititem.userID == user.id){
                item.iflight = 1
              }
            }
          }

          console.log('172',res.data.data)
          setpubingdata(res.data.data)
        })
      })
    })
  },[change])

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{marginBottom: '10px'}}
      />

      <Button onClick={()=>showAllCollect()} type='text'>全部</Button>
      <Button onClick={()=>showCollect()} type='text'>我的收藏</Button>
      <div className='content' style={{marginTop: '18px', height: '75vh', overflowY: 'scroll'}}>
        {
          // pubingdata.data ? pubingdata.data.data.map(item=>
          pubingdata ? pubingdata.map(item=>
            <div className='pubcard' key={item.articleID}>
              <div className='title'>
                {item.title}
                <span className='light-num'>
                  <div>{item.light}</div>
                  <span className='tri1'></span>
                  <span className='tri2'></span>
                </span>
                </div>

                {/* <div dangerouslySetInnerHTML={{
                  __html:item.context
                }} onClick={()=>showModal(item)} className='context'></div> */}

              <div className='midcontent' style={{display: 'flex', flexDirection: 'row', margin: '5px 0 5px 5px', flex: '1 auto'}}>
                {item.imgURL != '' && <Image src={item.imgURL} height={120}></Image>}
                
                <div className='context' style={{overflowY: 'auto', marginLeft: '5px'}} onClick={()=>showModal(item)}>
                  <div dangerouslySetInnerHTML={{
                    __html:item.context
                  }}></div>
                </div>
              </div>

              <div className='footer'>
                <div><UserOutlined />{item.username  ? item.username : item.userID}</div>
                <div style={{marginLeft: '15px'}}><CloudOutlined />{moment(item.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <div className='button'>
                  <Button size='small' style={{marginRight: '5px'}} onClick={()=>handlelight(item)}>{item.iflight == 1 ? <><RollbackOutlined />取消</> : <><LikeOutlined />点赞</>}</Button>
                  <Button size='small' style={{marginRight: '5px'}} onClick={()=>handlecollect(item)}>{item.ifcollect == 1 ? <><RollbackOutlined />取消</> : <><StarOutlined />收藏</>}</Button>
                </div>
              </div>
            </div>
          )  : <div></div>
        }
      </div>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} title={modalTitle} width={800}>
        {modalURL != '' && <Image src={modalURL} height={150}></Image>}
        <div dangerouslySetInnerHTML={{
          __html:modalcontext
        }} style={{padding: '20px 0 20px 0'}}></div>
        <hr></hr>
        <Comments id={modalID}></Comments>
      </Modal>
      
    </div>
  );
};

export default App;