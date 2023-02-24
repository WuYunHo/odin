import { PageContainer } from '@ant-design/pro-components';
import { Access, history, useAccess, useModel } from '@umijs/max';
import { Button } from 'antd';
import { useEffect } from 'react';

const AccessPage: React.FC = () => {
  // const access = useAccess();

  const { user } = useModel('user')

  console.log(user?.id)

  if(!user){
    history.push('/home')
  }

  return (
    <div>   
    {
      user?.id === 0 && <div>111</div>
    }
    </div>
    
    
  );

  // return (
  //   <PageContainer
  //     ghost
  //     header={{
  //       title: '权限示例',
  //     }}
  //   >
  //     <Access accessible={access.canReadAssess}>
  //       <Button>test</Button>
  //     </Access>
  //   </PageContainer>
  // );
};

export default AccessPage;
