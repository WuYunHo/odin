import React, { useEffect, useState } from 'react'
import { Input, Avatar, Card, Col, Row, Modal } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios'

const { Search } = Input;
const { Meta } = Card;

const App: React.FC = () => {
  const [dataSource, setdataSource] = useState([]) //product数据存储
  const [isVisible, setisVisible] = useState(false)
  const [productId, setproductId] = useState([])

  const onSearch = (value: string) => {
    console.log(value);
    if (value === '') {
      axios.get('/products/findAllProducts').then(res => {
        console.log(res.data.data)
        setdataSource(res.data.data)
      })
    } else {
      axios.get(`/products/findProductByName?name=${value}`).then(res => {
        console.log(res.data.data)
        const findarr = [res.data.data]
        // setdataSource(findarr)
      })
    }
  }

  const checkProduct = (item: any) => {
    setproductId(item)
    setisVisible(true)
  }
  
  const visibleOk = (item: any) => {
    console.log(item)
  }

  useEffect(() => {
    axios.get('/products/findAllProducts').then(res => {
      console.log(res.data.data)
      setdataSource(res.data.data)
    })
  }, [])

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />

      <p></p>

      <Row gutter={16}>
        {
          dataSource.map((item: any) =>
            <Col span={8} key={item.id}>
              <Card
                // style={{ width: '30%' }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                hoverable
                onClick={()=> checkProduct(item)}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={item.name}
                  description={`￥${item.price}`}
                />
              </Card>
              <p></p>
              </Col>
          )
        }
      </Row>
      
      <Modal
        open={isVisible}
        // title="商品信息"
        okText="立即购买"
        cancelText="加入购物车"
        onCancel={() => {
          setisVisible(false)
        }}
        onOk={() => visibleOk(productId)}
      >
        <Card
          // style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            title={productId.name}
            description={`￥${productId.price}`}
          />
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="来自{用户}的评论："
            extra={<a href="#">More</a>}
            size='small'
          >
            real delicious
          </Card>
        </Card>
      </Modal>
        
    </div> 
  );
}

export default App;