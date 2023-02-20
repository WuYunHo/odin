import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { connect, useModel } from '@umijs/max';
import { Button } from 'antd';
import styles from './index.less';

const HomePage: React.FC = (props) => {
  const { name } = useModel('global');
  const testDva = () => {
    // console.log(test)
    console.log(props)
    // props.dispatch({
    //   type: 'user/increment',
    //   payload: 1,
    // })

    props.dispatch({
      type: 'user/testChange',
      payload: 1,
    })
  }
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        
        <Button onClick={() => testDva()}>{props.user}</Button>
      </div>
    </PageContainer>
  );
};

const mapModelToProps = (user: any) =>{ 
  return user
} 

export default connect(mapModelToProps)(HomePage);
