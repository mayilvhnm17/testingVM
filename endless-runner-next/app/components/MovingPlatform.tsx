import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

function MovingPlatform() {
  const ref = useRef()

  // Load texture (optional - add a dirt or road texture for the platform)
  const texture = useLoader(TextureLoader, '/textures/platformTexture.jpg') // Add path to your texture

  // Simulate platform movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.position.z += 0.1
        // Reset platform to create infinite effect
        if (ref.current.position.z > 10) {
          ref.current.position.z = -50
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <mesh ref={ref} position={[0, 0, -5]} scale={[20, 1, 100]}>
      <boxGeometry args={[20, 1, 100]} />
      {/* Add texture or a basic color */}
      <meshStandardMaterial 
        map={texture} // Use the loaded texture
        roughness={0.7} 
        metalness={0.1} 
        color="gray" // fallback color
      />
    </mesh>
  )
}

export default MovingPlatform
