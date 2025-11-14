import React from 'react'

type GameOverProps = {
  score: number
  highscore: number
  isNewHighscore: boolean
  onMainMenu: () => void
  onRestart: () => void
}

export default function GameOver({ score, highscore, isNewHighscore, onMainMenu, onRestart }: GameOverProps) {
  const minutes = Math.floor(score / 60)
  const seconds = Math.floor(score % 60)
  const formattedScore = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  const hsMinutes = Math.floor(highscore / 60)
  const hsSeconds = Math.floor(highscore % 60)
  const formattedHighscore = `${hsMinutes.toString().padStart(2, '0')}:${hsSeconds.toString().padStart(2, '0')}`

  return (
    <div className="game-over">
      <div className="game-over-content">
        <h1>GAME OVER</h1>

        <div className="score-section">
          <div className="final-score">
            <div className="label">Final Score</div>
            <div className="value">{formattedScore}</div>
          </div>
        </div>

        {isNewHighscore && (
          <div className="new-highscore-banner">
            🏆 NEW HIGHSCORE! 🏆
          </div>
        )}

        <div className="highscore-section">
          <div className="label">Highscore</div>
          <div className="value">{formattedHighscore}</div>
        </div>

        <div className="buttons">
          <button className="restart-button" onClick={onRestart}>
            TRY AGAIN
          </button>
          <button className="menu-button" onClick={onMainMenu}>
            MAIN MENU
          </button>
        </div>
      </div>

      <style jsx>{`
        .game-over {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 250;
          backdrop-filter: blur(8px);
        }

        .game-over-content {
          background: linear-gradient(135deg, #1a1a3e 0%, #16213e 100%);
          border: 3px solid #ff006e;
          border-radius: 20px;
          padding: 60px 80px;
          text-align: center;
          box-shadow: 0 0 50px rgba(255, 0, 110, 0.5),
                      inset 0 0 30px rgba(255, 0, 110, 0.1);
        }

        h1 {
          font-size: 64px;
          color: #ff006e;
          margin: 0 0 40px 0;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 20px rgba(255, 0, 110, 0.6);
        }

        .score-section {
          margin: 30px 0;
        }

        .final-score {
          background: rgba(255, 0, 110, 0.1);
          border: 2px solid #ff006e;
          border-radius: 10px;
          padding: 20px;
        }

        .label {
          font-size: 12px;
          color: #ff006e;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .value {
          font-size: 48px;
          color: #ff006e;
          font-weight: bold;
          font-family: 'Courier Prime', monospace;
          text-shadow: 0 0 15px rgba(255, 0, 110, 0.4);
        }

        .new-highscore-banner {
          background: linear-gradient(135deg, #ffd60a 0%, #ffc300 100%);
          color: #1a1a3e;
          padding: 15px 30px;
          border-radius: 8px;
          margin: 30px 0;
          font-size: 24px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 0 30px rgba(255, 211, 0, 0.6);
          animation: pulse 0.6s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .highscore-section {
          background: rgba(0, 217, 255, 0.1);
          border: 2px solid #00d9ff;
          border-radius: 10px;
          padding: 20px;
          margin: 30px 0 40px 0;
        }

        .highscore-section .label {
          color: #00d9ff;
        }

        .highscore-section .value {
          color: #00d9ff;
          text-shadow: 0 0 15px rgba(0, 217, 255, 0.4);
        }

        .buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .restart-button {
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
          flex: 1;
        }

        .restart-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(0, 217, 255, 0.6);
        }

        .restart-button:active {
          transform: scale(0.98);
        }

        .menu-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          flex: 1;
        }

        .menu-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
        }

        .menu-button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}
