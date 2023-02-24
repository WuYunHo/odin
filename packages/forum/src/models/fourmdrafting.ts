import { useRequest } from 'ahooks';
import { useState } from 'react';
import { querypubArticleList } from './api';

export default function usedrafting() {
  const [pubarticledata, setpubarticledata] = useState({})

  const { loading, runAsync } = useRequest(querypubArticleList, {
    manual: false,
    onSuccess({ data }) {
      // setState(user)
      setpubarticledata(data)
    }
  })

  return {
    // user: state,
    pubarticledata,
    loadpubarticles(){
      return runAsync()
    },
  }

}