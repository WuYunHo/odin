import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function Clock() {
  const [newTime, setnewTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  useEffect(()=>{
    setInterval(()=>{
      setnewTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    }, 100)
  })
  return (
    <div>
      <div style={{height:'100px', width: '300px', marginLeft: 'auto'}}>
        <div style={{height: '50px', marginTop: '60px', fontSize: '25px', lineHeight: '25px', fontWeight: '800', textAlign: 'center'}}>{newTime}</div>  
      </div>
    </div>
  )
}
