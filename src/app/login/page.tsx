'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (formData.email === 'demo@simwork.com' && formData.password === 'demo123') {
        // Store login state
        localStorage.setItem('simwork-user', JSON.stringify({
          email: formData.email,
          name: 'Demo User',
          loginTime: new Date().toISOString()
        }));
        
        // Redirect to demo
        window.location.href = '/demo';
      } else {
        setError('Invalid credentials. Try demo@simwork.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-game text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-2">
                Welcome Back
              </h1>
              <p className="text-game-muted">Sign in to your SimWork account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Demo Credentials */}
            <div className="mb-6 p-4 bg-primary-500/20 border border-primary-500/50 rounded-lg">
              <h3 className="text-sm font-semibold text-primary-400 mb-2">Demo Credentials</h3>
              <p className="text-xs text-game-muted">Email: demo@simwork.com</p>
              <p className="text-xs text-game-muted">Password: demo123</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-game-muted w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-game-muted w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-game-muted hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 bg-game-bg border-game-border rounded focus:ring-primary-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-game-muted">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-game-muted text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/sign-up" className="text-primary-400 hover:text-primary-300 transition-colors font-semibold">
                  Sign up for free
                </Link>
              </p>
            </div>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-game-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-game-surface text-game-muted">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-game-border rounded-lg bg-game-bg hover:bg-game-surface transition-colors">
                  <span className="text-sm font-medium text-white">Google</span>
                </button>
                <button className="w-full inline-flex justify-center py-3 px-4 border border-game-border rounded-lg bg-game-bg hover:bg-game-surface transition-colors">
                  <span className="text-sm font-medium text-white">GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
