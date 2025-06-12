'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate password reset process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-8 text-center">
          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
            <div className="text-6xl mb-6">📧</div>
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-game-muted mb-8">
              We&apos;ve sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 justify-center text-accent-400">
                <CheckCircle className="w-5 h-5" />
                <span>Reset link sent</span>
              </div>
              <div className="flex items-center gap-3 justify-center text-accent-400">
                <CheckCircle className="w-5 h-5" />
                <span>Check your spam folder</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Back to Login
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-game-surface/80 hover:bg-game-surface text-white font-semibold rounded-lg border border-game-border hover:border-primary-500 transition-all duration-300"
              >
                Try Different Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {isClient && Array.from({ length: 25 }).map((_, i) => {
            const left = (i * 4) % 100;
            const top = (i * 3.2) % 100;
            const delay = (i * 0.2) % 3;

            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-secondary-400 rounded-full animate-pulse"
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
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-game-surface/90 backdrop-blur-sm text-white rounded-lg border border-game-border hover:border-primary-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-game text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 via-accent-400 to-primary-400 mb-2">
                Reset Password
              </h1>
              <p className="text-game-muted">Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-game-muted w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-game-muted text-sm">
                Remember your password?{' '}
                <Link href="/login" className="text-primary-400 hover:text-primary-300 transition-colors font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
