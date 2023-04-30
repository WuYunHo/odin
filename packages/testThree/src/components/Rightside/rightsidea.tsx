import React, { useEffect, useState } from 'react'
import { Column, Line } from '@ant-design/plots';
import { Tag } from 'antd';
import axios from 'axios';

export default function Rightsidea() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  // const config = {
  //   height: 300,
  //   data,
  //   xField: 'year',
  //   yField: 'gdp',
  //   seriesField: 'name',
  //   yAxis: {
  //     label: {
  //       formatter: (v: number) => `${(v / 10e8).toFixed(1)} B`,
  //     },
  //   },
  //   legend: {
  //     position: 'top',
  //   },
  //   smooth: true,
  //   // @TODO 后续会换一种动画方式
  //   animation: {
  //     appear: {
  //       animation: 'path-in',
  //       duration: 20000,
  //     },
  //   },
  // };
  useEffect(()=>{
    axios.get('/api/forumapi/commentChart').then(res=>{
      console.log(res)
      setdata(res.data.data)
    })
  }, [])
  const [data, setdata] = useState([])

  // const data = [
  //   {
  //     type: '1-3秒',
  //     value: 0.16,
  //   },
  //   {
  //     type: '4-10秒',
  //     value: 0.125,
  //   },
  //   {
  //     type: '11-30秒',
  //     value: 0.24,
  //   },
  //   {
  //     type: '31-60秒',
  //     value: 0.19,
  //   },
  //   {
  //     type: '1-3分',
  //     value: 0.22,
  //   },
  //   {
  //     type: '3-10分',
  //     value: 0.05,
  //   },
  //   {
  //     type: '10-30分',
  //     value: 0.01,
  //   },
  //   {
  //     type: '30+分',
  //     value: 0.015,
  //   },
  // ];
  const paletteSemanticRed = '#F4664A';
  const brandColor = '#5B8FF9';
  const config = {
    height: 300,
    data,
    xField: 'date',
    yField: 'num',
    seriesField: '',
    color: ({ num }) => {
      if (num < 10) {
        return paletteSemanticRed;
      }

      return brandColor;
    },
    label: {
      content: (originData) => {
        const val = parseFloat(originData.value);

        if (val < 0.05) {
          return (val * 100).toFixed(1) + '%';
        }
      },
      offset: 10,
    },
    legend: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return (
    <div style={{textAlign: 'center', margin: '0 10px 0 0', boxShadow: '8px 4px 4px #cccccc', background: 'linear-gradient(to right, white, rgba(0, 0, 0, 0.05))'}}>
      <Tag color="lime">论坛热度</Tag>
      {/* <Line {...config} /> */}
      <Column {...config} />
    </div>
    
  )
}
