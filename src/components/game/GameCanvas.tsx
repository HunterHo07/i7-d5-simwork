'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface GameCanvasProps {
  onGameReady?: (game: any) => void;
  onPlayerInteraction?: (data: any) => void;
  onQuestStart?: (data: any) => void;
  onQuestComplete?: (data: any) => void;
  className?: string;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  onGameReady,
  onPlayerInteraction,
  onQuestStart,
  onQuestComplete,
  className = '',
}) => {
  const gameRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [gameError, setGameError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    // Initialize Phaser game
    const initializeGame = async () => {
      try {
        // Dynamic import to avoid SSR issues
        const Phaser = await import('phaser');
        const { gameConfig, GAME_EVENTS } = await import('@/lib/phaser/config');

        // Update game config to use the container
        const config = {
          ...gameConfig,
          parent: containerRef.current!,
        };

        // Create the game instance
        const game = new Phaser.Game(config);
        gameRef.current = game;

        // Setup event listeners
        setupGameEventListeners(game, GAME_EVENTS);

        // Notify parent component
        if (onGameReady) {
          onGameReady(game);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize game:', error);
        setGameError('Failed to initialize game. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initializeGame();

    // Cleanup function
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onGameReady]);

  const setupGameEventListeners = (game: any, GAME_EVENTS: any) => {
    // Get the main scene
    const mainScene = game.scene.getScene('MainScene');

    if (mainScene) {
      // Player interaction events
      mainScene.events.on(GAME_EVENTS.PLAYER_INTERACT, (data: any) => {
        if (onPlayerInteraction) {
          onPlayerInteraction(data);
        }
      });

      // Quest events
      mainScene.events.on(GAME_EVENTS.QUEST_START, (data: any) => {
        if (onQuestStart) {
          onQuestStart(data);
        }
      });

      mainScene.events.on(GAME_EVENTS.QUEST_COMPLETE, (data: any) => {
        if (onQuestComplete) {
          onQuestComplete(data);
        }
      });
    }

    // Loading progress events
    const preloadScene = game.scene.getScene('PreloadScene');
    if (preloadScene) {
      preloadScene.load?.on('progress', (progress: number) => {
        setLoadingProgress(Math.round(progress * 100));
      });
    }
  };

  const handleRetry = () => {
    setGameError(null);
    setIsLoading(true);
    window.location.reload();
  };

  if (gameError) {
    return (
      <div className={`flex items-center justify-center bg-game-bg ${className}`}>
        <div className="text-center p-8">
          <div className="text-red-400 text-xl mb-4">⚠️ Game Error</div>
          <p className="text-game-muted mb-6">{gameError}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-game-bg">
          <div className="text-center">
            {/* SimWork Logo */}
            <div className="mb-8">
              <h1 className="text-5xl font-game text-primary-400 mb-2 animate-glow">
                SimWork
              </h1>
              <p className="text-game-muted text-lg">
                The Future of Work Simulation
              </p>
            </div>

            {/* Loading Progress */}
            <div className="w-80 mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">Loading...</span>
                <span className="text-accent-400 text-sm font-mono">
                  {loadingProgress}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-dark-700 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>

              {/* Loading Tips */}
              <div className="text-game-muted text-xs">
                <p className="animate-pulse">
                  Tip: Use WASD or arrow keys to move around the office
                </p>
              </div>
            </div>

            {/* Matrix Effect Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="matrix-rain opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-accent-400 text-xs font-mono animate-matrix-rain"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                  >
                    {Array.from({ length: 10 }).map((_, j) => (
                      <div key={j} className="mb-1">
                        {Math.random() > 0.5 ? '1' : '0'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Container */}
      <div
        ref={containerRef}
        id="game-container"
        className="w-full h-full bg-game-bg"
        style={{ minHeight: '600px' }}
      />

      {/* Game Controls Overlay */}
      {!isLoading && (
        <div className="absolute top-4 right-4 z-40">
          <div className="bg-game-surface/90 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
            <div className="space-y-1">
              <div><kbd className="bg-game-border px-1 rounded">WASD</kbd> Move</div>
              <div><kbd className="bg-game-border px-1 rounded">E</kbd> Interact</div>
              <div><kbd className="bg-game-border px-1 rounded">Q</kbd> Quests</div>
              <div><kbd className="bg-game-border px-1 rounded">C</kbd> Chat</div>
              <div><kbd className="bg-game-border px-1 rounded">M</kbd> Map</div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Monitor (Development Only) */}
      {process.env.NODE_ENV === 'development' && !isLoading && (
        <div className="absolute bottom-4 left-4 z-40">
          <div className="bg-game-surface/90 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
            <div>FPS: <span className="text-accent-400">60</span></div>
            <div>Objects: <span className="text-accent-400">--</span></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook for accessing the game instance
export const useGame = () => {
  const [game, setGame] = useState<any>(null);

  const getMainScene = () => {
    return game?.scene.getScene('MainScene') as any;
  };

  const getUIScene = () => {
    return game?.scene.getScene('UIScene') as any;
  };

  const getPlayer = () => {
    const mainScene = getMainScene();
    return mainScene?.getPlayer();
  };

  const getWorkStations = () => {
    const mainScene = getMainScene();
    return mainScene?.getWorkStations() || [];
  };

  const emitGameEvent = (event: string, data?: any) => {
    const mainScene = getMainScene();
    if (mainScene) {
      mainScene.events.emit(event, data);
    }
  };

  return {
    game,
    setGame,
    getMainScene,
    getUIScene,
    getPlayer,
    getWorkStations,
    emitGameEvent,
  };
};

export default GameCanvas;
