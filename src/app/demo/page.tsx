'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Code, Palette, Database, Users, Bot } from 'lucide-react';
import Link from 'next/link';

// Dynamic import to avoid SSR issues with Phaser
const GameCanvas = dynamic(() => import('@/components/game/GameCanvas').then(mod => ({ default: mod.GameCanvas })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-game-bg flex items-center justify-center">
      <div className="text-white text-xl">Loading SimWork Demo...</div>
    </div>
  ),
});

export default function DemoPage() {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const handleGameReady = (game: any) => {
    console.log('Demo game ready:', game);
  };

  const handlePlayerInteraction = (data: any) => {
    console.log('Player interaction in demo:', data);
    if (data.type === 'workstation') {
      setSelectedStation(data.station.stationType);
    }
  };

  const workStations = [
    {
      id: 'developer-desk',
      name: 'Developer Desk',
      icon: Code,
      description: 'Code challenges, debugging, and software development tasks',
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
      borderColor: 'border-primary-500',
    },
    {
      id: 'design-bay',
      name: 'Design Bay',
      icon: Palette,
      description: 'UI/UX design, graphic design, and creative challenges',
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20',
      borderColor: 'border-secondary-500',
    },
    {
      id: 'data-entry-station',
      name: 'Data Entry Station',
      icon: Database,
      description: 'Form processing, data analysis, and quality assurance',
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500',
    },
    {
      id: 'pm-boardroom',
      name: 'PM Boardroom',
      icon: Users,
      description: 'Project management, team coordination, and planning',
      color: 'text-warning',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500',
    },
    {
      id: 'ai-prompt-lab',
      name: 'AI Prompt Lab',
      icon: Bot,
      description: 'AI interaction, prompt engineering, and automation',
      color: 'text-info',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
    },
  ];

  return (
    <div className="w-full h-screen bg-game-bg flex">
      {/* Game Area */}
      <div className="flex-1 relative">
        <GameCanvas
          className="w-full h-full"
          onGameReady={handleGameReady}
          onPlayerInteraction={handlePlayerInteraction}
        />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-game-surface/90 backdrop-blur-sm text-white rounded-lg border border-game-border hover:border-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Demo Instructions */}
        <div className="absolute top-4 right-4 z-50 max-w-sm">
          <div className="bg-game-surface/90 backdrop-blur-sm rounded-lg p-4 border border-game-border">
            <h3 className="text-white font-semibold mb-2">Demo Instructions</h3>
            <div className="text-game-muted text-sm space-y-1">
              <p>• Use <kbd className="bg-game-border px-1 rounded">WASD</kbd> or arrow keys to move</p>
              <p>• Click to move to a location</p>
              <p>• Press <kbd className="bg-game-border px-1 rounded">E</kbd> near work stations to interact</p>
              <p>• Press <kbd className="bg-game-border px-1 rounded">Q</kbd> to view quests</p>
              <p>• Press <kbd className="bg-game-border px-1 rounded">C</kbd> for chat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-80 bg-game-surface border-l border-game-border overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Work Stations</h2>
          
          <div className="space-y-4">
            {workStations.map((station) => {
              const Icon = station.icon;
              const isSelected = selectedStation === station.id;
              
              return (
                <div
                  key={station.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? `${station.bgColor} ${station.borderColor} border-2`
                      : 'bg-game-bg border-game-border hover:border-game-muted'
                  }`}
                  onClick={() => setSelectedStation(station.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${station.color} mt-1`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{station.name}</h3>
                      <p className="text-game-muted text-sm">{station.description}</p>
                      
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-game-border">
                          <div className="text-xs text-game-muted mb-2">Available Quests:</div>
                          <div className="space-y-1">
                            <div className="text-sm text-white">• Fix authentication bug</div>
                            <div className="text-sm text-white">• Implement new feature</div>
                            <div className="text-sm text-white">• Code review task</div>
                          </div>
                          <button className="mt-3 w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded transition-colors">
                            Start Quest
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demo Stats */}
          <div className="mt-8 p-4 bg-game-bg rounded-lg border border-game-border">
            <h3 className="text-white font-semibold mb-3">Demo Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-game-muted">Level</span>
                <span className="text-accent-400">1</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-game-muted">XP</span>
                <span className="text-accent-400">0 / 100</span>
              </div>
              <div className="w-full bg-game-border rounded-full h-2">
                <div className="bg-accent-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-game-muted">Quests Completed</span>
                <span className="text-accent-400">0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-game-muted">Skills Unlocked</span>
                <span className="text-accent-400">0</span>
              </div>
            </div>
          </div>

          {/* Demo Features */}
          <div className="mt-6 p-4 bg-game-bg rounded-lg border border-game-border">
            <h3 className="text-white font-semibold mb-3">Demo Features</h3>
            <div className="space-y-2 text-sm text-game-muted">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>2.5D Isometric Office World</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>Interactive Work Stations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>Real-time Character Movement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>Quest System Framework</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span>UI Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
