import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Heatmap } from '@ant-design/plots';
import { Tag } from 'antd';
import axios from 'axios';

export default function Rightsideb() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   asyncFetch();
  // }, []);

  useEffect(()=> {
    axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v93&appid=18825428&appsecret=MbHt9cpf`).then(res=>{
      console.log(res.data.week)
      let arr = []
      for(let i = 0; i < 7; i++){
        for(let j = 0; j < 8; j++){
          arr[24*i + 3*j] = {"week":res.data.week[i].week, "time":res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1 ,"value":Math.floor(res.data.week[i].hours[j].tem*100)/100}
          if(i == 6 && j ==7){
            arr[24*i + 3*j + 1] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+1) ,"value":Math.floor(res.data.week[i].hours[j].tem*100)/100}
            arr[24*i + 3*j + 2] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+2) ,"value":Math.floor(res.data.week[i].hours[j].tem*100)/100}
          }else if(j < 7){
            arr[24*i + 3*j + 1] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+1) ,"value":Math.floor(((res.data.week[i].hours[j+1].tem - res.data.week[i].hours[j].tem)*1/3 + res.data.week[i].hours[j].tem*1)*100)/100}
            arr[24*i + 3*j + 2] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+2) ,"value":Math.floor(((res.data.week[i].hours[j+1].tem - res.data.week[i].hours[j].tem)*2/3 + res.data.week[i].hours[j].tem*1)*100)/100}
          }else{
            arr[24*i + 3*j + 1] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+1) ,"value":Math.floor(((res.data.week[i+1].hours[0].tem - res.data.week[i].hours[j].tem)*1/3 + res.data.week[i].hours[j].tem*1)*100)/100}
            arr[24*i + 3*j + 2] = {"week":res.data.week[i].week, "time":(res.data.week[i].hours[j].time.slice(-5).slice(0,2)*1+2) ,"value":Math.floor(((res.data.week[i+1].hours[0].tem - res.data.week[i].hours[j].tem)*2/3 + res.data.week[i].hours[j].tem*1)*100)/100}
          }
          
        }
      }
      for(let item of arr){
        if(item.time >= 24){
          item.time -= 24
        }
      }
      console.log(arr)
      setData(arr)
    })
  }, [])

  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/polar-heatmap.json')
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };
  const config = {
    data,
    xField: 'time',
    yField: 'week',
    colorField: 'value',
    legend: true,
    color: '#BAE7FF-#1890FF-#1028ff',
    coordinate: {
      // 坐标轴属性配置
      type: 'polar',
      // 极坐标
      cfg: {
        innerRadius: 0.2,
      },
    },
    heatmapStyle: {
      stroke: '#f5f5f5',
      opacity: 0.8,
    },
    meta: {
      time: {
        type: 'cat',
      },
      value: {
        min: 18, //0
        max: 30,  //1
      },
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: '#666',
          fontSize: 12,
          textBaseline: 'top',
        },
      },
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: '#fff',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)',
        },
      },
    },
    tooltip: {
      showMarkers: false,
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div style={{margin: '20px 10px 0 0', boxShadow: '8px 4px 4px #cccccc', width: 'calc(100% - 10px)', background: 'linear-gradient(to right, white, rgba(0, 0, 0, 0.05))', height: 'calc(100% - 342px - 4px)'}}>
      <div style={{textAlign: 'center'}}>
        <Tag color="green">一周内天气出行指数</Tag>
      </div>
      <div>
        <Heatmap {...config} />
      </div>
      
    </div>
    
  )
}
