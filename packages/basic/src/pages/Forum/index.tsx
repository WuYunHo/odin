import {MicroAppWithMemoHistory} from '@umijs/max';
import styles from "./index.less";

export default function () {
  return <div className={styles.basicContainer}>
    <MicroAppWithMemoHistory name={"forum"} url={"/forum"}/>
  </div>
}
