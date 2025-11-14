import React from 'react'

type MainMenuProps = {
  highscore: number
  onStartGame: () => void
  onResetStats: () => void
}

export default function MainMenu({ highscore, onStartGame, onResetStats }: MainMenuProps) {
  return (
    <div className="main-menu">
      <div className="menu-container">
        <h1 className="title">ENDLESS RUNNER</h1>
        
        <div className="highscore-display">
          <div className="highscore-label">HIGHSCORE</div>
          <div className="highscore-value">
            {Math.floor(highscore / 60).toString().padStart(2, '0')}:
            {(highscore % 60).toString().padStart(2, '0')}
          </div>
        </div>

        <div className="menu-buttons">
          <button className="start-button" onClick={onStartGame}>
            START GAME
          </button>
          <button className="reset-button" onClick={onResetStats}>
            RESET STATS
          </button>
        </div>

        <div className="controls-info">
          <p>← → UP DOWN - Move</p>
          <p>SPACE - Pause/Resume</p>
        </div>
      </div>

      <style jsx>{`
        .main-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 300;
        }

        .menu-container {
          text-align: center;
          background: rgba(20, 20, 40, 0.9);
          border: 3px solid #00d9ff;
          border-radius: 20px;
          padding: 80px 100px;
          box-shadow: 0 0 50px rgba(0, 217, 255, 0.4),
                      inset 0 0 30px rgba(0, 217, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .title {
          font-size: 72px;
          font-weight: 900;
          color: #00d9ff;
          margin: 0 0 60px 0;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 30px rgba(0, 217, 255, 0.6),
                       0 0 60px rgba(0, 217, 255, 0.3);
          font-family: 'Orbitron', sans-serif;
        }

        .highscore-display {
          background: rgba(0, 217, 255, 0.1);
          border: 2px solid #00ff88;
          border-radius: 10px;
          padding: 20px 30px;
          margin: 0 0 50px 0;
        }

        .highscore-label {
          font-size: 12px;
          color: #00ff88;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-weight: bold;
        }

        .highscore-value {
          font-size: 42px;
          color: #00ff88;
          font-weight: bold;
          font-family: 'Courier Prime', monospace;
          text-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
        }

        .menu-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin: 50px 0 50px 0;
        }

        .start-button {
          background: linear-gradient(135deg, #00d9ff 0%, #00ff88 100%);
          color: #1a1a3e;
          border: none;
          padding: 18px 50px;
          border-radius: 10px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
          flex: 1;
        }

        .start-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(0, 217, 255, 0.6);
        }

        .start-button:active {
          transform: scale(0.98);
        }

        .reset-button {
          background: linear-gradient(135deg, #ff006e 0%, #d80044 100%);
          color: white;
          border: none;
          padding: 18px 50px;
          border-radius: 10px;
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 4px 20px rgba(255, 0, 110, 0.4);
          flex: 1;
        }

        .reset-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 30px rgba(255, 0, 110, 0.6);
        }

        .reset-button:active {
          transform: scale(0.98);
        }

        .controls-info {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 1px solid rgba(0, 217, 255, 0.3);
        }

        .controls-info p {
          color: #00d9ff;
          font-size: 14px;
          margin: 8px 0;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  )
}
