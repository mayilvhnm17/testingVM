'use client'
import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import './globals.css'
import CloudBackdrop from './components/CloudBackdrop'
import Game from './components/Game'
import GameUI from './components/GameUI'
import MainMenu from './components/MainMenu'
import GameOver from './components/GameOver'

type GameState = 'menu' | 'playing' | 'gameover'

export default function Runner() {
  const gameRef = useRef<any>(null)
  const [gameState, setGameState] = useState<GameState>('menu')
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Load highscore from localStorage on mount
  useEffect(() => {
    const savedHighscore = localStorage.getItem('endlessRunnerHighscore')
    if (savedHighscore) {
      setHighscore(parseInt(savedHighscore, 10))
    }
  }, [])

  // Poll game state every 100ms
  useEffect(() => {
    if (gameState !== 'playing') return

    const interval = setInterval(() => {
      if (gameRef.current) {
        setScore(gameRef.current.score)
        setIsPaused(gameRef.current.isPaused)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [gameState])

  const handleStartGame = () => {
    setScore(0)
    setIsPaused(false)
    setGameState('playing')
    if (gameRef.current) {
      gameRef.current.resetGame()
    }
  }

  const handleGameOver = () => {
    if (score > highscore) {
      setHighscore(score)
      localStorage.setItem('endlessRunnerHighscore', score.toString())
    }
    setGameState('gameover')
  }

  const handleMainMenu = () => {
    setGameState('menu')
  }

  const handleRestart = () => {
    handleStartGame()
  }

  const handleResetStats = () => {
    setHighscore(0)
    localStorage.removeItem('endlessRunnerHighscore')
  }

  const handlePause = () => {
    if (gameRef.current) {
      gameRef.current.setPaused(true)
      setIsPaused(true)
    }
  }

  const handleResume = () => {
    if (gameRef.current) {
      gameRef.current.setPaused(false)
      setIsPaused(false)
    }
  }

  return (
    <>
      {gameState === 'menu' && (
        <MainMenu 
          highscore={highscore} 
          onStartGame={handleStartGame}
          onResetStats={handleResetStats}
        />
      )}

      {gameState === 'gameover' && (
        <GameOver 
          score={score}
          highscore={highscore}
          isNewHighscore={score >= highscore}
          onMainMenu={handleMainMenu}
          onRestart={handleRestart}
        />
      )}

      {gameState === 'playing' && (
        <>
          <Canvas>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
            {/* Subtle moving cloud background */}
            <CloudBackdrop speed={0.01} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            {/* Game contains player and endless platform logic */}
            <Game ref={gameRef} onGameOver={handleGameOver} />
          </Canvas>

          {/* UI rendered outside Canvas as HTML overlay */}
          <GameUI 
            score={score} 
            highscore={highscore}
            isPaused={isPaused} 
            onPause={handlePause}
            onResume={handleResume}
          />
        </>
      )}
    </>
  )
}
