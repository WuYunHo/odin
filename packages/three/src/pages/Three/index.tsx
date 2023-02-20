import Leftsidea from '@/components/Leftside/leftsidea';
import Leftsideb from '@/components/Leftside/leftsideb';
import Rightsidea from '@/components/Rightside/rightsidea';
import Rightsideb from '@/components/Rightside/rightsideb';
import './index.css'

import { Canvas } from '@react-three/fiber'
import Threee from '@/components/Threee/threee';
// import { useGLTF, Stage, PresentationControls } from '@react-three/drei'

// function Model(props: any) {
//   const { scene } = useGLTF('@/assets/bmw.glb')
//   return <primitive object={ scene } scale={0.01} {...props}/>
// }

export default function Three() {
  return (
    <div id="container">
      <header></header>
      <aside id='left'>
        <Leftsidea></Leftsidea>
        <Leftsideb></Leftsideb>
      </aside>
      <main>
        <Threee></Threee>
      </main>
      <aside id='right'>
        <Rightsidea></Rightsidea>
        <Rightsideb></Rightsideb>
      </aside>
    </div>
  );
}
