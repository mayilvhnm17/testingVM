import React from 'react'

type GameUIProps = {
  score: number
  highscore: number
  isPaused: boolean
  onPause: () => void
  onResume: () => void
}

export default function GameUI({ score, highscore, isPaused, onPause, onResume }: GameUIProps) {
  const minutes = Math.floor(score / 60)
  const seconds = Math.floor(score % 60)
  const formattedScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const hsMinutes = Math.floor(highscore / 60)
  const hsSeconds = Math.floor(highscore % 60)
  const formattedHighscore = `${hsMinutes.toString().padStart(2, '0')}:${hsSeconds.toString().padStart(2, '0')}`

  return (
    <div className="game-ui">
      {/* Score/Timer Display */}
      <div className="score-display">
        <div className="score-label">Time</div>
        <div className="score-value">{formattedScore}</div>
      </div>

      {/* Highscore Display */}
      <div className="highscore-display">
        <div className="score-label">Highscore</div>
        <div className="score-value">{formattedHighscore}</div>
      </div>

      {/* Pause Button */}
      <button 
        className="pause-button" 
        onClick={isPaused ? onResume : onPause}
      >
        {isPaused ? '▶ Resume' : '⏸ Pause'}
      </button>

      {/* Pause Screen Modal */}
      {isPaused && (
        <div className="pause-modal">
          <div className="pause-content">
            <h1>PAUSED</h1>
            <p className="pause-time">Time: {formattedScore}</p>
            <button className="resume-button" onClick={onResume}>
              Resume Game
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .game-ui {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
        }

        .score-display {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(20, 20, 40, 0.85);
          border: 2px solid #00d9ff;
          border-radius: 10px;
          padding: 20px 30px;
          pointer-events: auto;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
        }

        .highscore-display {
          position: fixed;
          top: 20px;
          left: 280px;
          background: rgba(20, 20, 40, 0.85);
          border: 2px solid #00ff88;
          border-radius: 10px;
          padding: 20px 30px;
          pointer-events: auto;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }

        .score-label {
          font-size: 12px;
          color: #00d9ff;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .highscore-display .score-label {
          color: #00ff88;
        }

        .score-value {
          font-size: 36px;
          color: #00ff88;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        .highscore-display .score-value {
          color: #00ff88;
        }

        .pause-button {
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pause-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }

        .pause-button:active {
          transform: translateY(0);
        }

        .pause-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          z-index: 200;
          backdrop-filter: blur(5px);
        }

        .pause-content {
          background: linear-gradient(135deg, #1a1a3e 0%, #16213e 100%);
          border: 3px solid #00d9ff;
          border-radius: 20px;
          padding: 60px 80px;
          text-align: center;
          box-shadow: 0 0 40px rgba(0, 217, 255, 0.5),
                      inset 0 0 20px rgba(0, 217, 255, 0.1);
        }

        .pause-content h1 {
          font-size: 64px;
          color: #00d9ff;
          margin: 0 0 30px 0;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
        }

        .pause-time {
          font-size: 28px;
          color: #00ff88;
          margin: 0 0 40px 0;
          font-family: 'Courier New', monospace;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
        }

        .resume-button {
          background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
          color: #1a1a3e;
          border: none;
          padding: 16px 40px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
        }

        .resume-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(0, 217, 255, 0.6);
        }

        .resume-button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}
