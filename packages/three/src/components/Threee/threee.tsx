import React from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls, OrbitControls } from '@react-three/drei'

function Model(props: any) {
  const { scene } = useGLTF('./bmw.glb')
  return <primitive object={ scene } scale={0.01} {...props}/>
}

// useFrame(( state )=>{
//   console.log(state.mouse)
// })

export default function Threee() {
  return (
    //shadows
    <Canvas dpr={[1,2]} camera={{ fov: 45 }} onClick={(e)=>console.log('click')}> 
      {/* <OrbitControls></OrbitControls> */}
      <color attach='background' args={['#FFFFFF']}/>
      <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]} config={{ mass: 1, tension: 170, friction: 26 }}>
        <Stage environment='sunset'>
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
