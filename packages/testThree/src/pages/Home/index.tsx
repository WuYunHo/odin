// import Guide from '@/components/Guide';
// import { trim } from '@/utils/format';
// import { PageContainer } from '@ant-design/pro-components';
// import { useModel } from '@umijs/max';
// import styles from './index.less';

// const HomePage: React.FC = () => {
//   const { name } = useModel('global');
//   return (
//     <PageContainer ghost>
//       <div className={styles.container}>
//         <Guide name={trim(name)} />
//       </div>
//     </PageContainer>
//   );
// };

// export default HomePage;

// import React, { useState } from 'react'
// import { Canvas, useFrame, useLoader } from '@react-three/fiber'
// import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'
// import { history } from '@umijs/max'

// function Model(props: any) {
//   const { scene } = useGLTF('./bmw_m4.glb')
//   return <primitive object={ scene } scale={0.01} {...props}/>
// }

// // useFrame(( state )=>{
// //   console.log(state.mouse)
// // })
// // config={{ mass: 1, tension: 170, friction: 26 }}

// export default function Threee() {
//   // const [camera, setcamera] = useState([0, 0, 0])

//   const ifpush = () => {
//     // history.push('./exhibition')
//     console.log('111')
//   }

//   return (
//     //shadows
//     <Canvas dpr={[1,2]} camera={{fov: 45, position: [0, 0, 1]}} onDoubleClick={()=>ifpush()}> 
//       {/* <OrbitControls></OrbitControls> */}
//       <color attach='background' args={['#010101']}/>
//       <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]} > 
//       {/* <PresentationControls speed={1.5} global zoom={6} polar={[-0.01, Math.PI / 2]} rotation={[0, 0, 0]}>  */}
//         <Stage environment='city'>
//           <Model scale={0.01}></Model>
//         </Stage>
//       </PresentationControls>
//     </Canvas>
//   )
// }

import Leftsidea from '@/components/Leftside/leftsidea';
import Leftsideb from '@/components/Leftside/leftsideb';
import Rightsidea from '@/components/Rightside/rightsidea';
import Rightsideb from '@/components/Rightside/rightsideb';
import './index.css'

import { Canvas } from '@react-three/fiber'
import Threee from '@/components/Threee/threee';
import { useEffect, useState } from 'react';
import moment from 'moment'
import Clock from '@/components/Clock';
// import { useGLTF, Stage, PresentationControls } from '@react-three/drei'

// function Model(props: any) {
//   const { scene } = useGLTF('@/assets/bmw.glb')
//   return <primitive object={ scene } scale={0.01} {...props}/>
// }

export default function Three() {
  
  return (
    <div id="container">
      <header>
        <Clock></Clock>
      </header>
      <aside id='left' style={{height: '100%'}}>
        <Leftsidea></Leftsidea>
        <Leftsideb></Leftsideb>
      </aside>
      <main>
        <Threee></Threee>
      </main>
      <aside id='right' style={{height: '100%'}}>
        <Rightsidea></Rightsidea>
        <Rightsideb></Rightsideb>
      </aside>
    </div>
  );
}
