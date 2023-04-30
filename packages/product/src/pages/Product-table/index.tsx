import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, Table, Input, Select, AutoComplete, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'; 
import ProductForm from '@/components/product/productForm';
import { useModel } from '@umijs/max';

const { confirm } = Modal;
const { Search } = Input;

interface DataType {
  id: number;
  name: string;
  type: string;
  age: number;
  address: string;
  tags: string[];
  time: Date;
}

const App: React.FC = () => {
  const [dataSource, setdataSource] = useState([]) //product数据存储
  const [isAddOpen, setisAddOpen] = useState(false) //表单创建弹出
  const [isUpdateOpen, setisUpdateOpen] = useState(false) //表单更新弹出
  const [typeDisabled, settypeDisabled] = useState(false) //表单更新时禁用属性
  const [typeList, settypeList] = useState([]) //product_type数据存储
  const [regionList, setregionList] = useState([]) //product-region数据存储

  const [updateId, setupdateId] = useState(null)
  const addForm = useRef(null)
  const updateForm = useRef(null)

  const masterProps = useModel('@@qiankunStateFromMaster');
  const [user, setuser] = useState(masterProps.user)

  const deleteMethod = (item: any) => {
    setdataSource(dataSource.filter(data => data['id'] !== item.id)) //data.id调用报错属性未定义，转为data['id]属性名调用
    axios.get(`/api/products/delete?name=${item.name}`)
    console.log(item.name)
  }

  const confirmMethod = (item: any) => {
    confirm({
      title: 'sure to delete?',
      icon: <ExclamationCircleOutlined></ExclamationCircleOutlined>,
      onOk(){
        deleteMethod(item)
      },
      onCancel(){
        
      }
    })
  };

  const addFormOk = () => {
    console.log(imgUrl)
    addForm.current.validateFields().then((value: any)=>{
      setisAddOpen(false)

      console.log(value, imgUrl)

      addForm.current.resetFields()
      axios.post(`/api/products/addProductByName`, {
        ...value,
        sellerID: user.id,
        sellerName: user.name,
        time: new Date(),
        imgUrl: imgUrl
      }).then(res => {
        console.log(res.data.data)
        setdataSource([...dataSource,res.data.data])
      })    
    }).catch((err: any)=>{
      console.log(err)
    })
  }

  const updateFormOk = (item: any) => {
    updateForm.current.validateFields().then((value: any)=>{
      setisUpdateOpen(false)
      updateForm.current.resetFields()
      console.log(value, item)
      axios.post(`/api/products/update`, {
        id: item,
        ...value,
        time: new Date(),
      }).then(res => {
        console.log(res.data.data)
        axios.get('/api/products/findAllProducts').then(res => {
          console.log(res.data.data)
          setdataSource(res.data.data)
        })
      })    
    }).catch((err: any)=>{
      console.log(err)
    })
  }

  const handleUpdate = (item: any) => {
    setisUpdateOpen(true)
    settypeDisabled(true)
    setTimeout(() => {  
       updateForm.current.setFieldsValue(item) 
    }, 0)   
    setupdateId(item.id)
    // console.log(updateId)
  }

 const onSearch = (value: string) => {
    console.log(value);
    if (value === '') {
      axios.get('/api/products/findAllProducts').then(res => {
        console.log(res.data.data)
        setdataSource(res.data.data)
      })
    } else {
      axios.get(`/api/products/findProductByName?name=${value}`).then(res => {
        console.log(res.data.data)
        const findarr = [res.data.data]
        setdataSource(findarr)
      })
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{ id }</b>
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      render: (name) => {
        return <b>{ name }</b>
      }
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      render: (type) => {
        return <b>{ type }</b>
      }
    },
    {
      title: '商品价格',
      dataIndex: 'price',
      render: (price) => {
        return <b>{ price }</b>
      }
    },
    {
      title: '数量',
      dataIndex: 'count',
      render: (count) => {
        return <b>{ count }</b>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'time',
      render: (time) => {
        return <b>{ time.slice(0, 10) }</b>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button 
            danger 
            shape='circle' 
            icon={<DeleteOutlined></DeleteOutlined>} 
            onClick={()=> confirmMethod(item)}>
          </Button>
          <Button
            type='primary'
            shape='circle'
            icon={<EditOutlined></EditOutlined>}
            onClick={()=> handleUpdate(item)}> 
          </Button>
        </div>
      }
    },
  ];
  
  useEffect(() => {
    axios.get('/api/products/findAllProducts').then(res => {
      console.log(res.data.data)
      setdataSource(res.data.data)
    })
  }, [])

  useEffect(() => {
    axios.get('/api/products/findAllProductTypes').then(res => {
      console.log(res.data.data)
      settypeList(res.data.data)
    })
  }, [])

  useEffect(() => {
    axios.get('/api/products/findAllProductRegions').then(res => {
      console.log(res.data.data)
      setregionList(res.data.data)
    })
  }, [])

  const [imgUrl, setimgUrl] = useState('')

  const toUpload = () => {
    const fileInput = document.querySelector('#file-input')
    
    let formData = new FormData();
    
    formData.append('file', fileInput.files[0])
    // console.log(fileInput)

    // for(let value of formData.values()){
    //   console.log(value);   
    // }
    fetch('/api/login/upload', {
      method: 'POST',
      body: formData,
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      message.success('图片上传成功！')
      setimgUrl(data.imgUrl)
    });
  }

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 6
        }}
        rowKey={(item) => item.id} />
      
      <Button type='primary' style={{ float: 'right' }} onClick={() => {
          setisAddOpen(true)
        }}>添加商品</Button>
      
      <Modal
        open={isAddOpen}
        title="添加商品"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setisAddOpen(false)
        }}
        onOk={() => addFormOk()}
      >
        <ProductForm typeList={typeList} regionList={regionList} ref={addForm}></ProductForm>
        <form id='uploadForm' method="post" encType="multipart/form-data" style={{display: 'flex'}}>
          {/* Name: <input type="text" className='name' name="name" /><br /> */}
          图片：<input type="file" className='testFile' name="testFile" id='file-input'/><br />
          {/* <input type="button" value="button" onClick={()=>toUpload()} style={{marginLeft: 'auto'}}/> */}
          <Button icon={<VerticalAlignTopOutlined />} onClick={()=>toUpload()} style={{marginLeft: 'auto'}}></Button>
        </form>
      </Modal>

      <Modal
        open={isUpdateOpen}
        title="更新商品"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setisUpdateOpen(false)
          settypeDisabled(!typeDisabled)
        }}
        onOk={() => updateFormOk(updateId)}
      >
        <ProductForm typeList={typeList} regionList={regionList} ref={updateForm} typeDisabled={typeDisabled}></ProductForm>
      </Modal>
    </div> 
  );
}

export default App;