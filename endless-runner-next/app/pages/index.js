// pages/index.js
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const RotatingCube = () => {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Home() {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
