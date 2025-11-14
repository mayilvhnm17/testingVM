import { useRef, useEffect } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping, DoubleSide } from 'three'

type Props = {
  speed?: number // how fast the clouds drift
}

export default function CloudBackdrop({ speed = 0.01 }: Props) {
  const texture = useLoader(TextureLoader, '/textures/cloudTexture.jpg')
  const meshRef = useRef<any>(null)
  const { camera } = useThree()

  useEffect(() => {
    if (!texture) return
    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.repeat.set(1, 1)
    texture.anisotropy = 4
    texture.needsUpdate = true
  }, [texture])

  // Animate texture offset for a subtle movement and attach to camera
  useFrame((_, delta) => {
    if (!texture) return
    texture.offset.x = (texture.offset.x + delta * speed) % 1

    // Attach backdrop to camera so it always moves with the view
    if (meshRef.current) {
      meshRef.current.position.copy(camera.position)
      meshRef.current.position.z -= 100 // Keep it far behind camera
    }
  })

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[1000, 800]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={0.95}
        side={DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}
