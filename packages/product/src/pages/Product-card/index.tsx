import React, { useEffect, useState } from 'react'
import { Input, Avatar, Card, Col, Row, Modal, Button, notification, message, Image, Checkbox, Drawer, Select } from 'antd';
import { AppstoreAddOutlined, CheckOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { AxiosError, history, useModel } from '@umijs/max';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import './index.css'

const { Search } = Input;
const { Meta } = Card;

const App: React.FC = () => {
  const [dataSource, setdataSource] = useState([]) //product数据存储
  const [isVisible, setisVisible] = useState(false)
  const [iscartVisible, setiscartVisible] = useState(false)
  const [productId, setproductId] = useState([])

  const [cart, setcart] = useState([])
  const [change, setchange] = useState(-1)

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)
  // console.log(user)

  const onSearch = (value: string) => {
    console.log(value);
    if (value === '') {
      setreloadprdt(Math.random())
    } else {
      axios.get(`/api/products/findProductByName?name=${value}`).then(res => {
        console.log(res.data.data)
        const findarr = [res.data.data]
        setdataSource(findarr)
      })
    }
  }

  const updateProduct = (region: string) => {
    console.log(region);
    axios.get(`/api/products/findProductByRegion?region=${region}`).then(res => {
        setdataSource(res.data.data)
        axios.post('/api/products/findCart', {
          userID: user.id
        }).then(ctres=>{
          console.log('ctres', ctres.data.data)
  
          for(let item of res.data.data){
            item.ifcart = 0
          }
  
          for(let item of res.data.data){
            for(let cartitem of ctres.data.data){
              if(cartitem.prdtID == item.id){
                // item.cartnum = cartitem.count
                item.ifcart = 1
              }
            }
          }
          setdataSource(res.data.data)
          // setcartmsg(cartarr)
        })
    })
  }

  const updateAllProduct = () => {
    setreloadprdt(Math.random())
  }

  const checkProduct = (item: any) => {
    setproductId(item)
    let a = item
    a.ordernum = 1
    // setcardmsg(item)
    setcardmsg(a)
    console.log('无延迟',item)
    
    setTimeout(()=>{
      console.log('延迟')
      setisVisible(true)
    }, 0)
    
  }
  
  const visiblecancel = () => {
    // item['cartcount'] = 1
    // console.log(item)

    // let cartID = item.id
    // if(!cart.some(item => item.id === cartID)){
    //   setcart(current=>[...current, item])
    // }
    
    // console.log(cart)

    // setisVisible(false)
    if(cardmsg.ifcart == 1){
      setisVisible(false)
      // setiscartVisible(true)
      openCart()
    }else{
      axios.post('/api/products/addCart', {
        prdtID: cardmsg.id,
        userID: user.id,
        count: 1
      }).then(res=>{
        setreloadprdt(Math.random())
        setisVisible(false)
        // axios.get('/api/products/findAllProducts').then(res => {
        //   console.log(res.data.data)
        //   // setdataSource(res.data.data)
    
        //   axios.post('/api/products/findCart', {
        //     userID: user.id
        //   }).then(ctres=>{
    
        //     for(let item of res.data.data){
        //       item.ifcart = 0
        //     }
    
        //     for(let item of res.data.data){
        //       for(let cartitem of ctres.data.data){
        //         if(cartitem.prdtID == item.id){
        //           // item.cartnum = cartitem.count
        //           item.ifcart = 1
        //         }
        //       }
        //     }
        //     console.log(res.data.data)
        //     setdataSource(res.data.data)
        //     // setcartmsg(cartarr)
        //     setisVisible(false)
        //   })
        // })
        
      })
    }

    
  }

  // const [test, settest] = useState([])

  const visibleOk = () => {
    setwaytoOrder(2)
    setisVisible(false)
    setdrawerOpen(true)
    console.log(cardmsg)

    // if(user.addr || user.tel){
      
    // }else{
    //   message.info('请在"我的"页面内完善个人信息！')
    // }
  }

  const [waytoOrder, setwaytoOrder] = useState(0)

  const cartOk = () => {
    setwaytoOrder(1)
    setdrawerOpen(true)
    setiscartVisible(false)
    console.log(cartmsg)
  }

  const addcartcount = (item: any) => {
    let arr = []
    for(let cartitem of cartmsg){
      if(cartitem.id == item.id){
        console.log('add')
        cartitem.cartnum = cartitem.cartnum + 1
        arr.push(cartitem)
      }else{
        arr.push(cartitem)
      }
    }

    axios.post('/api/products/addCart', {
      prdtID: item.id,
      userID: user.id,
      count: 1
    }).then(res=>{
      
      console.log(res)

      setcartmsg(arr)
      console.log(arr)

      setreloadprdt(Math.random())
    })

    

  }

  const decreasecartcount = (item: any) => {
    let arr = []
    for(let cartitem of cartmsg){
      if(cartitem.id == item.id){
        if(item.cartnum > 1){
          console.log('dec')
          cartitem.cartnum = cartitem.cartnum - 1
          arr.push(cartitem)
        }
      }else{
        arr.push(cartitem)
      }
    }
    setcartmsg(arr)

    axios.post('/api/products/cutCart', {
      prdtID: item.id,
      userID: user.id,
      count: 1
    }).then(res=>{
      
      console.log(res)
      setreloadprdt(Math.random())
    })
  }

  const decreasecardcount = () => {
    setcardmsg(item=>({
      ...item,
      ordernum: cardmsg.ordernum - 1
    }))
    console.log(cardmsg)
  }

  const addcardcount = () => { 
    setcardmsg(item=>({
      ...item,
      ordernum: cardmsg.ordernum + 1
    }))
    console.log(cardmsg)
  }

  const [reloadprdt, setreloadprdt] = useState(0)

  useEffect(() => {
    console.log('reload')
    axios.get('/api/products/findAllProducts').then(res => {
      console.log(res.data.data)
      // setdataSource(res.data.data)

      axios.post('/api/products/findCart', {
        userID: user.id
      }).then(ctres=>{
        console.log('ctres', ctres.data.data)

        for(let item of res.data.data){
          item.ifcart = 0
        }

        for(let item of res.data.data){
          for(let cartitem of ctres.data.data){
            if(cartitem.prdtID == item.id){
              // item.cartnum = cartitem.count
              item.ifcart = 1
            }
          }
        }
        console.log(res.data.data)
        setdataSource(res.data.data)
        // setcartmsg(cartarr)
      })
    })
  }, [reloadprdt])

  useEffect(()=>{
    //查询店铺
  })

  const [cardmsg, setcardmsg] = useState({})
  const [cartmsg, setcartmsg] = useState([])

  const [drawerOpen, setdrawerOpen] = useState(false)

  const openCart = () => {
    setiscartVisible(true)
    axios.get('/api/products/findAllProducts').then(res => {
      console.log(res.data.data)
      axios.post('/api/products/findCart', {
        userID: user.id
      }).then(ctres=>{
        console.log(ctres.data.data)
        let cartarr = []
        for(let item of res.data.data){
          for(let cartitem of ctres.data.data){
            if(cartitem.prdtID == item.id){
              item.cartnum = cartitem.count
              item.ifbuy = 0
              cartarr.push(item)
            }
          }
        }
        console.log(cartarr)

        setcartmsg(cartarr)
        cartarr = []
      })
    })
  }

  const chossCart = (item: any) => {
    let arr = []
    for(let cartitem of cartmsg){
      if(cartitem.ifbuy == 0 && cartitem.id == item.id){
        cartitem.ifbuy = 1
        arr.push(cartitem)
      }else if(cartitem.ifbuy == 1 && cartitem.id == item.id){
        cartitem.ifbuy = 0
        arr.push(cartitem)
      }
    }

    setcardmsg(arr)
  }

  const takeOrder = () => {
    if(user.addr || user.tel){
      let context = ''
      let orderprice = 0
      let sellerID

      if(waytoOrder == 1){
        console.log('cartOK', cartmsg)

        for(let item of cartmsg){
          if(item.ifbuy == 1){
            context = context + item.cartnum + '份' + item.name +'('+ item.sellerName + ')' +','
            orderprice = orderprice + item.price * item.cartnum
            sellerID = item.sellerID

            axios.post('/api/products/changeProductCount', {
              id: item.id,
              number: item.cartnum
            }).then(res=>{
              //判断订单商品数量是否满足购买条件
              if(item.catnum < item.count){
                //重新更新商品卡片信息
                axios.get('/api/products/findAllProducts').then(res => {
                  console.log(res.data.data)
                  // setdataSource(res.data.data)
            
                  axios.post('/api/products/findCart', {
                    userID: user.id
                  }).then(ctres=>{
            
                    for(let item of res.data.data){
                      item.ifcart = 0
                    }
            
                    for(let item of res.data.data){
                      for(let cartitem of ctres.data.data){
                        if(cartitem.prdtID == item.id){
                          // item.cartnum = cartitem.count
                          item.ifcart = 1
                        }
                      }
                    }
                    console.log(res.data.data)
                    setdataSource(res.data.data)
                    // setcartmsg(cartarr)
                  })
                })
              }else{
                message.error(`商品${item.name}余量不足！`)
                return
              }
              
            })
          }
        
        }

        console.log('订单信息为:',context,'订单价格为:',orderprice, 'sellerID为:')

        axios.post('/api/products/saveOrder', {
          sellerID: sellerID,
          buyerID: user.id,
          buyertel: user.tel,
          buyeraddr: user.addr,
          context: context,
          price: orderprice
        }).then(res=>{
          console.log(res)

          //res.data.data.id 订单id
          //发起请求更新orderprdt表
          for(let item of cartmsg){
            if(item.ifbuy == 1){
              axios.post('api/products/addOrderPrdt',{
                orderid: res.data.data.id,
                prdtid: item.id,
                count: item.cartnum
              }).then(res=>{
                console.log('更新orderprdt')
              })
            }
          }

          notification.info({
            message: '通知',
            description:
              `您可以到'我的'查看您的订单`,
            placement: 'bottomRight'
          })
        })

        // setiscartVisible(false)
      }else if(waytoOrder == 2){
        let context = ''

        console.log('cartOK', cardmsg)
        context = '一份'+ cardmsg.name +'('+ cardmsg.sellerName + ')'
        console.log('visibleOk',context)

        axios.post('/api/products/saveOrder', {
          sellerID: cardmsg.sellerID,
          buyerID: user.id,
          buyertel: user.tel,
          buyeraddr: user.addr,
          context: context,
          price: cardmsg.price,
        }).then(res=>{
          console.log(res)

          axios.post('api/products/addOrderPrdt',{
            orderid: res.data.data.id,
            prdtid: cardmsg.id,
            count: cardmsg.ordernum
          }).then(res=>{
            console.log('更新orderprdt')
          })

          notification.info({
            message: '通知',
            description:
              `您可以到'我的'查看您的订单`,
            placement: 'bottomRight'
          })
        })
      }
      setdrawerOpen(false)      
    }else{
      message.info('请在"我的"页面内完善个人信息！')
    }
  }

  return (
    <div style={{height: 'calc(90vh - 56px)'}}>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <p></p>

      <p></p>

      <div style={{display: 'flex'}}>
        {
          dataSource.map((item: any) =>
            // <Col span={8}>
              <Card
                style={{ width: '220px', margin: '10px 15px 10px 15px'}}
                cover={
                  <img
                    alt="example"
                    src={item.imgUrl}
                    height='180px'
                  />
                }
                hoverable
                onClick={()=> checkProduct(item)}
                key={item.id}
                bordered
                size='default'
              >
                <Meta
                  title={item.name}
                  description={`￥${item.price}`}
                />
                {/* <hr></hr>
                <div>商家备注：{item.descriptions ? item.descriptions : '无'}</div> */}
              </Card>
          )
        }
        </div>

      <Button onClick={()=>openCart()} style={{position: 'absolute', right: '40px', bottom: '0'}}>购物车</Button>
      {/* <Button onClick={()=>testhis()} style={{position: 'absolute', right: '100px', bottom: '0'}}>history</Button> */}
      
      <Modal
        open={isVisible}
        footer={null}
        // title="商品信息"
        // okText="立即购买"
        // cancelText="加入购物车"
        onCancel={()=>setisVisible(false)}
        // onOk={() => visibleOk(productId)}
      >
        <div style={{width: '80%', margin: '5px auto'}}>
          <Image src={cardmsg.imgUrl}></Image>
        </div>

        <div style={{fontSize: '20px', lineHeight: '20px', margin: '20px 5px 0 5px'}}>{cardmsg.name}</div>
        {/* <div style={{fontSize: '16px', lineHeight: '16px', margin: '5px 10px 0 5px'}}>{cardmsg.descriptions}</div> */}

        <div style={{margin: '20px 5px 0 5px', display: 'flex', flexDirection: 'row'}}>
          <div>{`校园价  ￥`}</div>
          <div style={{fontSize: '25px', lineHeight: '25px', color: '#881945'}}>{cardmsg.price}</div>  
        </div>
        
        <div style={{ margin: '20px 5px 0 5px', display: 'flex', flexDirection: 'row'}}>
          <div>{`${cardmsg.sellerName}  配送至  `}</div>
          <div style={{color: '#881945'}}>{user.addr}</div>
        </div>

        <div style={{margin: '20px 5px 0 5px', width: 'calc(100% - 10px)', height: '100px', borderRadius: '10px', background: 'rgba(0, 0, 0, 0.02)'}}>{cardmsg.descriptions}</div>

        <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginTop: '50px', width: '180px'}}>
          <Button onClick={()=>visiblecancel()} style={{marginRight: '20px'}}>{cardmsg.ifcart ? "已加购物车" : "加入购物车"}</Button>
          <Button type='primary' onClick={()=>visibleOk()}>确定</Button>
        </div>
      </Modal>

      <Modal
        open={iscartVisible}
        // title="商品信息"
        okText="购买"
        cancelText="取消"
        onCancel={() => setiscartVisible(false)}
        onOk={() => cartOk()}
      >
        <div style={{height: '400px'}}>
          {
            cartmsg ? cartmsg.map((item)=>
              <div key={item.id} style={{display: 'flex', flexDirection: 'row', margin:'5px 0'}}>
                <div style={{height: '100px', width: '150px'}}>
                  <div style={{background: `url(${item.imgUrl}) no-repeat`, height: '100px', width: '150px', backgroundSize: 'cover'}}></div>
                </div>
                <div style={{width: 'auto', height: '100px', marginLeft: '10px' }}>
                  <div style={{height: '20px', marginTop: '60px'}}>{item.name}</div>
                  <div style={{color: '#881945', height: '20px'}}>{`价格: ${item.price}`}</div>
                </div>
                <div style={{width: '100px', marginLeft: 'auto', height: '100px', display: 'flex', flexDirection: 'column'}}>
                  <div style={{marginLeft: '68px', height: '20px'}} >
                    <div onClick={()=>chossCart(item)}>{item.ifbuy == 0 ? <AppstoreAddOutlined /> : <CheckOutlined />}</div>
                  </div>
                  <div style={{width: '100px', marginLeft: 'auto', height: '20px', marginTop: '60px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                      <Button size='small' shape='round' onClick={()=>decreasecartcount(item)}>-</Button>
                      <div style={{margin: '0 5px'}}>{item.cartnum}</div>
                      <Button size='small' shape='round' onClick={()=>addcartcount(item)}>+</Button>
                    </div>
                  </div>
                </div>
                
              </div>
            ) : <div></div>
          }
        </div>
        
      </Modal>

      <Drawer title="Basic Drawer" placement="right" onClose={()=>{setdrawerOpen(false)}} open={drawerOpen} size='large'>
        <div className='drawer' style={{border: '1px rgba(0, 0, 0, 0.1) solid', padding: '5px', borderRadius: '10px', width: 'calc(100% - 15px)'}}>
          <div style={{width: 'calc(100% - 10px)', height: 'calc(60vh - 57px)', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '10px', padding: '5px'}}>
          {
            waytoOrder == 1 ? cartmsg.map((item)=>
            <div style={item.ifbuy == 1 ? {} : {display: 'none'}}>
            <div key={item.id} style={{display: 'flex', flexDirection: 'row', margin:'5px 0'}}>
              <div style={{height: '100px', width: '150px'}}>
                <div style={{background: `url(${item.imgUrl}) no-repeat`, height: '100px', width: '150px', backgroundSize: 'cover'}}></div>
              </div>
              <div style={{width: 'auto', height: '100px', marginLeft: '10px' }}>
                <div style={{height: '20px', marginTop: '60px'}}>{item.name}</div>
                <div style={{color: '#881945', height: '20px'}}>{`价格: ${item.price}`}</div>
              </div>
              <div style={{width: '100px', marginLeft: 'auto', height: '100px', display: 'flex', flexDirection: 'column'}}>
                <div style={{marginLeft: '68px', height: '20px'}} >
                  <div onClick={()=>chossCart(item)}>{item.ifbuy == 0 ? <AppstoreAddOutlined /> : <CheckOutlined />}</div>
                </div>
                <div style={{width: '100px', marginLeft: 'auto', height: '20px', marginTop: '60px'}}>
                  <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                    <Button size='small' shape='round' onClick={()=>decreasecartcount(item)}>-</Button>
                    <div style={{margin: '0 5px'}}>{item.cartnum}</div>
                    <Button size='small' shape='round' onClick={()=>addcartcount(item)}>+</Button>
                  </div>
                </div>
              </div> 
            </div>
            </div>
            ) : <div key={cardmsg.id} style={{display: 'flex', flexDirection: 'row', margin:'5px 0'}}>
            <div style={{height: '100px', width: '150px'}}>
              <div style={{background: `url(${cardmsg.imgUrl}) no-repeat`, height: '100px', width: '150px', backgroundSize: 'cover'}}></div>
            </div>
            <div style={{width: 'auto', height: '100px', marginLeft: '10px' }}>
              <div style={{height: '20px', marginTop: '60px'}}>{cardmsg.name}</div>
              <div style={{color: '#881945', height: '20px'}}>{`价格: ${cardmsg.price}`}</div>
            </div>
            <div style={{width: '100px', marginLeft: 'auto', height: '100px', display: 'flex', flexDirection: 'column'}}>
              {/* <div style={{marginLeft: '68px', height: '20px'}} >
                <div onClick={()=>chossCart(item)}>{item.ifbuy == 0 ? <AppstoreAddOutlined /> : <CheckOutlined />}</div>
              </div> */}
              <div style={{width: '100px', marginLeft: 'auto', height: '20px', marginTop: '80px'}}>
                <div style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                  <Button size='small' shape='round' onClick={()=>decreasecardcount()}>-</Button>
                  <div style={{margin: '0 5px'}}>{cardmsg.ordernum}</div>
                  <Button size='small' shape='round' onClick={()=>addcardcount()}>+</Button>
                </div>
              </div>
            </div> 
          </div>
          }
          </div>
          
          <div style={{height: '20vh', width: '100%'}}>
            <div style={{marginTop: '10px'}}>选择支付方式：
              <Select
                defaultValue="微信支付"
                style={{ width: 120 }}
                onChange={()=>{console.log('choosePayingWay')}}
                options={[
                  { value: '0', label: '微信支付' },
                  { value: '1', label: '支付宝支付' },
                  { value: '2', label: '银联支付' },
                  { value: '3', label: '校园支付', disabled: true },
                ]}
              />
            </div>
            <div style={{marginTop: '10px'}}>配送至：{user.addr}</div>
          </div>
          <div style={{marginLeft: 'auto', width: '70px', height: '10vh'}}>
            <Button style={{marginTop: '50px'}} type='primary' onClick={()=>{takeOrder()}}>支付</Button>
          </div>
        </div>
        

      </Drawer>
        
    </div> 
  );
}

export default App;