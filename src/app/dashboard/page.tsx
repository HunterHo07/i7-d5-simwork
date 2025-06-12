'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Trophy, Clock, Target, Play, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user is logged in
    const userData = localStorage.getItem('simwork-user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not authenticated
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('simwork-user');
    window.location.href = '/';
  };

  if (!isClient || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-game-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Quests Completed', value: '12', icon: Trophy, color: 'text-accent-400' },
    { label: 'Hours Played', value: '24.5', icon: Clock, color: 'text-primary-400' },
    { label: 'Current Level', value: '8', icon: Target, color: 'text-secondary-400' },
    { label: 'XP Points', value: '2,450', icon: User, color: 'text-warning' },
  ];

  const recentActivities = [
    { action: 'Completed "Advanced Programming" quest', time: '2 hours ago', xp: '+150 XP' },
    { action: 'Started "Design System Creation" quest', time: '1 day ago', xp: '+0 XP' },
    { action: 'Leveled up to Level 8', time: '2 days ago', xp: '+500 XP' },
    { action: 'Completed "User Research" quest', time: '3 days ago', xp: '+120 XP' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {isClient && Array.from({ length: 30 }).map((_, i) => {
            const left = (i * 3.33) % 100;
            const top = (i * 2.7) % 100;
            const delay = (i * 0.2) % 3;

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary-400 rounded-full animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
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

      {/* Logout Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/90 backdrop-blur-sm text-white rounded-lg border border-red-500 hover:border-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-game text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-4">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl text-game-muted">
              Continue your journey in the SimWork universe
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-6 border border-game-border hover:border-primary-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-game-muted">{stat.label}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Continue Playing */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-1 rounded-lg">
              <div className="bg-dark-900/90 backdrop-blur-sm rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Continue Your Adventure</h2>
                <p className="text-game-muted mb-6">
                  Jump back into the SimWork office and continue your current quest.
                </p>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Enter SimWork</span>
                </Link>
              </div>
            </div>

            {/* Profile */}
            <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
              <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-game-muted">Email</label>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-game-muted">Member Since</label>
                  <p className="text-white">{new Date(user.loginTime).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm text-game-muted">Status</label>
                  <p className="text-accent-400">Active Player</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-game-bg/50 rounded-lg border border-game-border"
                >
                  <div>
                    <p className="text-white">{activity.action}</p>
                    <p className="text-sm text-game-muted">{activity.time}</p>
                  </div>
                  <div className="text-accent-400 font-semibold">
                    {activity.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
