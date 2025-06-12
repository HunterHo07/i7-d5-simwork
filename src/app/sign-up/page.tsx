'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, User, Building, Users, CheckCircle, Zap } from 'lucide-react';

export default function SignUpPage() {
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    useCase: '',
    newsletter: true
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    
    // Store in localStorage for demo purposes
    localStorage.setItem('simwork-signup', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString()
    }));
    
    setIsSubmitted(true);
  };

  const benefits = [
    {
      icon: Zap,
      title: 'Early Access',
      description: 'Be among the first to experience SimWork beta'
    },
    {
      icon: Users,
      title: 'Priority Support',
      description: 'Direct line to our team for feedback and assistance'
    },
    {
      icon: CheckCircle,
      title: 'Free Beta Period',
      description: 'Full access to all features during beta testing'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <div className="bg-gradient-to-r from-accent-600 to-primary-600 p-1 rounded-2xl">
            <div className="bg-dark-900/90 backdrop-blur-sm rounded-2xl p-12">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-4xl font-bold mb-6">Welcome to SimWork!</h1>
              <p className="text-xl text-game-muted mb-8">
                Thank you for signing up! We&apos;ll be in touch soon with your early access invitation.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 justify-center text-accent-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirmation email sent</span>
                </div>
                <div className="flex items-center gap-3 justify-center text-accent-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Added to beta waitlist</span>
                </div>
                <div className="flex items-center gap-3 justify-center text-accent-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Priority support activated</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Try Demo Now
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-game-surface/80 hover:bg-game-surface text-white font-semibold rounded-lg border border-game-border hover:border-primary-500 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
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
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div>
              <h1 className="text-5xl font-game text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-6">
                Join SimWork Beta
              </h1>
              <p className="text-xl text-game-muted mb-8">
                Get early access to the future of work assessment and talent discovery.
              </p>

              <div className="space-y-6 mb-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-primary-400 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-game-muted">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-lg p-6 border border-primary-500/30">
                <h3 className="text-lg font-semibold mb-2">Limited Beta Spots</h3>
                <p className="text-game-muted text-sm">
                  We&apos;re accepting only 100 companies for our initial beta. Sign up now to secure your spot.
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-game-surface/50 backdrop-blur-sm rounded-lg p-8 border border-game-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-game-muted w-5 h-5" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
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

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-game-muted w-5 h-5" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                  >
                    <option value="">Select your role</option>
                    <option value="hr-manager">HR Manager</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="ceo-founder">CEO/Founder</option>
                    <option value="talent-acquisition">Talent Acquisition</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium mb-2">
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white"
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="useCase" className="block text-sm font-medium mb-2">
                    Primary Use Case
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-game-bg border border-game-border rounded-lg focus:border-primary-500 focus:outline-none text-white resize-none"
                    placeholder="How do you plan to use SimWork?"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 bg-game-bg border-game-border rounded focus:ring-primary-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-game-muted">
                    Subscribe to product updates and beta announcements
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Join Beta Waitlist
                </button>

                <p className="text-xs text-game-muted text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
