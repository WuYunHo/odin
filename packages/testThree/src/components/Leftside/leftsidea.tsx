import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Area, Column, Line } from '@ant-design/plots';
import { Tag } from 'antd';
import { Shadow } from '@react-three/drei';
import axios from 'axios';

export default function Leftsidea() {

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  // const configa = {
  //   height: 300,
  //   data,
  //   // padding: 'auto',
  //   xField: 'Date',
  //   yField: 'scales',
  //   xAxis: {
  //     // type: 'timeCat',
  //     tickCount: 5,
  //   },
  //   smooth: true,
  // };

  const [data, setData] = useState([]);

  useEffect(()=>{
    axios.get('/api/forumapi/actvChart').then(res=>{
      setData(res.data.data)
    })
  }, [])

  const config = {
    data,
    xField: 'date',
    yField: 'num',
    seriesField: 'type',
    slider: {
      start: 0.1,
      end: 0.9,
    },
    height: 300
  };

  return (
    <div style={{position: 'relative' ,textAlign: 'center', margin: '0 0 0 10px', boxShadow: '-8px 4px 4px #cccccc', background: 'linear-gradient(to left, white, rgba(0, 0, 0, 0.05))'}}>
      {/* rgba(0, 0, 0, 0.05) */}
      <Tag color="orange">志愿活动信息</Tag>
      {/* <Line {...configa} /> */}
      <Area {...config} />
    </div>
  )
}

// ReactDOM.render(<Leftside />, document.getElementById('container'));