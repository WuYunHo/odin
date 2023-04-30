import React, { useEffect, useState } from 'react';

import { WOW } from 'wowjs'
// import 'animate.css'
import '../../../node_modules/wowjs/css/libs/animate.css'
import './index.less'
import axios from 'axios';
import { Line } from '@ant-design/charts';

export default function Test() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/forumapi/actvChart').then(res=>{
      setData(res.data.data)
    })
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: '-100vh',
      mobile: false,
      live: false 
    })
    wow.init();
  }, [])

  const config = {
    data,
    xField: 'date',
    yField: 'num',
    seriesField: 'type',
    // legend: {
    //   position: 'top',
    // },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 10000,
        delay: 1000
      },
    },
  };

  return (
    <div>
      {/* <div style={{height: 'calc(100vh - 56px)'}}></div> */}
      {/* <div style={{display: 'flex', flexDirection: 'row'}}>
        <section class="wow slideInLeft" data-wow-duration="1s" data-wow-delay="0s" data-wow-offset="10" style={{width: '400px', height: '400px', background: 'whitewowwow'}}>
          <Line {...config} />
        </section>
        <div class="wow fadeIn"  data-wow-duration="3s" data-wow-delay="1s" data-wow-offset="10" style={{width: '300px', height: '300px', background: 'red'}} ></div>
      </div> */}
      <svg viewBox="0 0 1024 1024" className='icon'  width="50" height="50" style={{background: 'grey'}}>
        <path className='icon1' d="M714.666667 100.885333l137.6 25.024A79.274667 79.274667 0 0 1 917.333333 203.904v487.978667a79.274667 79.274667 0 0 1-38.293333 67.861333L573.44 944.234667a118.890667 118.890667 0 0 1-122.922667 0L144.96 759.744A79.274667 79.274667 0 0 1 106.666667 691.904V203.882667a79.274667 79.274667 0 0 1 65.066666-77.994667L309.333333 100.906667a1132.117333 1132.117333 0 0 1 405.333334 0z m-11.456 62.954667a1068.117333 1068.117333 0 0 0-382.421334 0l-137.6 25.045333A15.274667 15.274667 0 0 0 170.666667 203.904v487.978667c0 5.333333 2.794667 10.304 7.381333 13.077333l305.578667 184.490667a54.890667 54.890667 0 0 0 56.746666 0l305.578667-184.490667a15.274667 15.274667 0 0 0 7.381333-13.077333V203.904a15.274667 15.274667 0 0 0-12.522666-15.018667l-137.6-25.045333z" fill="#ffffff" p-id="1642"></path>
        <path className='icon1' d="M707.050667 353.194667a32 32 0 0 1 43.029333 47.36l-207.893333 188.928a122.069333 122.069333 0 0 1-167.210667-2.837334l-87.957333-85.525333a32 32 0 0 1 44.629333-45.866667l87.957333 85.504a58.069333 58.069333 0 0 0 79.530667 1.344l207.914667-188.906666z" fill="#ffffff" p-id="1643"></path>
      </svg>
      
      {/* <section class="wow slideInRight" data-wow-offset="10"  data-wow-iteration="10">456</section> */}
    </div>
  )
}
