'use client'
// pages/runner.js
import { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import './globals.css'
import MovingPlatform from './components/MovingPlatform'

export default function Runner() {
  // Character movement state
  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)

  // Platform movement state
  const platformRef = useRef()

  // Handle left/right arrow key movement
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setMoveX((prev) => Math.max(prev - 0.5, -2)); // Move left with bounds
    }
    if (e.key === 'ArrowRight') {
      setMoveX((prev) => Math.min(prev + 0.5, 2)); // Move right with bounds
    }

     if (e.key === 'ArrowUp') {
      setMoveY((prev) => Math.min(prev + 0.5, 2)); // Move up with bounds
    }
     if (e.key === 'ArrowDown') {
      setMoveY((prev) => Math.min(prev - 0.5, -2)); // Move down with bounds
    }
  }

  // Attach event listener for key down
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Canvas>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      <OrbitControls enableZoom={false} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Ground (Endless platform) */}
      <MovingPlatform ref={platformRef} />

      {/* Character */}
      <Character position={[moveX, moveY, 0]} />
    </Canvas>
  )
}

// function MovingPlatform() {
//   const ref = useRef()

//   // Simulate platform movement
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (ref.current) {
//         ref.current.position.z += 0.1
//       }
//     }, 100)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <mesh ref={ref} position={[0, 0, -5]} scale={[2, 1, 100]}>
//       <boxGeometry args={[2, 1, 100]} />
//       <meshStandardMaterial color="green" />
//     </mesh>
//   )
// }

function Character({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  )
}
