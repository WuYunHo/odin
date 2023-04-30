import React, { forwardRef, useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;


const ProductForm: React.FC<any> = forwardRef((props, ref) => {
  const [isDisabled, setisDisabled] = useState(false)

  useEffect(() => {
    setisDisabled(props.typeDisabled)
  }, [props.typeDisabled])
  
  return (
    <div>
      <Form
        ref={ref}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="商品名称"
          rules={[{ required: true, message: 'Please input your name of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="商品类型"
          rules={isDisabled ? [] : [{ required: true, message: 'Please input your type of collection!' }]}
        >
          <Select disabled={isDisabled}>
            {
              props.typeList.map((item: any) =>
                <Option value={item['type_content']} key={item['id']}>{item['type_content']}</Option>
              )
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="region"
          label="售卖区域"
          rules={isDisabled ? [] : [{ required: true, message: 'Please input your region of collection!' }]}
        >
          <Select disabled={isDisabled}>
            {
              props.regionList.map((item: any) =>
                <Option value={item['region_content']} key={item['id']}>{item['region_content']}</Option>
              )
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[{ required: true, message: 'Please input your name of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="count"
          label="数量"
          rules={[{ required: true, message: 'Please input your name of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="descriptions"
          label="介绍"
          rules={[{ required: true, message: 'Please input your name of collection!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </div>
  )
})

export default ProductForm;
