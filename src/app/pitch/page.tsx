'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Play, TrendingUp, Users, Target, Zap, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export default function PitchPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const slides = [
    {
      id: 'title',
      title: 'SimWork',
      subtitle: 'The Future of Work Assessment',
      content: 'Revolutionizing talent discovery through immersive 2.5D gaming',
      icon: '🎮',
      gradient: 'from-primary-600 to-secondary-600'
    },
    {
      id: 'problem',
      title: 'The Problem',
      subtitle: 'Traditional hiring is broken',
      content: [
        '70% of hiring managers find interviews unreliable',
        'Remote work makes skill assessment harder',
        'Freelancer discovery lacks quality metrics',
        'No engaging way to demonstrate real skills'
      ],
      icon: '⚠️',
      gradient: 'from-red-600 to-orange-600'
    },
    {
      id: 'solution',
      title: 'Our Solution',
      subtitle: 'Gamified Work Simulation',
      content: [
        '2.5D office world inspired by Ragnarok Online',
        'Real embedded tools (VS Code, Design Canvas)',
        'AI-generated work challenges',
        'Performance-based talent discovery'
      ],
      icon: '💡',
      gradient: 'from-accent-600 to-primary-600'
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      subtitle: '$240B Global Recruitment Market',
      content: [
        'HR Tech: $30B and growing 12% annually',
        'Freelancer Economy: $400B by 2025',
        'Gamification Market: $30B by 2025',
        'Remote Work: 42% of workforce'
      ],
      icon: '📈',
      gradient: 'from-green-600 to-blue-600'
    },
    {
      id: 'demo',
      title: 'Live Demo',
      subtitle: 'Experience SimWork',
      content: 'See our 2.5D office simulation in action',
      icon: '🎯',
      gradient: 'from-purple-600 to-pink-600',
      isDemo: true
    },
    {
      id: 'business',
      title: 'Business Model',
      subtitle: 'Multiple Revenue Streams',
      content: [
        'SaaS Subscriptions: $50-500/month per company',
        'Freelancer Marketplace: 5% transaction fee',
        'Enterprise Licensing: $10K-100K annually',
        'Assessment Certifications: $99 per certificate'
      ],
      icon: '💰',
      gradient: 'from-yellow-600 to-green-600'
    },
    {
      id: 'traction',
      title: 'Traction & Roadmap',
      subtitle: 'Ready for Scale',
      content: [
        'MVP: Fully functional 2.5D game engine ✅',
        'Q1 2024: Beta launch with 10 companies',
        'Q2 2024: Freelancer marketplace launch',
        'Q3 2024: AI-powered skill matching'
      ],
      icon: '🚀',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 'ask',
      title: 'Investment Ask',
      subtitle: '$2M Seed Round',
      content: [
        '60% Product Development & Engineering',
        '25% Marketing & Customer Acquisition',
        '10% Operations & Legal',
        '5% Working Capital'
      ],
      icon: '🎯',
      gradient: 'from-primary-600 to-accent-600'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {isClient && Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full animate-pulse"
              style={{
                left: `${(i * 2) % 100}%`,
                top: `${(i * 1.7) % 100}%`,
                animationDelay: `${(i * 0.1) % 3}s`,
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

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-50">
        <div className="bg-game-surface/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-game-border">
          <span className="text-sm text-game-muted">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className={`w-full max-w-6xl mx-auto text-center transition-all duration-500 transform`}>
          {/* Slide Content */}
          <div className={`bg-gradient-to-br ${currentSlideData.gradient} p-1 rounded-2xl mb-8`}>
            <div className="bg-dark-900/90 backdrop-blur-sm rounded-2xl p-12">
              {/* Icon */}
              <div className="text-8xl mb-6">{currentSlideData.icon}</div>
              
              {/* Title */}
              <h1 className="text-6xl font-game text-white mb-4">
                {currentSlideData.title}
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-2xl text-game-muted mb-8">
                {currentSlideData.subtitle}
              </h2>
              
              {/* Content */}
              <div className="text-xl text-white">
                {Array.isArray(currentSlideData.content) ? (
                  <ul className="space-y-4 text-left max-w-3xl mx-auto">
                    {currentSlideData.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-accent-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : currentSlideData.isDemo ? (
                  <div className="space-y-6">
                    <p className="text-xl mb-6">{currentSlideData.content}</p>
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Play className="w-5 h-5" />
                      <span>Launch Interactive Demo</span>
                    </Link>
                  </div>
                ) : (
                  <p className="text-xl">{currentSlideData.content}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="p-3 bg-game-surface/80 hover:bg-game-surface text-white rounded-full border border-game-border hover:border-primary-500 transition-colors"
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide
                    ? 'bg-primary-500'
                    : 'bg-game-border hover:bg-game-muted'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 bg-game-surface/80 hover:bg-game-surface text-white rounded-full border border-game-border hover:border-primary-500 transition-colors"
            disabled={currentSlide === slides.length - 1}
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Keyboard Instructions */}
        <div className="mt-8 text-center text-game-muted text-sm">
          <p>Use arrow keys or click to navigate • Press ESC to exit</p>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="hidden">
        <input
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' && currentSlide < slides.length - 1) nextSlide();
            if (e.key === 'ArrowLeft' && currentSlide > 0) prevSlide();
            if (e.key === 'Escape') window.history.back();
          }}
          className="opacity-0 absolute"
        />
      </div>
    </div>
  );
}
