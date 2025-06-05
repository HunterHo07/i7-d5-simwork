'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Play, Users, Trophy, Info, Gamepad2 } from 'lucide-react';

// Dynamic import to avoid SSR issues with Phaser
const GameCanvas = dynamic(() => import('@/components/game/GameCanvas').then(mod => ({ default: mod.GameCanvas })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-game-bg flex items-center justify-center">
      <div className="text-white text-xl">Loading SimWork...</div>
    </div>
  ),
});

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGameReady = (game: Phaser.Game) => {
    console.log('Game ready:', game);
  };

  const handlePlayerInteraction = (data: any) => {
    console.log('Player interaction:', data);
  };

  if (gameStarted) {
    return (
      <div className="w-full h-screen bg-game-bg">
        <GameCanvas
          className="w-full h-full"
          onGameReady={handleGameReady}
          onPlayerInteraction={handlePlayerInteraction}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary-400 animate-pulse"
                style={{
                  animationDelay: `${(i * 0.1) % 3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-accent-400 text-xs font-mono animate-matrix-rain"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              {Array.from({ length: 12 }).map((_, j) => (
                <div key={j} className="mb-1">
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: i % 3 === 0 ? '#0ea5e9' : i % 3 === 1 ? '#d946ef' : '#22c55e',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute border border-secondary-400 opacity-10 animate-spin"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
                animationDuration: `${10 + Math.random() * 20}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative">
            <h1 className="text-8xl font-game text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-6 animate-glow relative z-10">
              SimWork
            </h1>
            {/* Glowing backdrop */}
            <div className="absolute inset-0 text-8xl font-game text-primary-400 opacity-20 blur-sm animate-pulse">
              SimWork
            </div>
          </div>

          <p className="text-3xl text-white mb-4 font-semibold">
            The Future of Work Simulation
          </p>
          <p className="text-xl text-game-muted max-w-3xl mx-auto leading-relaxed">
            Enter a <span className="text-accent-400 font-semibold">2.5D office world</span> inspired by Ragnarok Online.
            Complete <span className="text-primary-400 font-semibold">real work challenges</span>,
            discover <span className="text-secondary-400 font-semibold">talented freelancers</span>, and prove your skills in an immersive gaming environment.
          </p>

          {/* Mini Demo Preview */}
          <div className="mt-8 relative">
            <div className="inline-block bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-lg p-6 border border-primary-500/30">
              <div className="flex items-center gap-4 text-sm text-game-muted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
                  <span>Live Demo Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                  <span>Real 2.5D Game Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
                  <span>Interactive Work Stations</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-6 border border-game-border hover:border-primary-500 transition-colors">
            <div className="text-primary-400 mb-3">
              <Play className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real Work Simulation</h3>
            <p className="text-game-muted">
              Complete actual coding, design, and project management tasks in a gamified environment.
            </p>
          </div>

          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-6 border border-game-border hover:border-secondary-500 transition-colors">
            <div className="text-secondary-400 mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Freelancer Discovery</h3>
            <p className="text-game-muted">
              Find and connect with skilled professionals through their demonstrated work performance.
            </p>
          </div>

          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-6 border border-game-border hover:border-accent-500 transition-colors">
            <div className="text-accent-400 mb-3">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Skill Progression</h3>
            <p className="text-game-muted">
              Earn XP, badges, and unlock new challenges as you master different professional skills.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={handleStartGame}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
          >
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5" />
              <span>Enter SimWork</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-300 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          <Link
            href="/demo"
            className="px-8 py-4 bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-5 h-5" />
              <span>Try Demo</span>
            </div>
          </Link>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="px-8 py-4 bg-game-surface/80 hover:bg-game-surface text-white font-semibold rounded-lg border border-game-border hover:border-primary-500 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5" />
              <span>Learn More</span>
            </div>
          </button>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="max-w-4xl mx-auto bg-game-surface/90 backdrop-blur-sm rounded-lg p-8 border border-game-border animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">How SimWork Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary-400">🎮 Game World</h3>
                <ul className="space-y-2 text-game-muted">
                  <li>• Navigate a 2.5D isometric office environment</li>
                  <li>• Visit different work stations for various challenges</li>
                  <li>• Interact with other players in real-time</li>
                  <li>• Explore and discover new areas and opportunities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-secondary-400">🛠️ Work Stations</h3>
                <ul className="space-y-2 text-game-muted">
                  <li>• <strong>Developer Desk:</strong> Coding challenges and debugging</li>
                  <li>• <strong>Design Bay:</strong> UI/UX and graphic design tasks</li>
                  <li>• <strong>Data Station:</strong> Form processing and analysis</li>
                  <li>• <strong>PM Boardroom:</strong> Project management scenarios</li>
                  <li>• <strong>AI Lab:</strong> Prompt engineering and AI interaction</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-accent-400">🎯 Quest System</h3>
                <ul className="space-y-2 text-game-muted">
                  <li>• AI-generated challenges based on real work scenarios</li>
                  <li>• Difficulty scales with your skill level</li>
                  <li>• Earn XP, badges, and unlock new content</li>
                  <li>• Track your progress and skill development</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-info">👥 Social Features</h3>
                <ul className="space-y-2 text-game-muted">
                  <li>• See other players working in real-time</li>
                  <li>• Discover freelancers based on their performance</li>
                  <li>• Chat and collaborate on challenges</li>
                  <li>• Build your professional network through gameplay</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleStartGame}
                className="px-6 py-3 bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-game-muted text-sm">
          <p>Built with Next.js, Phaser 3, Three.js, and Tailwind CSS</p>
          <p className="mt-2">Experience the future of work assessment and talent discovery</p>
        </div>
      </div>
    </div>
  );
}
