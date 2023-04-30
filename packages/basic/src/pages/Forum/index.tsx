import {history, MicroAppWithMemoHistory, useModel} from '@umijs/max';
import { Tag } from 'antd';
import styles from "./index.less";

export default function () {
  const { user } = useModel('user')
  console.log(user)
  return <div className={styles.basicContainer}>
    {
      !user ? <div style={{textAlign: 'center'}} className={styles.nouser}>
        <Tag color='green'>请登录！</Tag>
      </div> : <MicroAppWithMemoHistory name={"forum"} url={"/forum"}/>
    }
    
  </div>
}
