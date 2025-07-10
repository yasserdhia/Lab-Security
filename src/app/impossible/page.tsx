'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ImpossibleLevel() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; user?: { username: string } } | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/impossible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Network error:', error);
      setResult({ success: false, message: 'Network error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🔒 Impossible Level - Maximum Security
          </h1>
          <p className="text-green-700 text-lg max-w-3xl mx-auto">
            This level implements the highest security standards and is completely immune to SQL injection attacks.
            It demonstrates proper secure coding practices that should be used in production applications.
          </p>
        </div>

        {/* Security Features Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">🛡️ Security Features Implemented</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Parameterized Queries (No String Concatenation)</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Input Validation & Sanitization</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>SQL Pattern Detection & Blocking</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Secure Password Hashing (bcrypt)</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Generic Error Messages</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Timing Attack Prevention</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Username Enumeration Protection</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Secure Connection Management</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>Comprehensive Error Handling</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-2">✅</span>
                <span>No Rate Limiting (Per Requirement)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">Test Login (Impossible to Exploit)</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {loading ? 'Testing...' : 'Test Login'}
            </button>
          </form>

          {result && (
            <div className={`mt-6 p-4 rounded-md ${
              result.success 
                ? 'bg-green-100 border border-green-300' 
                : 'bg-red-100 border border-red-300'
            }`}>
              <h3 className={`font-semibold ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? 'Success!' : 'Authentication Failed'}
              </h3>
              <p className={`mt-2 ${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>
              {result.user && (
                <p className="mt-2 text-green-700">
                  Welcome back, {result.user.username}!
                </p>
              )}
            </div>
          )}
        </div>

        {/* Testing Suggestions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">🧪 Try These Attack Vectors</h2>
          <p className="text-gray-700 mb-4">
            This level is designed to be completely secure. Try any of these common SQL injection attacks - they will all fail:
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Username Field Attacks:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>' OR '1'='1' --</code></li>
                <li>• <code>' UNION SELECT * FROM users --</code></li>
                <li>• <code>admin'; DROP TABLE users; --</code></li>
                <li>• <code>' OR 1=1 /*</code></li>
                <li>• <code>1' OR '1'='1</code></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Password Field Attacks:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code>' OR '1'='1' --</code></li>
                <li>• <code>') OR ('1'='1</code></li>
                <li>• <code>' OR 1=1#</code></li>
                <li>• <code>anything' OR 'x'='x</code></li>
                <li>• <code>' UNION SELECT password FROM users --</code></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-green-800 font-medium">
              💡 None of these attacks will work because this level uses:
            </p>
            <ul className="text-green-700 text-sm mt-2 space-y-1">
              <li>• Parameterized queries that completely separate code from data</li>
              <li>• Input validation that blocks malicious patterns</li>
              <li>• Proper error handling that doesn't leak information</li>
              <li>• Secure authentication with proper password hashing</li>
            </ul>
          </div>
        </div>

        {/* Valid Credentials */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">✅ Valid Test Credentials</h2>
          <p className="text-gray-700 mb-4">Use these credentials to test legitimate login functionality:</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-800">Admin User</h3>
              <p className="text-sm text-gray-600">Username: <code>admin</code></p>
              <p className="text-sm text-gray-600">Password: <code>admin123</code></p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-800">Regular User</h3>
              <p className="text-sm text-gray-600">Username: <code>user</code></p>
              <p className="text-sm text-gray-600">Password: <code>password</code></p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <button
            onClick={handleBackToHome}
            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
