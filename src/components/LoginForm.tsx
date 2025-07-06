'use client';

import { useState } from 'react';
import { LoginCredentials, ApiResponse } from '@/types';

interface LoginFormProps {
  level: number;
  title: string;
  description: string;
  onSubmit: (credentials: LoginCredentials) => Promise<ApiResponse>;
  hints: string[];
  isVulnerable?: boolean;
}

export default function LoginForm({ 
  level, 
  title, 
  description, 
  onSubmit, 
  hints, 
  isVulnerable = true 
}: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showPayloads, setShowPayloads] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const result = await onSubmit(credentials);
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: 'Network error occurred'
      });
    } finally {
      setLoading(false);
    }
  };

  const commonPayloads = [
    "' OR '1'='1' --",
    "' OR 1=1 --",
    "admin' --",
    "' UNION SELECT username, password FROM users --",
    "' OR username='admin' --",
    "1' OR '1'='1",
    "'; DROP TABLE users; --",
    "' OR SLEEP(5) --"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Level Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
          Level {level}: {title}
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <div className="vulnerability-card rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-cyber-blue">
            🔐 Login Portal
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg 
                         text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none
                         focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                placeholder="Enter username..."
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 bg-black/50 border border-cyber-blue/30 rounded-lg 
                         text-white placeholder-gray-500 focus:border-cyber-blue focus:outline-none
                         focus:ring-2 focus:ring-cyber-blue/20 transition-all duration-300"
                placeholder="Enter password..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cyber-button py-3 rounded-lg font-semibold transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                  Authenticating...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Response Display */}
          {response && (
            <div className={`mt-6 p-4 rounded-lg border ${
              response.success 
                ? 'bg-cyber-green/10 border-cyber-green/30 text-cyber-green' 
                : 'bg-cyber-red/10 border-cyber-red/30 text-cyber-red'
            }`}>
              <h3 className="font-semibold mb-2">
                {response.success ? '✅ Success' : '❌ Error'}
              </h3>
              <p className="text-sm">
                {response.message || response.error}
              </p>
              {response.data && (
                <pre className="mt-3 text-xs bg-black/30 p-3 rounded border overflow-x-auto">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Hints and Tools */}
        <div className="space-y-6">
          {/* Hints Section */}
          <div className="vulnerability-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-cyber-green">💡 Hints</h3>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-cyber-blue hover:text-cyber-green transition-colors duration-300"
              >
                {showHints ? 'Hide' : 'Show'} Hints
              </button>
            </div>
            
            {showHints && (
              <div className="space-y-3">
                {hints.map((hint, index) => (
                  <div key={index} className="text-sm text-gray-300 p-3 bg-black/30 rounded border-l-4 border-cyber-green">
                    <span className="text-cyber-green font-semibold">Hint {index + 1}:</span> {hint}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Common Payloads */}
          {isVulnerable && (
            <div className="vulnerability-card rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-cyber-purple">🎯 Common Payloads</h3>
                <button
                  onClick={() => setShowPayloads(!showPayloads)}
                  className="text-cyber-blue hover:text-cyber-purple transition-colors duration-300"
                >
                  {showPayloads ? 'Hide' : 'Show'} Payloads
                </button>
              </div>
              
              {showPayloads && (
                <div className="space-y-2">
                  {commonPayloads.map((payload, index) => (
                    <div 
                      key={index}
                      className="code-block text-sm cursor-pointer hover:bg-gray-800/50 transition-colors duration-300"
                      onClick={() => {
                        setCredentials({ ...credentials, username: payload, password: 'anything' });
                      }}
                      title="Click to use this payload"
                    >
                      {payload}
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-3">
                    💡 Click on any payload to automatically fill the username field
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Challenge Info */}
          <div className="vulnerability-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-cyber-blue mb-4">🎯 Challenge Objective</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <span className="text-cyber-green font-semibold">Goal:</span> Successfully bypass the login authentication
              </p>
              <p>
                <span className="text-cyber-green font-semibold">Method:</span> Exploit SQL injection vulnerabilities
              </p>
              <p>
                <span className="text-cyber-green font-semibold">Success:</span> Gain unauthorized access to the system
              </p>
            </div>
          </div>

          {/* Level Navigation */}
          <div className="vulnerability-card rounded-lg p-6">
            <h3 className="text-xl font-semibold text-cyber-blue mb-4">🚀 Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {[1,2,3,4,5,6,7,8].map((levelNum) => (
                <a
                  key={levelNum}
                  href={`/level${levelNum}`}
                  className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
                    levelNum === level
                      ? 'bg-cyber-blue text-black font-semibold'
                      : 'bg-cyber-blue/20 text-cyber-blue hover:bg-cyber-blue/30'
                  }`}
                >
                  Level {levelNum}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
