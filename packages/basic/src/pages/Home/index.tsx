import { MicroAppWithMemoHistory, useModel } from '@umijs/max';
import { Tag } from 'antd';
import styles from "./index.less";

export default function () {
  return (
    <div className={styles.basicContainer}>
      <MicroAppWithMemoHistory name={"testthree"} url={"/testthree"}/>
    </div>
  )
}
