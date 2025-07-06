'use client';

import LoginForm from '@/components/LoginForm';
import { LoginCredentials, ApiResponse } from '@/types';

export default function Level6() {
  const handleLogin = async (credentials: LoginCredentials): Promise<ApiResponse> => {
    try {
      const response = await fetch('/api/level6', {
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
    "This level stores your input and executes it later",
    "The injection happens when stored data is retrieved and used",
    "Try storing malicious payloads that execute on the second query",
    "Look for profile update or comment functionality",
    "Example: Store '; DROP TABLE users-- in a field"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-gray-900 to-cyber-dark py-12">
      <div className="container mx-auto px-6">
        <LoginForm
          level={6}
          title="Second-order Injection"
          description="This level demonstrates second-order SQL injection where malicious data is stored safely but becomes dangerous when retrieved and used in subsequent queries. The vulnerability is delayed and harder to trace."
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
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Second-order Attack Flow:</h3>
                <div className="code-block">
{`-- Step 1: Store malicious data (appears safe)
INSERT INTO logs (username, action) VALUES ('admin\'; DROP TABLE users--', 'login');

-- Step 2: Retrieve and use stored data (vulnerability triggers)
SELECT * FROM users WHERE username = '` + `admin'; DROP TABLE users--` + `';

-- The injection executes when the stored data is used, not when stored`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Why Second-order is Dangerous:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Delayed execution makes it harder to trace
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Input validation might pass initially
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Affects different parts of the application
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyber-blue mr-2">•</span>
                    Harder to detect in security testing
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Attack Scenarios:</h3>
                <div className="code-block">
{`-- Profile update attack
UPDATE users SET bio = 'Hello'; DROP TABLE users-- WHERE id = 1;

-- Comment injection
INSERT INTO comments (content) VALUES ('Nice post!'; SELECT password FROM users--');

-- Log poisoning
INSERT INTO audit_logs (action) VALUES ('login'; UPDATE users SET role='admin'--');`}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-cyber-green mb-3">Prevention Strategies:</h3>
                <div className="code-block">
{`// Always use parameterized queries for both storage AND retrieval
const storeQuery = "INSERT INTO logs (username, action) VALUES ($1, $2)";
const retrieveQuery = "SELECT * FROM users WHERE username = $1";

// Validate data both on input AND when retrieved
function validateInput(data) {
  return data.replace(/[^a-zA-Z0-9_]/g, '');
}

// Use stored procedures
CALL getUserByUsername(@username);`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
