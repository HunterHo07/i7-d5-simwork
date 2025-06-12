'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Clock, Calendar, Zap, Users, Brain, Rocket } from 'lucide-react';

export default function RoadmapPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const roadmapItems = [
    {
      phase: 'Phase 1',
      title: 'MVP Foundation',
      period: 'Q4 2023 - Q1 2024',
      status: 'completed',
      icon: CheckCircle,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/20',
      borderColor: 'border-accent-500',
      items: [
        '✅ 2.5D Game Engine (Phaser 3)',
        '✅ Isometric Office World',
        '✅ Character System & Animations',
        '✅ Interactive Work Stations',
        '✅ Real-time UI System',
        '✅ Responsive Design'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Embedded Tools',
      period: 'Q1 - Q2 2024',
      status: 'in-progress',
      icon: Clock,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/20',
      borderColor: 'border-primary-500',
      items: [
        '🔄 Monaco Editor Integration (VS Code)',
        '🔄 Fabric.js Design Canvas',
        '🔄 Dynamic Form Builder',
        '🔄 AI Chat Interface',
        '⏳ Terminal Emulator',
        '⏳ Browser Simulation'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'AI Quest System',
      period: 'Q2 - Q3 2024',
      status: 'planned',
      icon: Brain,
      color: 'text-secondary-400',
      bgColor: 'bg-secondary-500/20',
      borderColor: 'border-secondary-500',
      items: [
        '📋 AI Quest Generation',
        '📋 Dynamic Difficulty Scaling',
        '📋 Real-time Performance Scoring',
        '📋 Skill Assessment Algorithms',
        '📋 Achievement System',
        '📋 Progress Analytics'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Social Features',
      period: 'Q3 - Q4 2024',
      status: 'planned',
      icon: Users,
      color: 'text-info',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
      items: [
        '📋 Real-time Multiplayer',
        '📋 User Profiles & Portfolios',
        '📋 Freelancer Discovery',
        '📋 Team Collaboration',
        '📋 Chat & Communication',
        '📋 Networking Features'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Enterprise Platform',
      period: 'Q4 2024 - Q1 2025',
      status: 'planned',
      icon: Rocket,
      color: 'text-warning',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500',
      items: [
        '📋 Company Workspaces',
        '📋 Custom Branding',
        '📋 Advanced Analytics',
        '📋 API Integrations',
        '📋 SSO & Security',
        '📋 White-label Solutions'
      ]
    },
    {
      phase: 'Phase 6',
      title: 'Advanced Features',
      period: 'Q1 - Q2 2025',
      status: 'future',
      icon: Zap,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500',
      items: [
        '🔮 VR/AR Support',
        '🔮 Mobile App (React Native)',
        '🔮 AI Coach System',
        '🔮 Blockchain Certifications',
        '🔮 Global Marketplace',
        '🔮 Educational Partnerships'
      ]
    }
  ];

  const milestones = [
    { date: 'Dec 2023', event: 'MVP Demo Complete', status: 'completed' },
    { date: 'Jan 2024', event: 'Seed Funding Round', status: 'completed' },
    { date: 'Mar 2024', event: 'Beta Launch (10 Companies)', status: 'in-progress' },
    { date: 'Jun 2024', event: 'Public Launch', status: 'planned' },
    { date: 'Sep 2024', event: 'Series A Funding', status: 'planned' },
    { date: 'Dec 2024', event: '1000+ Companies', status: 'planned' },
    { date: 'Mar 2025', event: 'International Expansion', status: 'future' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-accent-400';
      case 'in-progress': return 'text-primary-400';
      case 'planned': return 'text-secondary-400';
      case 'future': return 'text-purple-400';
      default: return 'text-game-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planned': return '📋';
      case 'future': return '🔮';
      default: return '⏳';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {isClient && Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-pulse"
              style={{
                left: `${(i * 2.5) % 100}%`,
                top: `${(i * 1.8) % 100}%`,
                animationDelay: `${(i * 0.15) % 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-game-surface/90 backdrop-blur-sm text-white rounded-lg border border-game-border hover:border-primary-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-game text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-6">
              Product Roadmap
            </h1>
            <p className="text-2xl text-game-muted max-w-3xl mx-auto">
              Our journey from MVP to the world&apos;s leading work simulation platform
            </p>
          </div>

          {/* Roadmap Timeline */}
          <section className="mb-20">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`relative ${item.bgColor} backdrop-blur-sm rounded-lg p-8 border ${item.borderColor} transition-all duration-300 hover:scale-[1.02]`}
                  >
                    {/* Phase Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`${item.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{item.phase}: {item.title}</h3>
                        <p className="text-game-muted">{item.period}</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.color} bg-current bg-opacity-20`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Phase Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {item.items.map((feature, idx) => (
                        <div
                          key={idx}
                          className="bg-game-surface/30 backdrop-blur-sm rounded-lg p-4 border border-game-border"
                        >
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                      <div className="w-full bg-game-border rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            item.status === 'completed' ? 'bg-accent-500 w-full' :
                            item.status === 'in-progress' ? 'bg-primary-500 w-1/2' :
                            'bg-game-muted w-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Key Milestones */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Key Milestones</h2>
            <div className="bg-game-surface/30 backdrop-blur-sm rounded-lg p-8 border border-game-border">
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-game-surface/50 rounded-lg"
                  >
                    <div className="text-2xl">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{milestone.event}</span>
                        <span className={`text-sm ${getStatusColor(milestone.status)}`}>
                          {milestone.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="text-game-muted text-sm">
                      {milestone.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1 rounded-2xl max-w-4xl mx-auto">
              <div className="bg-dark-900/90 backdrop-blur-sm rounded-2xl p-12">
                <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
                <p className="text-xl text-game-muted mb-8 max-w-2xl mx-auto">
                  Be part of the revolution in work assessment and talent discovery. Experience the future today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/demo"
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Try Demo Now
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-8 py-4 bg-game-surface/80 hover:bg-game-surface text-white font-semibold rounded-lg border border-game-border hover:border-primary-500 transition-all duration-300"
                  >
                    Get Early Access
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
