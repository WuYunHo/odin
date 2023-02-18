import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { connect } from '@umijs/max';
import { Button } from 'antd';

const HomePage: React.FC = (props) => {
  const { name } = useModel('global');
  const masterProps = useModel('@@qiankunStateFromMaster');

  const testDva = () => {
    // console.log(test)
    console.log(props)
    props.dispatch({
      type: 'test/increment',
      payload: 1
    })
  }

  const testQk = () => {
    console.log(masterProps)
  }
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Button onClick={() => testDva()}>{props.test}</Button>
        <Button onClick={() => testQk()}>qiankun</Button>
      </div>
    </PageContainer>
  );
};

export default connect(({ test }:{ test:any})=>({ test }))(HomePage)
