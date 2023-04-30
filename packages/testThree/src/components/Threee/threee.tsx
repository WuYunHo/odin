import React, { useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'
import { history } from '@umijs/max'
import { message } from 'antd'

function Model(props: any) {
  const { scene } = useGLTF('./newshenda.glb')
  return <primitive object={ scene } scale={0.01} {...props}/>
}

// useFrame(( state )=>{
//   console.log(state.mouse)
// })
// config={{ mass: 1, tension: 170, friction: 26 }}

export default function Threee() {
  // const [camera, setcamera] = useState([0, 0, 0])

  const ifpush = () => {
    // history.push('./exhibition')
    message.info('点击"校园展示"以了解更多');
  }

  return (
    //shadows
    <Canvas dpr={[1,2]} camera={{fov: 45, position: [0, 0, 1]}} onDoubleClick={()=>ifpush()}> 
      {/* <OrbitControls></OrbitControls> */}
      <color attach='background' args={['#FFFFFF']}/>
      {/* <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]} >  */}
      <PresentationControls speed={1.5} global zoom={6} polar={[-0.01, Math.PI / 4]} rotation={[0, 0, 0]}> 
        <Stage environment='city'>
          <Model scale={0.01}></Model>
        </Stage>
      </PresentationControls>
      {/* <OrbitControls>
        <Stage environment='city'>
          <Model scale={0.01}></Model>
        </Stage>
      </OrbitControls> */}
      {/* <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} /> */}
      {/* <Model scale={0.1}></Model> */}
      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </Canvas>
  )
}
