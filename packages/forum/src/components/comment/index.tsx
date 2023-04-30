import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useModel } from '@umijs/max';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';

import './index.less'

const { TextArea } = Input;

export default function Comments(props: any) {
  const [comments, setcomments] = useState([])

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)

  const [change, setchange] = useState(0)
  
  const [commentsdata, setcommentsdata] = useState([])

  const [comLv, setcomLv] = useState(1) //判断评论/回复
  const [tarId, settarId] = useState(-1) //回复目标id
  const [tarUser, settarUser] = useState('')

  const fcomref = useRef(null)
  const scomref = useRef(null)

  useEffect(()=>{
    // axios.post('/api/forumapi/findFirstComment', {
    //   articleID: props.id
    // }).then(res=>{
    //   console.log(res)
    //   setcomments(res.data.data)
    // })

    axios.get('/api/forumapi/findComments').then(res=>{
      // console.log(res)
      // settablecomment(res.data.data)
      let datasource = res.data.data

      const arr: any[] = []
      let f_index = 0
      for(let i = 0; i < datasource.length; i++){
        
        let secondArr:any[] = []
        
        if(datasource[i].articleID !== -1){
          arr.push(datasource[i])

          // let secondArr = []
          let index = 0
          for(let j = 0; j < datasource.length; j++){
            if(datasource[j].articleID === -1 && datasource[j].tarcomID === datasource[i].comID){
              
              secondArr.push(datasource[j])		

              if(secondArr.length > 0){
                let thirdArr = []

                let findedId = datasource[j].comID
                for(let k = 0; k < datasource.length; k++){

                  if(datasource[k].articleID === -1 && datasource[k].tarcomID === findedId){
    
                    thirdArr.push(datasource[k])
                    secondArr[index].third = thirdArr

                    findedId = datasource[k].comID
                  }
                }
              }

              index = index + 1
            }
          }
          if(arr.length > 0) {
            // console.log(arr.length, arr[f_index])
            arr[f_index].second = secondArr
            f_index = f_index + 1
          }
        }
      }
   
      console.log(arr)
      setcommentsdata(arr)
    })
  },[change])

  const sendfcom = (values: any) => {
    console.log(values.context);

    fcomref.current.validateFields().then((e:any)=>{
      axios.post('/api/forumapi/addFirstComment', {
        articleID: props.id,
        context: values.context,
        userID: user.id,
        userName: user.name
      }).then(res=>{
        fcomref.current.resetFields()
        setchange(Math.random())
      })
    }) 
  }

  const sendscom = (values: any) => {
    console.log(values.context, tarId);

    scomref.current.validateFields().then((e:any)=>{
      axios.post('/api/forumapi/addSecondComment', {
        tarcomID: tarId,
        context: values.context,
        userID: user.id,
        userName: user.name
      }).then(res=>{
        scomref.current.resetFields()
        setchange(Math.random())
      })
    }) 
  }

  const deletecom = (comID: number) => {
    console.log(comID)

    axios.post('/api/forumapi/deleteComment', {
      comID: comID
    }).then(res=>{
      setchange(Math.random())
    })
  }

  return (
    <div>
      <div></div>
      {
				commentsdata.map(item=>
					//判断所需要的一级评论
					item.articleID === props.id && <div key={item.comID} style={{marginTop: '5px'}}>
            <div className='comment-top'>
              <div style={{color: 'grey'}}><UserOutlined />{item.userName} {'\u00A0'} {moment(item.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div>
              <Button type='text' size='small' onClick={()=>{setcomLv(2), settarId(item.comID), settarUser(item.userName)}}>回复</Button>
              {item.userID === user.id && <Button type='text' size='small' onClick={()=>deletecom(item.comID)} style={{color: '#881945'}}>删除</Button>}
            </div>
						
            <div style={{marginLeft: '15px', marginTop: '5px'}}>{item.context}</div>
						{
							item.second.map(seconditem=>
								<div key={seconditem.comID} style={{marginLeft: '10px', borderLeft: '2px solid rgba(0,0,0,0.2)', paddingLeft: '5px',marginTop: '5px'}}>
                  <div className='comment-top'>
                    <div style={{color: 'grey'}}><UserOutlined />{seconditem.userName} {'\u00A0'} {moment(seconditem.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <Button type='text' size='small' onClick={()=>{setcomLv(2), settarId(seconditem.comID), settarUser(seconditem.userName)}}>回复</Button>
                    {seconditem.userID === user.id && <Button type='text' size='small' onClick={()=>deletecom(seconditem.comID)} style={{color: '#881945'}}>删除</Button>}
                  </div>

                  <div style={{marginLeft: '15px', marginTop: '5px'}}>{seconditem.context}</div>
									{
										seconditem.third && seconditem.third.map((thirditem: any, index: number)=>
											<div key={thirditem.comID} style={{marginLeft: '10px', marginTop: '5px'}}>
                        <div className='comment-top'>
                          <div style={{color: 'grey'}}><UserOutlined />{thirditem.userName} 回复 <UserOutlined />{index == 0 ? seconditem.userName :seconditem.third[index-1].userName} {'\u00A0'} {moment(thirditem.pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div>
                          <Button type='text' size='small' onClick={()=>{setcomLv(2), settarId(thirditem.comID), settarUser(thirditem.userName)}}>回复</Button>
                          {thirditem.userID === user.id && <Button type='text' size='small' onClick={()=>deletecom(thirditem.comID)} style={{color: '#881945'}}>删除</Button>}
                        </div>
												
                        <div style={{marginLeft: '15px', marginTop: '5px'}}>{thirditem.context}</div>
											</div>
										)
									}
								</div>
							)
						}
					</div>
				)
			}


      {/* {
        comments.map(item=>
            <div style={{marginTop: '5px'}}>userID_{item.userID}说:{item.context};</div>
          )
      } */}
      {/* <hr style={{marginTop: '20px'}}></hr> */}
      
      { comLv === 1 && <Form onFinish={sendfcom} style={{marginTop: '10px'}} ref={fcomref}>
        <div className='sendtips'>在此发表评论 注意规范用语</div>
        <Form.Item label="" name='context'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{float: 'right'}} >
            send
          </Button>
        </Form.Item>
      </Form>}

      { comLv === 2 && <Form onFinish={sendscom} style={{marginTop: '10px'}} ref={scomref}>
        <div className='sendtips'>在此发表回复 回复{tarUser}:</div>
        <Form.Item label="" name='context'>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>  
          <Button type="primary" htmlType="submit" style={{float: 'right'}}>
            send
          </Button>
          <Button style={{float: 'right', marginRight: '10px'}} onClick={()=>{setcomLv(1)}}>
            back
          </Button>
        </Form.Item>
      </Form>}
    </div>

  )
}
