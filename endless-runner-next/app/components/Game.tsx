import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, RepeatWrapping } from 'three'

type GameHandle = {
  score: number
  isPaused: boolean
  setPaused: (paused: boolean) => void
  resetGame: () => void
}

type GameProps = {
  onGameOver: () => void
}

const Game = forwardRef<GameHandle, GameProps>(({ onGameOver }, ref) => {
  const PLAYER_SPEED = 6 
  const LATERAL_SPEED = 6
  const SEGMENT_COUNT = 10
  const SEGMENT_LENGTH = 20
  const SEGMENT_WIDTH = 20

  const playerRef = useRef<any>(null)
  const segmentRefs = useRef<Array<any>>([])
  const { camera } = useThree()

  const [moveX, setMoveX] = useState(0)
  const [moveY, setMoveY] = useState(0)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scoreTimerRef = useRef<NodeJS.Timeout | null>(null)

  const platformTexture = useLoader(TextureLoader, '/textures/platformTexture.jpg')

  useEffect(() => {
    if (!platformTexture) return
    platformTexture.wrapS = RepeatWrapping
    platformTexture.wrapT = RepeatWrapping
    platformTexture.repeat.set(SEGMENT_WIDTH / 2, SEGMENT_LENGTH / 10)
    platformTexture.anisotropy = 16
    platformTexture.needsUpdate = true
  }, [platformTexture])

  useEffect(() => {
    segmentRefs.current = Array(SEGMENT_COUNT)
      .fill(0)
      .map((_, i) => segmentRefs.current[i] || React.createRef())
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setMoveX((s) => Math.max(s - 1, -3))
      if (e.key === 'ArrowRight') setMoveX((s) => Math.min(s + 1, 3))
      if (e.key === 'ArrowDown') setMoveY((s) => Math.min(s + 1, 3))
      if (e.key === 'ArrowUp') setMoveY((s) => Math.max(s - 1, -3))
      if (e.code === 'Space') {
        e.preventDefault()
        setIsPaused((p) => !p)
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key)) setMoveX(0)
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) setMoveY(0)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    if (segmentRefs.current.length === 0) return
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const ref = segmentRefs.current[i]
      if (ref && ref.current) {
        ref.current.position.set(0, 0, -i * SEGMENT_LENGTH)
      }
    }
  }, [segmentRefs])

  useEffect(() => {
    if (!isPaused) {
      scoreTimerRef.current = setInterval(() => {
        setScore((prev) => prev + 1)
      }, 1000)
    } else {
      if (scoreTimerRef.current) clearInterval(scoreTimerRef.current)
    }
    return () => {
      if (scoreTimerRef.current) clearInterval(scoreTimerRef.current)
    }
  }, [isPaused])

  const handleReset = () => {
    setScore(0)
    setIsPaused(false)
    setMoveX(0)
    setMoveY(0)
    if (playerRef.current) {
      playerRef.current.position.set(0, 1, 0)
    }
    for (let i = 0; i < SEGMENT_COUNT; i++) {
      const ref = segmentRefs.current[i]
      if (ref && ref.current) {
        ref.current.position.set(0, 0, -i * SEGMENT_LENGTH)
      }
    }
  }

  useImperativeHandle(ref, () => ({
    score,
    isPaused,
    setPaused: setIsPaused,
    resetGame: handleReset,
  }))

  useFrame((_, delta) => {
    if (!playerRef.current || isPaused) return

    playerRef.current.position.z -= PLAYER_SPEED * delta
    playerRef.current.position.x += moveX * LATERAL_SPEED * delta
    playerRef.current.position.z -= moveY * LATERAL_SPEED * delta

    playerRef.current.position.x = Math.max(
      -SEGMENT_WIDTH / 2 + 1,
      Math.min(SEGMENT_WIDTH / 2 - 1, playerRef.current.position.x)
    )

    const cameraOffsetX = 0
    const cameraOffsetY = 3
    const cameraOffsetZ = 8
    camera.position.x = playerRef.current.position.x + cameraOffsetX
    camera.position.y = playerRef.current.position.y + cameraOffsetY
    camera.position.z = playerRef.current.position.z + cameraOffsetZ
    camera.lookAt(
      playerRef.current.position.x,
      playerRef.current.position.y,
      playerRef.current.position.z - 5
    )

    // Check if player fell off platform (game over condition)
    if (playerRef.current.position.y < -5) {
      onGameOver()
      return
    }

    let minZ = Infinity
    for (const ref of segmentRefs.current) {
      if (!ref || !ref.current) continue
      minZ = Math.min(minZ, ref.current.position.z)
    }

    for (const ref of segmentRefs.current) {
      if (!ref || !ref.current) continue
      const segZ = ref.current.position.z
      const distanceBehind = segZ - playerRef.current.position.z
      if (distanceBehind > SEGMENT_LENGTH) {
        ref.current.position.z = minZ - SEGMENT_LENGTH
        minZ = ref.current.position.z
      }
    }
  })

  return (
    <group>
      <mesh ref={playerRef} position={[0, 1, 0]}> 
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (segmentRefs.current[i] = { current: el })}
          position={[0, 0, -i * SEGMENT_LENGTH]}
          receiveShadow
        >
          <boxGeometry args={[SEGMENT_WIDTH, 1, SEGMENT_LENGTH]} />
          <meshStandardMaterial map={platformTexture} roughness={0.7} metalness={0.1} />
        </mesh>
      ))}
    </group>
  )
})

Game.displayName = 'Game'
export default Game
