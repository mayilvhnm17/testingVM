import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'


function MovingPlatform() {
  const ref = useRef<any>(null)

  // Load texture (optional - add a dirt or road texture for the platform)
  const texture = useLoader(TextureLoader, '/textures/platformTexture.jpg') // Add path to your texture

  // Configure texture so it can repeat (tile) across the platform surface
  useEffect(() => {
    if (!texture) return
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    // Compute repeat based on the platform geometry so the texture isn't
    // overly stretched. These numbers produce roughly square tiles on the
    // top surface for the current platform size (20 x 100).
    const PLATFORM_WIDTH = 20
    const PLATFORM_DEPTH = 100
    // Equalize repeats so tiles are closer to square: width/2 and depth/10 -> 10x10
    texture.repeat.set(10 , 400 )
    // Set a reasonable anisotropy for crisper sampling (16 is often fine).
    // If you want the absolute max, you can set this from the renderer capabilities.
    // texture.anisotropy = gl.capabilities.getMaxAnisotropy()
    texture.anisotropy = 4
    texture.needsUpdate = true
  }, [texture])

  // Simulate platform movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) {
        ref.current.position.z += 0.7
        // Reset platform to create infinite effect
        if (ref.current.position.z > 10) {
          ref.current.position.z = -100
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <mesh ref={ref} position={[0, 0, -5]} scale={[1, 1, 20]}>
      <boxGeometry args={[10, 1, 20]} />
      {/* Add texture or a basic color */}
      <meshStandardMaterial 
        map={texture} // Use the loaded texture
        roughness={0.7} 
        metalness={0.1} 
        color="white" // fallback color
      />
    </mesh>
  )
}

export default MovingPlatform
