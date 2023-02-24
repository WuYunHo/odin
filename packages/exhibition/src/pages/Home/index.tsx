import ReactDOM from 'react-dom'
import { Suspense } from 'react'
import './styles.css'
import { ExApp } from '@/components/Guide/three/App';

export default function index() {
  return (
    <>
      <Suspense fallback={null}>
        <ExApp></ExApp>
      </Suspense>
    </>
  )
}

