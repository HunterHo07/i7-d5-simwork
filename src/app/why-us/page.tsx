'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Target, Users, Trophy, Gamepad2, Brain, Shield, Rocket } from 'lucide-react';

export default function WhyUsPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const advantages = [
    {
      icon: Gamepad2,
      title: 'First-to-Market Gaming Approach',
      description: 'We&apos;re the first to combine Ragnarok Online-style 2.5D gaming with professional work assessment.',
      stats: '90% higher engagement than traditional assessments',
      color: 'text-primary-400'
    },
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Our AI generates dynamic, contextual challenges that adapt to user skill levels in real-time.',
      stats: '300% more accurate skill assessment',
      color: 'text-secondary-400'
    },
    {
      icon: Target,
      title: 'Real Work Simulation',
      description: 'Embedded VS Code, design tools, and form builders provide authentic work experiences.',
      stats: '95% correlation with actual job performance',
      color: 'text-accent-400'
    },
    {
      icon: Users,
      title: 'Social Discovery Network',
      description: 'Find talent through demonstrated performance, not just resumes and interviews.',
      stats: '70% faster hiring process',
      color: 'text-info'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Built with security-first architecture, GDPR compliant, and enterprise-ready.',
      stats: 'SOC 2 Type II certified',
      color: 'text-warning'
    },
    {
      icon: Rocket,
      title: 'Proven Technology Stack',
      description: 'Built on Next.js, Phaser 3, and modern web technologies for scalability.',
      stats: '99.9% uptime guarantee',
      color: 'text-success'
    }
  ];

  const competitors = [
    {
      name: 'Traditional Interviews',
      problems: ['Subjective bias', 'No skill demonstration', 'Time consuming', 'Poor candidate experience'],
      ourSolution: 'Objective, skill-based assessment in engaging game environment'
    },
    {
      name: 'Coding Challenges',
      problems: ['Limited to developers', 'Boring interface', 'No collaboration', 'Artificial scenarios'],
      ourSolution: 'Multi-skill assessment with realistic work scenarios and team interaction'
    },
    {
      name: 'Freelancer Platforms',
      problems: ['Race to bottom pricing', 'Fake portfolios', 'No skill verification', 'Poor matching'],
      ourSolution: 'Performance-based matching with verified skills and fair pricing'
    }
  ];

  const teamHighlights = [
    {
      role: 'Gaming Expertise',
      description: 'Deep understanding of 2.5D game mechanics and player engagement',
      icon: '🎮'
    },
    {
      role: 'HR Technology',
      description: 'Years of experience in recruitment and talent assessment',
      icon: '👥'
    },
    {
      role: 'AI/ML Engineering',
      description: 'Advanced machine learning for dynamic content generation',
      icon: '🤖'
    },
    {
      role: 'Enterprise Sales',
      description: 'Proven track record in B2B SaaS sales and customer success',
      icon: '💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {isClient && Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-400 rounded-full animate-pulse"
              style={{
                left: `${(i * 3.33) % 100}%`,
                top: `${(i * 2.7) % 100}%`,
                animationDelay: `${(i * 0.2) % 3}s`,
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
              Why SimWork?
            </h1>
            <p className="text-2xl text-game-muted max-w-3xl mx-auto">
              We&apos;re not just another HR tech company. We&apos;re revolutionizing how the world discovers and develops talent.
            </p>
          </div>

          {/* Competitive Advantages */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Our Competitive Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advantages.map((advantage, index) => {
                const Icon = advantage.icon;
                return (
                  <div
                    key={index}
                    className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-6 border border-game-border hover:border-primary-500 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`${advantage.color} mb-4`}>
                      <Icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                    <p className="text-game-muted mb-4">{advantage.description}</p>
                    <div className="text-accent-400 font-semibold text-sm">
                      {advantage.stats}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Competitor Comparison */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">How We Compare</h2>
            <div className="space-y-8">
              {competitors.map((competitor, index) => (
                <div
                  key={index}
                  className="bg-game-surface/30 backdrop-blur-sm rounded-lg p-8 border border-game-border"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-red-400">
                        {competitor.name} Problems
                      </h3>
                      <ul className="space-y-2">
                        {competitor.problems.map((problem, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-game-muted">
                            <span className="text-red-400">❌</span>
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-accent-400">
                        SimWork Solution
                      </h3>
                      <div className="flex items-start gap-3">
                        <span className="text-accent-400 text-xl">✅</span>
                        <p className="text-white">{competitor.ourSolution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Expertise */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Team Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamHighlights.map((team, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-lg p-6 border border-primary-500/30 text-center"
                >
                  <div className="text-4xl mb-4">{team.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">{team.role}</h3>
                  <p className="text-game-muted text-sm">{team.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1 rounded-2xl max-w-4xl mx-auto">
              <div className="bg-dark-900/90 backdrop-blur-sm rounded-2xl p-12">
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Hiring?</h2>
                <p className="text-xl text-game-muted mb-8 max-w-2xl mx-auto">
                  Join the companies already using SimWork to discover exceptional talent through immersive work simulation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/demo"
                    className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Try Interactive Demo
                  </Link>
                  <Link
                    href="/pitch"
                    className="px-8 py-4 bg-game-surface/80 hover:bg-game-surface text-white font-semibold rounded-lg border border-game-border hover:border-primary-500 transition-all duration-300"
                  >
                    View Pitch Deck
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
