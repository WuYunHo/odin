import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useRef } from 'react';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductPage: React.FC = () => {
  const [form] = Form.useForm();

  const region = useRef(null)

  const onFinish = (values: any) => {
    console.log(values);
    axios.post('/api/products/createNewProductTypes', {
      producttype: values.note
    }).then(res=>{
      console.log(res)

      form.resetFields();
    })
  };

  const onregionFinish = () => {
    region.current.validateFields().then((value: any)=>{
      
      console.log(value.region)

      axios.post('/api/products/createNewProductRegions', {
        content: value.region
      }).then(res=>{
        console.log(res)

        region.current.resetFields()
      })
    })
  }

  return (
    <PageContainer
      ghost
      header = {{
        title: '分类发布',
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column', width: '600px', margin: '0 auto'}}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: '600', margin: '50 auto' }}
        >
          <Form.Item name="note" label="分类名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Form
          {...layout}
          ref={region}
          name="control-hooks"
          onFinish={onregionFinish}
          style={{ maxWidth: '600', margin: '50 auto' }}
        >
          <Form.Item name="region" label="地域名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      
      

    </PageContainer>
  );
};

export default ProductPage;
