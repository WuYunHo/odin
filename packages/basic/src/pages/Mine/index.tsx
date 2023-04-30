import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Tag,
  Space,
  Table,
  message,
  Modal,
  Descriptions,
  Drawer,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import './index.css'
import moment from 'moment';
import { AlignLeftOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EnterOutlined, OrderedListOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import axios from 'axios';
import { WOW } from 'wowjs'
import '../../../node_modules/wowjs/css/libs/animate.css'

import './index.less'

type SizeType = Parameters<typeof Form>[0]['size'];

const App: React.FC = () => {
  const { user, update } = useModel('user')
  console.log(user)
  
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [dataSource, setdataSource] = useState([])

  const [actvdataSource, setactvdataSource] = useState([])
  const [actvlistdataSource, setactvlistdataSource] = useState([])

  const [ischeckOpen, setischeckOpen] = useState(false) //表单创建弹出
  const [checkoutinfo, setcheckoutinfo] = useState({})

  const [isactvOpen, setisactvOpen] = useState(false)

  const [userMsg, setuserMsg] = useState({})

  const [choose0, setchoose0] = useState(true)
  const [choose1, setchoose1] = useState(false)
  const [choose2, setchoose2] = useState(false)

  const changeRef = useRef()

  useEffect(()=>{
    if(user?.type === 0 || user?.type === 3){
      //学生
      axios.get(`/api/products/finduserOrder?buyerID=${user.id}`).then(res=>{
        console.log('学生订单：',res.data.data)
        setdataSource(res.data.data)
      })
    }else if(user?.type === 1){
      //志愿者
      axios.get(`/api/products/findvolOrder?volID=${user.id}`).then(res=>{
        console.log('志愿者订单',res.data.data)
        setdataSource(res.data.data)
      })
    }else if(user?.type === 2){
      //商家
      axios.get(`/api/products/findsellerOrder?sellerID=${user.id}`).then(res=>{
        console.log('商家订单',res.data.data)
        setdataSource(res.data.data)
      })
    }

    axios.post('/api/login/getUserMsg',{
      id: user?.id
    }).then(res=>{
      // console.log('取用户信息',res)
      setuserMsg(res.data.data)
    })
  }, [user])

  useEffect(()=>{
    if(user?.type === 0 || user?.type === 3)[
      axios.post(`/api/forumapi/findUseractv`, {
        leaderID: user.id
      }).then(res=> {
        setactvdataSource(res.data.data)
      })
    ]
  }, [user])

  useEffect(()=>{
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: false 
    })
    wow.init();
  })

  const [orderDetail, setorderDetail] = useState([])
  const checkOrder = (item: any) => {
    console.log(item)
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

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const finishOrder = (item: any) => {
    axios.post('/api/products/finishOrder', {
      id: item.id
    }).then(res=>{
      //刷新订单数据
      axios.get(`/api/products/finduserOrder?buyerID=${user?.id}`).then(res=>{
        console.log('学生订单：',res.data.data)
        setdataSource(res.data.data)
      })

      axios.post(`/api/login/freshvoltime`, {
        volID: item.volID
      }).then(res=>{
        console.log('志愿者义工时更新：',res.data)
      })

      //商家余额更新
      console.log(item)
      axios.post('/api/products/findOrderPrdt', {
        orderid: item.id
      }).then(res=>{
        console.log('商品明细:', res.data.data)
        //根据每件商品找到商家，为商家增加金额cash
        for(let item of res.data.data){
          //根据商品中的item.sellerID找到商家，cash增加item.price
          axios.post('/api/login/addcash',{
            id: item.sellerID,
            price: item.price
          }).then(res=>{
            console.log('商家收款', res)
          })
        }
      })
    })
  }

  const dormitorys = ['聚翰斋', '紫薇斋', '红豆斋', '风槐斋', '蓬莱客舍', '银桦斋', '凌霄斋', '米兰斋', '山茶斋', '红榴斋', '海桐斋', '桃李斋', '雨鹃斋', '春笛', '夏筝', '秋瑟', '冬筑', '四海楼', '紫藤轩', '云杉轩', '芸香阁', '乔木阁', '乔梧阁', '乔相阁', '乔森阁', '乔林阁', '疏影阁', '海棠阁', '文杏阁', '丁香阁', '紫檀阁', '石楠轩', '苏铁轩', '丹枫轩', '木犀轩', '辛夷阁', '韵竹阁', '杜衡阁']
  const college = ['教育学部', '艺术学部', '医学部', '马克思主义学院', '经济学院', '法学院', '心理学院','体育学院', '人文学院', '外国语学院', '传播学院', '数学与统计学院', '物理与光电工程学院', '化学与环境工程学院','生命鱼海洋科学学院', '机电与控制工程学院', '材料学院', '电子与信息工程学院', '计算机与软件学院', '建筑与城市规划学院', '土木与交通工程学院','管理学院', '政府管理学院', '高等研究院', '金融科技学院', '国际交流学院', '继续教育学院', '深圳大学东京学院']



  const onFinish = (values: any) => {
    const month = Number(values.Date.$M)+1
    const infdate = values.Date.$y+'-'+ month +'-'+values.Date.$D
    const addr = values.Dormitory + values.Housenumber
    const tel = values.tel
    const major = values.major
    console.log(infdate, addr, tel, major)
    if(user){
      //发送请求更新信息
      
      // values.Date = infdate
      
      update(user.id, tel, addr, infdate, major)
      axios.post('/api/login/getUserMsg',{
        id: user?.id
      }).then(res=>{
        console.log('取用户信息',res)
        setuserMsg(res.data.data)
      })
      
      changeRef.current.resetFields();
    }else{
      message.info('请登录');
    }

    
  };

  const dateFormat = 'YYYY-MM-DD';
  const [leaderid, setleaderid] = useState(-1)

  const showModal = (item: any) => {
    setleaderid(item.leaderID)
    
    axios.post(`/api/forumapi/findUseractvlist`, {
      actvID: item.actvid
    }).then(res=>{
      setactvlistdataSource(res.data.data)
    })

    setTimeout(()=>{
      console.log(leaderid)
      setisactvOpen(true)
    })
  }

  const cancleOrder = (item: any) => {
    //取消订单
    axios.post('/api/products/removeOrder', {
      id: item.id
    }).then(res=>{
      console.log('删除订单', res)
    })

    //将对应商品数目返还
    axios.post('/api/products/findOrderPrdt',{
      orderid: item.id
    }).then(res=>{
      for(let item of res.data.data){
        axios.post('/api/products/findCartByid', {
          prdtID: item.id
        }).then(s_res=>{
          axios.post('/api/products/backProductCount', {
            id: item.id,
            number: s_res.data.data.count
          }).then(t_res=>{
            console.log('商品数目返还', t_res)
          })
        })
      }
    })
    
    //删除订单商品表
    axios.post('/pai/products/cutOrderPrdt', {
      orderid: item.id
    }).then(res=>{
      console.log('删除订单商品表', res)
    })
  }

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
        }else if( state === 1){
          return <Tag color='orange'>已接单</Tag>
        }else if( state === 2){
          return <Tag color='green'>已完成</Tag>
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
          {
            user?.type === 0 && <Button shape='circle' icon={<CheckOutlined onClick={()=>finishOrder(item)} key={item.id}/>}></Button>
          }
          {
            user?.type === 0 && item.state == 0 && <Button shape='circle' icon={<CheckOutlined onClick={()=>cancleOrder(item)} key={item.id}/>}></Button>
          }
          <Button shape='circle' icon={<OrderedListOutlined />} onClick={()=>checkOrder(item)}></Button>
          {/* <Button shape='circle' icon={<OrderedListOutlined />} ></Button> */}
        </div>
      },
    },
  ];

  const date = (date: string) => {
    let result = new Date(date).getTime();
    return result;
  }

  const actvcolumns: ColumnsType<DataType> = [
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
      // dataIndex: 'actvduration',
      key: 'actvid',
      render: (item) => {
        console.log(date(moment(item.actvtime).format().toString())*1 , Date.parse(new Date().toString()))
        if(date(moment(item.actvtime).format().toString()) > Date.parse(new Date().toString()) && date(moment(item.actvtime).format().toString()) < Date.parse(new Date().toString()) + item.actvduration*1000*60*60){
          return <Tag color='orange'>进行中</Tag>
        }else if(date(moment(item.actvtime).format().toString()) + item.actvduration*1000*60*60 < Date.parse(new Date().toString())){
          return <Tag color='grey'>已结束</Tag>
        }else if(date(moment(item.actvtime).format().toString()) > Date.parse(new Date().toString())){
          console.log('319')
          if(item.leaderID == user.id){
            return <Tag color='green'>未开始</Tag>
          }else{
            return <Tag color='green'>已报名</Tag>
          }
        }
      }
    },
    {
      title: 'Action',
      key: 'actvid',
      render: ( item ) => {
        return <div>
          <Button shape='circle' icon={<AlignLeftOutlined />} onClick={()=>showModal(item)}></Button>
        </div>
      },
    },
  ];

  const punchactv = (item:any) => {
    //签到修改actvlist表中目标用户state为1
    axios.post('/api/forumapi/punchactv', {
      actvid: item.actvID,
      userid: user.id
    }).then(res=>{
      if(res.data.data == 0){
        message.error('活动开始前一小时开始签到！')
      }else{
        message.success('签到成功！')
        axios.post(`/api/forumapi/findUseractvlist`, {
          actvID: item.actvid
        }).then(res=>{
          setactvlistdataSource(res.data.data)
        })
      }
    })
  }

  const finishactv = (item:any) => {
    //完成活动修改actvlist表中目标用户state为2
    axios.post('/api/forumapi/finishactv', {
      actvid: item.actvID,
      userid: user.id
    }).then(res=>{
      //将对应活动义工时分发给目标用户
      axios.post('/api/login/addvoltime', {
        userid: user.id,
        duration: res.data.data
      }).then(res=>{
        message.success('发放义工时成功！')
        axios.post(`/api/forumapi/findUseractvlist`, {
          actvID: item.actvid
        }).then(res=>{
          setactvlistdataSource(res.data.data)
        })
      })
    })
  }

  const quitactv = (item: any) => {
    //相应活动的alreadyp递减，删除actvlist表中目标活动的目标用户记录
    axios.post('/api/forumapi/quitactv', {
      actvid: item.actvID,
      userid: user.id
    }).then(res=>{
      if(res.data.data == 0){
        message.error('活动开始前48小时不允许取消报名！')
      }else if(res.data.data == 2){
        message.error('活动已结束！')
      }else{
        message.success('取消报名成功')
        axios.post(`/api/forumapi/findUseractvlist`, {
          actvID: item.actvid
        }).then(res=>{
          setactvlistdataSource(res.data.data)
        })
      }
    })
  }

  const actvlistcolumns: ColumnsType<DataType> = [
    {
      title: '志愿者姓名',
      dataIndex: 'menbername',
      key: 'pubtime',
    },
    {
      title: '志愿者联系电话',
      dataIndex: 'menbertel',
      key: 'pubtime',
    },
    {
      title: '加入时间',
      dataIndex: 'pubtime',
      key: 'pubtime',
      render: (pubtime) => {
        return  <div>{moment(pubtime).format('MMMM Do YYYY, h:mm:ss a')}</div> 
      }
    },
    {
      title: '状态',
      key: 'pubtime',
      render: (item) => {
      if(item.state == 0){
        return <Tag color='grey'>未签到</Tag>
      }else if(item.state == 1){
        return <Tag color='orange'>已签到</Tag>
      }else if(item.state == 2){
        return <Tag color='green'>已完成</Tag>
      }
      }
    },
    {
      title: '操作',
      key: 'pubtime',
      render: (item) => {
        return (
          <div>
            {user.id == item.menberID && item.state == 0 && <Button type='text' onClick={()=>punchactv(item)} disabled={item.state == 0 ? false : true}>签到</Button>}
            {user.id == item.menberID && item.state == 0 && <Button icon={<CloseOutlined />} shape='circle' style={{marginLeft: '10px'}} onClick={()=>quitactv(item)}></Button>}
            {user.id == leaderid && <Button icon={<CheckOutlined />} disabled={item.state == 1 ? false : true} shape='circle' style={{marginLeft: '10px'}} onClick={()=>finishactv(item)}></Button>}
          </div>
        )
      } 
    }
  ]

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const [choose, setchoose] = useState(0)
  const [open, setOpen] = useState(false);

  const changefadeInUp = (num: number) => {
    if(num === 0){
      setchoose1(false)
      setchoose2(false)
      setTimeout(()=>{
        setchoose(0)
        setchoose0(true)
      }, 0)
    }else if(num === 1){
      setchoose0(false)
      // setchoose1(true)
      setchoose2(false)
      setTimeout(()=>{
        setchoose(1)
        setchoose1(true)
      }, 0)
    }else if(num === 2){
      setchoose0(false)
      setchoose1(false)
      // setchoose2(true)
      setTimeout(()=>{
        setchoose(2)
        setchoose2(true)
      }, 0)
    }
  }

  return (
    <div className='mine-view'>
      <div className='top-choose'>
        <div className='top-btn' onClick={()=>changefadeInUp(0)} style={choose === 0 ? {background: '#881945', color: '#FFFFFF'} : {}}>
          <div className='btn-text' >个人信息</div>
        </div>
        <div className='top-btn' onClick={()=>changefadeInUp(1)} style={choose === 1 ? {background: '#881945', color: '#FFFFFF'} : {}}>
          <div className='btn-text'>我的活动</div>
        </div>
        <div className='top-btn' onClick={()=>changefadeInUp(2)} style={choose === 2 ? {background: '#881945', color: '#FFFFFF'} : {}}>
          <div className='btn-text'>我的订单</div>
        </div>
      </div>
      {/* <div className='showbg'> */}
        {choose === 0 && <div class={choose0 && 'wow fadeInRight'} data-wow-duration="2s">
        <div className='showbg'>
          <Descriptions title="学生信息" bordered style={{width: '800px', margin: '10px auto'}} extra={<Button type="primary" onClick={()=>{setOpen(true)}}>编辑</Button>}>
            <Descriptions.Item label="姓名" span={3}>{userMsg && userMsg.name ? userMsg.name : "/"}</Descriptions.Item>
            <Descriptions.Item label="学院" span={3}>{userMsg && userMsg.major != "" ? userMsg.major : "/"}</Descriptions.Item>
            <Descriptions.Item label="电话" span={3}>{userMsg && userMsg.tel ? userMsg.tel : "/"}</Descriptions.Item>
            <Descriptions.Item label="住址" span={3}>{userMsg && userMsg.addr ? userMsg.addr : "/"}</Descriptions.Item>
            <Descriptions.Item label="生日" span={2}>{userMsg && userMsg.birth ? userMsg.birth : "/"}</Descriptions.Item>
            <Descriptions.Item label="义工时" span={1}>{userMsg && userMsg.voltime ? userMsg.voltime : "/"}</Descriptions.Item>
          </Descriptions>
          </div>
        </div>}

        {choose === 1 && <div class={choose1 && 'wow fadeInRight'} data-wow-duration="2s"> 
        <div className='showbg'>
          <div style={{textAlign: 'center', marginTop: '10px'}}>活动信息</div>
          <div className='mine'> 
            <Table columns={actvcolumns} dataSource={actvdataSource} style={{width: '800px'}} />
          </div>
          </div>
        </div>}
        {/* {choose === 2 && <div>forum</div>} */}

        {choose === 2 && <div class={choose2 && 'wow fadeInRight'} data-wow-duration="2s">
         <div className='showbg'>
          <div style={{textAlign: 'center', marginTop: '10px'}}>订单信息</div>
          <div className='mine'> 
            <Table columns={columns} dataSource={dataSource} style={{width: '800px'}} />
          </div>
          </div>
        </div>}
      {/* </div> */}

      <div className='footer'>
        <div className='word-area'>
          <span>{'粤海校区：深圳市南山区南海大道3688号\n'}</span>
          <span>{'西丽校区：深圳市南山区学苑大道1066号\n'}</span>
          <hr style={{margin: '20px 0'}}></hr>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <svg className='icon'viewBox="0 0 1024 1024" width="30" height="30">
              <path className='icon1' d="M714.666667 100.885333l137.6 25.024A79.274667 79.274667 0 0 1 917.333333 203.904v487.978667a79.274667 79.274667 0 0 1-38.293333 67.861333L573.44 944.234667a118.890667 118.890667 0 0 1-122.922667 0L144.96 759.744A79.274667 79.274667 0 0 1 106.666667 691.904V203.882667a79.274667 79.274667 0 0 1 65.066666-77.994667L309.333333 100.906667a1132.117333 1132.117333 0 0 1 405.333334 0z m-11.456 62.954667a1068.117333 1068.117333 0 0 0-382.421334 0l-137.6 25.045333A15.274667 15.274667 0 0 0 170.666667 203.904v487.978667c0 5.333333 2.794667 10.304 7.381333 13.077333l305.578667 184.490667a54.890667 54.890667 0 0 0 56.746666 0l305.578667-184.490667a15.274667 15.274667 0 0 0 7.381333-13.077333V203.904a15.274667 15.274667 0 0 0-12.522666-15.018667l-137.6-25.045333z" fill="#ffffff" p-id="1642"></path>
              <path className='icon1' d="M707.050667 353.194667a32 32 0 0 1 43.029333 47.36l-207.893333 188.928a122.069333 122.069333 0 0 1-167.210667-2.837334l-87.957333-85.525333a32 32 0 0 1 44.629333-45.866667l87.957333 85.504a58.069333 58.069333 0 0 0 79.530667 1.344l207.914667-188.906666z" fill="#ffffff" p-id="1643"></path>
            </svg>
            <div className='goHome'>
              <span onClick={()=>{history.push('/home')}}>{'校园一览'}</span>
            </div>
            <svg className="icon" viewBox="0 0 1024 1024" width="30" height="30">
              <path className='icon1' d="M712.0896 726.09792a30.72 30.72 0 0 1 39.79264-17.42848c73.48224 28.672 118.51776 70.28736 118.51776 121.91744 0 97.75104-166.2976 162.69312-368.64 162.69312s-368.64-64.94208-368.64-162.69312c0-51.63008 45.056-93.22496 118.51776-121.91744a30.72 30.72 0 0 1 22.34368 57.22112c-52.4288 20.48-79.42144 45.40416-79.42144 64.7168 0 48.0256 136.27392 101.23264 307.2 101.23264s307.2-53.20704 307.2-101.25312c0-19.29216-26.97216-44.21632-79.42144-64.69632a30.72 30.72 0 0 1-17.44896-39.79264z" fill="#111111" p-id="2020"></path>
              <path className='icon1' d="M279.83872 222.76096l-3.54304 3.4816-3.4816 3.54304c-116.28544 120.15616-113.13152 311.82848 7.02464 428.09344l160.82944 155.648a87.8592 87.8592 0 0 0 122.18368 0l160.82944-155.648c2.37568-2.29376 4.7104-4.64896 7.02464-7.02464 116.28544-120.15616 113.13152-311.82848-7.02464-428.09344-123.71968-119.74656-320.1024-119.74656-443.84256 0z m42.72128 44.15488c99.90144-96.68608 258.49856-96.68608 358.4 0 95.76448 92.672 98.28352 245.4528 5.59104 341.21728l-2.7648 2.82624-163.6352 158.4128a26.4192 26.4192 0 0 1-36.7616 0l-160.82944-155.648c-95.76448-92.672-98.28352-245.4528-5.59104-341.21728l5.59104-5.59104z" fill="#111111" p-id="2021"></path>
              <path className='icon1' d="M501.76 307.2a143.36 143.36 0 1 0 0 286.72 143.36 143.36 0 0 0 0-286.72z m0 61.44a81.92 81.92 0 1 1 0 163.84 81.92 81.92 0 0 1 0-163.84z" fill="#131723" p-id="2022"></path>
            </svg>
            <div className='goHome'>
              <span onClick={()=>{history.push('/exhibition')}}>{'校园展示'}</span>
            </div>
            <svg className="icon" viewBox="0 0 1024 1024" width="30" height="30">
              <path className='icon1' d="M621.653333 96a32 32 0 0 1 0 64H257.578667A97.578667 97.578667 0 0 0 160 257.578667v508.842666a97.578667 97.578667 0 0 0 97.578667 97.578667h507.264a97.578667 97.578667 0 0 0 97.578666-97.152l1.578667-356.928a32 32 0 0 1 64 0.277333l-1.578667 356.928a161.578667 161.578667 0 0 1-161.578666 160.874667H257.578667A161.578667 161.578667 0 0 1 96 766.421333V257.578667A161.578667 161.578667 0 0 1 257.578667 96H621.653333z" fill="#ffffff" p-id="1643"></path>
              <path className='icon1' d="M753.258667 113.557333L455.552 409.6a64 64 0 0 0-18.88 45.376v53.845333a67.242667 67.242667 0 0 0 65.770667 67.242667l50.986666 1.109333a64 64 0 0 0 45.738667-17.813333L902.826667 267.946667a107.946667 107.946667 0 0 0 3.242666-152.490667l-1.450666-1.493333a107.029333 107.029333 0 0 0-151.338667-0.426667z m106.538666 46.144a43.946667 43.946667 0 0 1-1.322666 62.08L554.88 513.194667l-51.008-1.130667a3.242667 3.242667 0 0 1-3.178667-3.242667v-53.845333L798.378667 158.933333a43.029333 43.029333 0 0 1 58.112-2.346666l3.306666 3.114666z" fill="#ffffff" p-id="1644"></path>
              <path className='icon1' d="M772.330667 154.858667l94.677333 95.274666-45.397333 45.098667-94.677334-95.253333z" fill="#ffffff" p-id="1645"></path>
            </svg>
            <div className='goHome'>
              <span onClick={()=>{history.push('/forum')}}>志愿活动</span>
            </div>
            <svg className="icon" viewBox="0 0 1024 1024" width="30" height="30">
              <path className='icon1' d="M753.770667 74.666667a162.453333 162.453333 0 0 1 162.453333 162.453333v553.194667a32 32 0 1 1-64 0V237.12A98.453333 98.453333 0 0 0 753.770667 138.666667H270.229333a98.453333 98.453333 0 0 0-98.453333 98.453333v553.194667a32 32 0 0 1-64 0V237.12A162.453333 162.453333 0 0 1 270.229333 74.666667h483.541334z" fill="#ffffff" p-id="1831"></path>
              <path className='icon1' d="M970.794667 724.352a32 32 0 0 1 21.077333 60.416l-466.474667 162.773333a32 32 0 0 1-20.992 0.042667l-472.170666-162.773333a32 32 0 0 1 20.864-60.501334l461.674666 159.146667 456.021334-159.104zM618.773333 243.648a32 32 0 1 1 45.333334 45.184l-152.426667 152.917333-152.768-152.896a32 32 0 0 1 45.269333-45.226666l107.456 107.52 107.136-107.498667z" fill="#ffffff" p-id="1832"></path>
              <path className='icon1' d="M683.797333 396.416a32 32 0 1 1 0 64h-343.68a32 32 0 1 1 0-64h343.68zM683.797333 526.634667a32 32 0 1 1 0 64h-343.68a32 32 0 1 1 0-64h343.68z" fill="#ffffff" p-id="1833"></path><path d="M511.253333 353.834667a32 32 0 0 1 32.704 31.274666l7.957334 357.162667a32 32 0 0 1-63.978667 1.429333l-7.978667-357.162666a32 32 0 0 1 31.296-32.704z" fill="#ffffff" p-id="1834"></path>
            </svg>
            <div className='goHome'>
              <span onClick={()=>{history.push('/product')}}>{'纪念品'}</span>
            </div>
          </div>    
        </div>
        <div className='code-area'>
          <div className='code-bg'>
            <div className='ft-code-1'></div>
            <div className='ft-code-2'></div>
            <div className='ft-code-3'></div>
          </div>
          <div className='code-title'>
            <div className='title'>官方bilibli平台</div>
            <div className='title'>官方抖音号</div>
            <div className='title'>官方微博</div>
          </div>        
        </div>       
      </div>

      <Drawer
        title="编辑个人信息"
        placement='bottom'
        closable={false}
        onClose={()=>{setOpen(false)}}
        open={open}
        key='bottom'
        size='default'
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size='middle'
          // style={{ maxWidth: 600 }}
          style={{ width: 600, margin: 'auto' }}
          onFinish={onFinish}
          ref={changeRef}
        >
          <Form.Item label="tel" name='tel' style={{marginBottom: '15px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="Dormitory" name="Dormitory" style={{marginBottom: '15px'}}>
            <Select>
              {
                dormitorys.map(item=>
                  <Select.Option key={item} value={item} name={item}>{item}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="Housenumber" name="Housenumber" style={{marginBottom: '15px'}}>
            <Input />
          </Form.Item>
          <Form.Item label="major" name="major" style={{marginBottom: '15px'}}>
          <Select>
              {
                college.map(item=>
                  <Select.Option key={item} value={item} name={item}>{item}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="Date" name='Date' style={{marginBottom: '15px'}}>
            <DatePicker format={dateFormat}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginBottom: '5px'}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      
      <Modal
        open={ischeckOpen}
        title="订单信息"
        onCancel={() => {
          setischeckOpen(false)
        }}
        footer= {null}
        width={800}
      >
        <Descriptions layout="vertical" bordered size='small'>
          <Descriptions.Item label="用户id">{checkoutinfo.buyerID}</Descriptions.Item>
          <Descriptions.Item label="用户电话">{checkoutinfo.buyertel}</Descriptions.Item>
          <Descriptions.Item label="用户地址">{checkoutinfo.buyeraddr}</Descriptions.Item>
          <Descriptions.Item label="志愿者id">{checkoutinfo.volID ? checkoutinfo.volID : "暂无"}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{checkoutinfo.voltel ? checkoutinfo.voltel : "暂无" }</Descriptions.Item>
          <Descriptions.Item label="志愿者姓名">{checkoutinfo.volname ? checkoutinfo.volname : "暂无"}</Descriptions.Item>
          <Descriptions.Item label="商品信息" span={3}>
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

      <Modal
        open={isactvOpen}
        title="人员信息"
        onCancel={() => {
          setisactvOpen(false)
        }}
        footer= {null}
        width={800}
      >
        <Table columns={actvlistcolumns} dataSource={actvlistdataSource} style={{width: '800px'}} />
      </Modal>
      
      
    </div>

    
  );
};

export default App;