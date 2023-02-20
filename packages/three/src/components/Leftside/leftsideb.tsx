import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie, measureTextWidth, Liquid } from '@ant-design/plots';
import './leftsideb.css'
import { Tag } from 'antd';

export default function leftsideb() {
  function renderStatistic(containerWidth: number, text: string, style: { fontSize: number; }) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const data = [
    {
      type: '教授',
      value: 589,
    },
    {
      type: '副教授',
      value: 805,
    },
    {
      type: '技术人员',
      value: 592,
    },
    {
      type: '管理人员',
      value: 830,
    },
    {
      type: '博士后',
      value: 1288,
    },
    {
      type: '专职研究人员',
      value: 725,
    },
    {
      type: '访问教授',
      value: 87,
    },
  ];
  const config = {
    height: 300,
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v: any) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container: { getBoundingClientRect: () => { width: any; height: any; }; }, view: any, datum: { type: any; }) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container: { getBoundingClientRect: () => { width: any; }; }, view: any, datum: { value: any; }, data: any[]) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}人` : `${data.reduce((r, d) => r + d.value, 0)}人`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },

    // 添加 中心统计文本 交互
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  const liquidconfiga = {
    percent: 0.25,
    outline: {
      border: 2,
      distance: 2,
    },
    wave: {
      length: 128,
    },
    width: 120,
    height: 120,
    padding: 5,
    // statistic: {
    //   style: {
    //     width: 60,
    //     height: 20,
    //   }
    // }
  };

  const liquidconfigb = {
    percent: 0.27,
    outline: {
      border: 2,
      distance: 2,
    },
    wave: {
      length: 128,
    },
    width: 120,
    height: 120,
    padding: 5 ,
  };

  return (
    <div style={{ textAlign: 'center'}}>
      <Tag color="gold">gold</Tag>
      <div className='liquidgrid'>
        <Liquid {...liquidconfiga} className='leftLiquid'/>
        <Liquid {...liquidconfigb} className='midLiquid'/>
      </div>
      
      <Pie {...config} />
    </div>
    
  )
}
