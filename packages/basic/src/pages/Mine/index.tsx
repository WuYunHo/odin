import React, { useState } from 'react';
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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import './index.css'

type SizeType = Parameters<typeof Form>[0]['size'];

const App: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const dormitorys = ['聚翰斋', '紫薇斋', '红豆斋', '风槐斋', '蓬莱客舍', '银桦斋', '凌霄斋', '米兰斋', '山茶斋', '红榴斋', '海桐斋', '桃李斋', '雨鹃斋', '春笛', '夏筝', '秋瑟', '冬筑', '四海楼', '紫藤轩', '云杉轩', '芸香阁', '乔木阁', '乔梧阁', '乔相阁', '乔森阁', '乔林阁', '疏影阁', '海棠阁', '文杏阁', '丁香阁', '紫檀阁', '石楠轩', '苏铁轩', '丹枫轩', '木犀轩', '辛夷阁', '韵竹阁', '杜衡阁']
  const college = ['教育学部', '艺术学部', '医学部', '马克思主义学院', '经济学院', '法学院', '心理学院','体育学院', '人文学院', '外国语学院', '传播学院', '数学与统计学院', '物理与光电工程学院', '化学与环境工程学院','生命鱼海洋科学学院', '机电与控制工程学院', '材料学院', '电子与信息工程学院', '计算机与软件学院', '建筑与城市规划学院', '土木与交通工程学院','管理学院', '政府管理学院', '高等研究院', '金融科技学院', '国际交流学院', '继续教育学院', '深圳大学东京学院']

  const onFinish = (values: any) => {
    const infdate = values.Date.$y+'-'+values.Date.$M+1+'-'+values.Date.$D
    values.Date = infdate
    console.log(infdate,values);
  };

  const dateFormat = 'YYYY-MM-DD';

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <div>
      <div className='mine'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
          // style={{ maxWidth: 600 }}
          style={{ width: 600 }}
          onFinish={onFinish}
        >
          <Form.Item label="Form Size" name='size'>
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="tel" name='tel'>
            <Input />
          </Form.Item>
          <Form.Item label="Dormitory">
            <Select>
              {
                dormitorys.map(item=>
                  <Select.Option key={item} value={item} name={item}>{item}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="House-number" name="House-number">
            <Input />
          </Form.Item>
          <Form.Item label="College" name="College">
          <Select>
              {
                college.map(item=>
                  <Select.Option key={item} value={item} name={item}>{item}</Select.Option>
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label="Date" name='Date'>
            <DatePicker format={dateFormat}/>
          </Form.Item>
          <Form.Item label="Ifinfection" name="Ifinfection">
            <Radio.Group>
              <Radio value="Yes"> Yes </Radio>
              <Radio value="No"> No </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <hr />
      <div style={{textAlign: 'center'}}>我的订单</div>
      <div className='mine'> 
        <Table columns={columns} dataSource={data} style={{width: '800px'}} />
      </div>
      
    </div>

    
  );
};

export default App;